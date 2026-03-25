'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { LogOut, User, Phone, Mail, ChevronRight, TrendingUp, Calendar } from 'lucide-react';

interface UserProfile {
  name?: string;
  phone?: string;
}

interface QuestionnaireResult {
  id: string;
  created_at: string;
  total_score: number;
  risk_level: string;
}

interface AuthUser {
  email?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [results, setResults] = useState<QuestionnaireResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);

      const { data: profileData } = await supabase
        .from('profiles').select('*').eq('id', session.user.id).single();
      if (profileData) setProfile(profileData);

      const { data: resultsData } = await supabase
        .from('questionnaire_results').select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (resultsData) setResults(resultsData);

      setLoading(false);
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getRiskStyle = (level: string) => {
    switch (level) {
      case 'Низький': return { dot: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'Помірний': return { dot: 'bg-amber-500', badge: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'Високий': return { dot: 'bg-red-500', badge: 'text-red-700 bg-red-50 border-red-200' };
      default: return { dot: 'bg-gray-400', badge: 'text-gray-600 bg-gray-50 border-gray-200' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--logo-green)] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Завантаження...</p>
        </div>
      </div>
    );
  }

  const latestResult = results[0];

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-5">

        <div className="relative overflow-hidden rounded-2xl p-7 text-white"
          style={{ background: 'linear-gradient(135deg, var(--logo-green) 0%, #1a7a4a 100%)' }}>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
            style={{ background: 'radial-gradient(circle, white, transparent)' }} />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-green-100 text-sm mb-1">Особистий кабінет</p>
              <h1 className="text-2xl font-bold mb-0.5">
                Вітаємо, {profile?.name || 'Користувач'} 👋
              </h1>
              <p className="text-green-100 text-sm">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors backdrop-blur-sm"
            >
              <LogOut size={15} />
              Вийти
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-green-100 text-xs mb-1">Тестів пройдено</p>
              <p className="text-2xl font-bold">{results.length}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-green-100 text-xs mb-1">Останній результат</p>
              <p className="text-lg font-bold">{latestResult?.total_score ?? '—'} <span className="text-sm font-normal">балів</span></p>
            </div>
            <div className="bg-white/15 rounded-xl p-3 backdrop-blur-sm">
              <p className="text-green-100 text-xs mb-1">Рівень ризику</p>
              <p className="text-lg font-bold">{latestResult?.risk_level ?? '—'}</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="md:col-span-1 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--logo-green)' }}>
                <User size={18} className="text-white" />
              </div>
              <h2 className="font-semibold text-gray-900">Профіль</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <User size={15} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Ім&apos;я</p>
                  <p className="text-sm font-medium text-gray-800">{profile?.name || 'Не вказано'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Mail size={15} className="text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-800 truncate">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <Phone size={15} className="text-gray-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400">Телефон</p>
                  <p className="text-sm font-medium text-gray-800">{profile?.phone || 'Не вказано'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Link href="/questionnaire"
              className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, #e8f7ed, #d0f0da)' }}>
                  📋
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Пройти новий тест</h3>
                  <p className="text-sm text-gray-500">Оцініть ризики порушень сну</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-[var(--logo-green)] group-hover:translate-x-1 transition-all" />
            </Link>

            {latestResult ? (
              <Link href={`/dashboard/results/${latestResult.id}`}
                className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: 'linear-gradient(135deg, #e8f0fe, #d0e1fd)' }}>
                    📊
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Останній результат</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(latestResult.created_at).toLocaleDateString('uk-UA', { day: 'numeric', month: 'long' })} · {latestResult.total_score} балів
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getRiskStyle(latestResult.risk_level).badge}`}>
                    {latestResult.risk_level}
                  </span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-[var(--logo-green)] group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                  <TrendingUp size={20} className="text-gray-300" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-500">Немає результатів</h3>
                  <p className="text-sm text-gray-400">Пройдіть перший тест</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {results.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Calendar size={17} className="text-gray-400" />
                <h2 className="font-semibold text-gray-900">Історія тестів</h2>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">{results.length} записів</span>
            </div>
            <div className="divide-y divide-gray-50">
              {results.map((result, i) => {
                const style = getRiskStyle(result.risk_level);
                return (
                  <Link key={result.id} href={`/dashboard/results/${result.id}`}
                    className="group flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-gray-700">
                          {new Date(result.created_at).toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' })}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(result.created_at).getFullYear()}
                        </span>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Тест #{results.length - i}</p>
                        <p className="text-xs text-gray-400">{result.total_score} балів</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${style.badge}`}>
                        {result.risk_level}
                      </span>
                      <ChevronRight size={15} className="text-gray-300 group-hover:text-[var(--logo-green)] transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center pb-4">
          <Link href="/" className="text-sm text-gray-400 hover:text-[var(--logo-green)] transition-colors">
            ← Повернутися на головну
          </Link>
        </div>
      </div>
    </div>
  );
}
