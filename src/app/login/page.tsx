"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [forgotMode, setForgotMode] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: formData.email,
          password: formData.password,
        },
      );

      if (authError) {
        if (
          authError.message.includes("Invalid login credentials") ||
          authError.message.includes("invalid_credentials")
        ) {
          throw new Error("Невірний email або пароль");
        }
        throw new Error("Помилка входу. Спробуйте ще раз.");
      }

      if (!data.session) throw new Error("Сесія не створена");
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setError(
        (err instanceof Error ? err.message : null) ||
          "Невірний email або пароль",
      );
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError("Введіть email для відновлення пароля");
      return;
    }
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      },
    );
    setLoading(false);
    if (error) {
      setError("Помилка. Перевірте email і спробуйте знову.");
    } else {
      setSuccess("Лист для відновлення пароля надіслано на вашу пошту");
      setForgotMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Вхід</h1>
          <p className="text-gray-600">Увійдіться до свого кабінету</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-green-700 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                required={!forgotMode}
                disabled={forgotMode}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all disabled:opacity-40 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Введіть пароль"
              />
            </div>

            <div className="flex justify-end">
              {!forgotMode ? (
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(true);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-sm text-green-600 hover:text-green-700 transition-colors"
                >
                  Забули пароль?
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setError(null);
                    setSuccess(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Повернутись до входу
                </button>
              )}
            </div>

            {!forgotMode ? (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Вхід..." : "Увійти"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Надсилання..." : "Надіслати лист для відновлення"}
              </button>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Ще немає акаунту?{" "}
              <Link
                href="/register"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Зареєструватися
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
