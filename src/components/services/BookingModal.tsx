'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, type BookingFormData } from '@/lib/validations/forms';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function BookingModal({ isOpen, onClose, serviceName }: BookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      console.log('✅ Валідовані дані запису:', { ...data, service: serviceName });
      
      // Відправка на API
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'service',
          serviceName: serviceName,
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          comment: data.comment || '',
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Помилка відправки');
      }
      
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('❌ Помилка відправки:', error);
      alert('❌ Помилка відправки. Спробуйте ще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-light tracking-tight">Запис на послугу</h3>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
            >
              ✕
            </button>
          </div>

          <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <p className="text-sm font-medium text-primary">{serviceName}</p>
          </div>

          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-in fade-in duration-300">
              <p className="text-green-700 font-semibold flex items-center justify-center gap-2">
                <span className="text-xl">✓</span>
                Заявку успішно відправлено!
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Ваше ім'я <span className="text-destructive">*</span>
              </label>
              <input
                {...register('name')}
                type="text"
                placeholder="Іван Іваненко"
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                  errors.name 
                    ? 'border-destructive focus:ring-destructive/50' 
                    : 'border-border focus:ring-primary/50'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Телефон <span className="text-destructive">*</span>
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+380671234567"
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                  errors.phone 
                    ? 'border-destructive focus:ring-destructive/50' 
                    : 'border-border focus:ring-primary/50'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Email
              </label>
              <input
                {...register('email')}
                type="email"
                placeholder="example@mail.com"
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                  errors.email 
                    ? 'border-destructive focus:ring-destructive/50' 
                    : 'border-border focus:ring-primary/50'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Коментар
              </label>
              <textarea
                {...register('comment')}
                rows={3}
                placeholder="Ваші побажання щодо дати та часу..."
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.comment 
                    ? 'border-destructive focus:ring-destructive/50' 
                    : 'border-border focus:ring-primary/50'
                }`}
              />
              {errors.comment && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.comment.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full group relative px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] transition-transform duration-500 group-hover:scale-110"></div>
              <span className="relative text-white flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Відправляємо...
                  </>
                ) : (
                  'Відправити заявку'
                )}
              </span>
            </button>

            <p className="text-xs text-muted-foreground text-center">
              <span className="text-destructive">*</span> Обов'язкові поля
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}