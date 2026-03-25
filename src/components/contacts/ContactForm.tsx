'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/forms';
import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'consultation',
          name: data.name,
          phone: data.phone,
          email: data.email || '',
          consultationType: data.specialist,
          comment: data.message || '',
        }),
      });

      const result = await response.json();

      // Обробка rate limiting (429)
      if (response.status === 429) {
        setSubmitStatus({
          type: 'error',
          message: result.error || 'Занадто багато заявок. Спробуйте через 10 хвилин або зателефонуйте нам безпосередньо: +38098 881 44 99'
        });
        setIsSubmitting(false);
        return;
      }

      // Обробка інших помилок
      if (!result.success) {
        throw new Error(result.error || 'Помилка відправки');
      }
      
      setSubmitStatus({
        type: 'success',
        message: 'Дякуємо! Ми зв\'яжемося з вами найближчим часом.'
      });
      
      reset();
      
      // Автоматично приховати повідомлення через 5 секунд
      setTimeout(() => setSubmitStatus(null), 5000);
      
    } catch (error) {
      console.error('Помилка відправки:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Помилка відправки. Спробуйте ще раз або зателефонуйте нам.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-light mb-6 tracking-tight text-center">
            Швидкий запис на консультацію
          </h3>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-xl text-center ${
              submitStatus.type === 'success' 
                ? 'bg-primary/10 border border-primary/20' 
                : 'bg-destructive/10 border border-destructive/20'
            }`}>
              <p className={`font-medium ${
                submitStatus.type === 'success' ? 'text-primary' : 'text-destructive'
              }`}>
                {submitStatus.type === 'success' ? '✓ ' : '⚠ '}
                {submitStatus.message}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">
                  Ваше ім&apos;я <span className="text-destructive">*</span>
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
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  Тип консультації <span className="text-destructive">*</span>
                </label>
                <select
                  {...register('specialist')}
                  className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all ${
                    errors.specialist 
                      ? 'border-destructive focus:ring-destructive/50' 
                      : 'border-border focus:ring-primary/50'
                  }`}
                >
                  <option value="">Оберіть...</option>
                  <option value="consultation">Перша консультація</option>
                  <option value="polysomnography">Полісомнографія</option>
                  <option value="repeat">Повторний прийом</option>
                  <option value="other">Інше</option>
                </select>
                {errors.specialist && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.specialist.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">
                Коментар
              </label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Опишіть вашу ситуацію..."
                className={`w-full px-4 py-3 rounded-xl border bg-background focus:outline-none focus:ring-2 transition-all resize-none ${
                  errors.message 
                    ? 'border-destructive focus:ring-destructive/50' 
                    : 'border-border focus:ring-primary/50'
                }`}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message.message}
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
                  <>
                    Відправити заявку
                    <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                  </>
                )}
              </span>
            </button>

            <p className="text-xs text-muted-foreground text-center">
              <span className="text-destructive">*</span> Обов&apos;язкові поля. 
              Ми зв&apos;яжемось з вами протягом робочого дня.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}