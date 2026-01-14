'use client';

import { useState, useEffect } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  specialist?: string;
}

export function BookingModal({ isOpen, onClose, specialist }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    specialist: specialist || '',
    date: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (specialist) {
      setFormData(prev => ({ ...prev, specialist }));
    }
  }, [specialist]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    // Відправка на API
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formType: 'ehokor',
        name: formData.name,
        phone: formData.phone,
        specialist: formData.specialist || 'Не вказано',
        desiredDate: formData.date || 'Не вказано',
        comment: formData.message || '',
      }),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Помилка відправки');
    }

    setIsSuccess(true);
  } catch (error) {
    console.error('❌ Помилка відправки:', error);
    alert('❌ Помилка відправки. Спробуйте ще раз.');
  } finally {
    setIsSubmitting(false);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', phone: '', email: '', specialist: '', date: '', message: '' });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-indigo-900/80 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Заявку прийнято!</h3>
            <p className="text-gray-600 mb-8">
               Очікуйте дзвінок від нашого адміністратора для уточнення деталей.
            </p>
            <button
              onClick={handleClose}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
            >
              Чудово!
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-white">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">МЦ «Ехокор»</h3>
                  <p className="text-blue-100 text-sm">Запис на консультацію</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ваше ім'я *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="Введіть ім'я"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  placeholder="+380 (__) ___-__-__"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Спеціаліст</label>
                <select
                  name="specialist"
                  value={formData.specialist}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  <option value="">Оберіть спеціаліста</option>
                  <option value="Сомнолог">Сомнолог</option>
                  <option value="Невролог">Невролог</option>
                  <option value="Кардіолог">Кардіолог</option>
                  <option value="ЛОР">ЛОР</option>
                  <option value="Терапевт">Терапевт</option>
                  <option value="Полісомнографія">Полісомнографія</option>
                  <option value="Діагностика апное">Діагностика апное</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Бажана дата</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Коментар</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full px-4 py-3.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none"
                  placeholder="Опишіть симптоми або побажання"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-70 transition-all shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Відправляємо...
                  </>
                ) : (
                  <>
                    <span>📞</span>
                    Записатись на прийом
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Натискаючи кнопку, ви погоджуєтесь з обробкою персональних даних
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}