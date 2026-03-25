'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, type BookingFormData } from '@/lib/validations/forms';
import { useState } from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function BookingModal({ isOpen, onClose, serviceName }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'service',
          serviceName,
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          comment: data.comment || '',
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.error || 'Помилка відправки');
      setSubmitSuccess(true);
      reset();
      setTimeout(() => { setSubmitSuccess(false); onClose(); }, 2000);
    } catch (error) {
      console.error('Помилка:', error);
      alert('Помилка відправки. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
      hasError ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-green-200 focus:border-green-300'
    }`;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-7">
          {/* Шапка */}
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-bold text-gray-900">Запис на послугу</h3>
            <button onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <X size={16} className="text-gray-400" />
            </button>
          </div>

          {/* Обрана послуга */}
          <div className="mb-5 px-4 py-3 rounded-xl border border-green-100 bg-green-50">
            <p className="text-sm font-semibold text-green-700">{serviceName}</p>
          </div>

          {/* Успіх */}
          {submitSuccess && (
            <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                <span>✓</span> Заявку успішно відправлено!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Ваше ім&apos;я <span className="text-red-400">*</span>
              </label>
              <input {...register('name')} type="text" placeholder="Іван Іваненко"
                className={inputClass(!!errors.name)} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Телефон <span className="text-red-400">*</span>
              </label>
              <input {...register('phone')} type="tel" placeholder="+380671234567"
                className={inputClass(!!errors.phone)} />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input {...register('email')} type="email" placeholder="example@mail.com"
                className={inputClass(!!errors.email)} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Коментар</label>
              <textarea {...register('comment')} rows={3}
                placeholder="Ваші побажання щодо дати та часу..."
                className={`${inputClass(!!errors.comment)} resize-none`} />
              {errors.comment && <p className="mt-1 text-xs text-red-500">{errors.comment.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl font-semibold text-white text-sm transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              style={{ background: 'linear-gradient(135deg, var(--logo-green), #1a7a4a)' }}>
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Відправляємо...
                </span>
              ) : 'Відправити заявку'}
            </button>

            <p className="text-xs text-gray-400 text-center">
              <span className="text-red-400">*</span> Обов&apos;язкові поля
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}