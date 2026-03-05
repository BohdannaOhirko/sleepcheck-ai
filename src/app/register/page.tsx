'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Паролі не співпадають');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль має містити мінімум 6 символів');
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            phone: formData.phone,
          },
        },
      });

      if (authError) {
        if (
          authError.message.includes('already registered') ||
          authError.message.includes('User already registered') ||
          authError.status === 422
        ) {
          setError('Користувач з таким email вже зареєстрований');
        } else {
          setError(authError.message || 'Помилка реєстрації');
        }
        return;
      }

      if (!authData.user) {
        throw new Error('Не вдалося створити користувача');
      }

      if (authData.user.identities?.length === 0) {
        setError('Користувач з таким email вже зареєстрований');
        return;
      }

      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          name: formData.name,
          phone: formData.phone,
        });

      if (profileError && profileError.code !== '23505') {
        throw profileError;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 3000);

    } catch (err: any) {
      setError(err.message || 'Помилка реєстрації. Спробуйте ще раз.');
    } finally {
      setLoading(false);
    }
  };

  // Екран успіху
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'linear-gradient(135deg, var(--logo-green), var(--logo-lime))' }}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Реєстрація успішна!</h2>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Перевірте вашу пошту{' '}
              <span className="font-semibold text-gray-700">{formData.email}</span>{' '}
              та підтвердіть email для активації акаунту.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-[var(--logo-green)] rounded-full animate-spin" />
              Перенаправлення на сторінку входу...
            </div>
            <Link href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: 'var(--logo-green)' }}>
              Перейти до входу →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Реєстрація</h1>
          <p className="text-gray-600">Створіть акаунт для збереження результатів</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ім'я <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Іван Іваненко"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Телефон
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="+380671234567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Мінімум 6 символів"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Підтвердіть пароль <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="Повторіть пароль"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, var(--logo-green), var(--logo-lime))' }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Реєстрація...
                </span>
              ) : 'Зареєструватися'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Вже маєте акаунт?{' '}
              <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Увійти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}