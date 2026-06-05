"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import {
  Users,
  FileText,
  Activity,
  Phone,
  Calendar,
  ChevronDown,
  ChevronUp,
  Shield,
  LogOut,
} from "lucide-react";

interface Profile {
  id: string;
  name: string;
  phone: string;
  created_at: string;
  is_admin: boolean;
}

interface QuestionnaireResult {
  id: string;
  user_id: string;
  created_at: string;
  total_score: number;
  risk_level: string;
  recommendations: string[];
  sleep_quality: number;
}

interface ApneaResult {
  id: string;
  user_id: string;
  created_at: string;
  score: number;
  risk_level: string;
  city?: string;
}

interface UserWithData extends Profile {
  questionnaire_results: QuestionnaireResult[];
  apnea_results: ApneaResult[];
}

interface ResultWithProfile extends QuestionnaireResult {
  name?: string;
  phone?: string;
}

const getRiskStyle = (level: string) => {
  if (level?.includes("Низький") || level === "low")
    return "text-emerald-700 bg-emerald-50 border-emerald-200";
  if (
    level?.includes("Помірний") ||
    level === "moderate" ||
    level?.includes("Середній")
  )
    return "text-amber-700 bg-amber-50 border-amber-200";
  if (level?.includes("Високий") || level === "high")
    return "text-red-700 bg-red-50 border-red-200";
  return "text-gray-600 bg-gray-50 border-gray-200";
};

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState<UserWithData[]>([]);
  const [allResults, setAllResults] = useState<ResultWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"users" | "results">("results");
  const [stats, setStats] = useState({ users: 0, questionnaires: 0, apnea: 0 });

  useEffect(() => {
    const loadAdminData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        setUnauthorized(true);
        setLoading(false);
        return;
      }

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: questionnaireResults } = await supabase
        .from("questionnaire_results")
        .select("*")
        .order("created_at", { ascending: false });

      const { data: apneaResults } = await supabase
        .from("apnea_screener_results")
        .select("*")
        .order("created_at", { ascending: false });

      const profileMap = new Map((profiles || []).map((p) => [p.id, p]));

      const usersWithData: UserWithData[] = (profiles || []).map((p) => ({
        ...p,
        questionnaire_results: (questionnaireResults || []).filter(
          (r) => r.user_id === p.id,
        ),
        apnea_results: (apneaResults || []).filter((r) => r.user_id === p.id),
      }));

      const resultsWithProfile: ResultWithProfile[] = (
        questionnaireResults || []
      ).map((r) => ({
        ...r,
        name: profileMap.get(r.user_id)?.name,
        phone: profileMap.get(r.user_id)?.phone,
      }));

      setUsers(usersWithData);
      setAllResults(resultsWithProfile);
      setStats({
        users: profiles?.length || 0,
        questionnaires: questionnaireResults?.length || 0,
        apnea: apneaResults?.length || 0,
      });
      setLoading(false);
    };

    loadAdminData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
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

  if (unauthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Доступ заборонено
          </h2>
          <p className="text-gray-500 mb-6">У вас немає прав адміністратора</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-[var(--logo-green)] text-white rounded-xl font-medium hover:opacity-90 transition"
          >
            До кабінету
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div
          className="relative overflow-hidden rounded-2xl p-7 text-white"
          style={{
            background:
              "linear-gradient(135deg, #1a5c38 0%, var(--logo-green) 100%)",
          }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <p className="text-green-100 text-sm">Адмін-панель</p>
                <h1 className="text-2xl font-bold">МЦ «Ехокор»</h1>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-colors"
            >
              <LogOut size={15} />
              Вийти
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Users size={15} className="text-green-200" />
                <p className="text-green-100 text-xs">Користувачів</p>
              </div>
              <p className="text-3xl font-bold">{stats.users}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={15} className="text-green-200" />
                <p className="text-green-100 text-xs">Анкет</p>
              </div>
              <p className="text-3xl font-bold">{stats.questionnaires}</p>
            </div>
            <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-1">
                <Activity size={15} className="text-green-200" />
                <p className="text-green-100 text-xs">Скринінгів апное</p>
              </div>
              <p className="text-3xl font-bold">{stats.apnea}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5">
          <button
            onClick={() => setActiveTab("results")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "results"
                ? "bg-[var(--logo-green)] text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <FileText size={15} />
            Всі анкети ({stats.questionnaires})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === "users"
                ? "bg-[var(--logo-green)] text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Users size={15} />
            Користувачі ({stats.users})
          </button>
        </div>

        {/* All Results Tab */}
        {activeTab === "results" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <FileText size={17} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">
                Всі пройдені анкети
              </h2>
              <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                {allResults.length} записів
              </span>
            </div>
            <div className="divide-y divide-gray-50">
              {allResults.map((r, i) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-400">
                      {allResults.length - i}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {r.total_score} балів
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar size={11} />
                          {new Date(r.created_at).toLocaleDateString("uk-UA", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        {r.name && (
                          <span className="text-xs text-gray-400">
                            {r.name}
                          </span>
                        )}
                        {r.phone && (
                          <span className="flex items-center gap-1 text-xs text-gray-400">
                            <Phone size={11} />
                            {r.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getRiskStyle(r.risk_level)}`}
                  >
                    {r.risk_level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3">
              <Users size={17} className="text-gray-400" />
              <h2 className="font-semibold text-gray-900">Користувачі</h2>
              <span className="ml-auto text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                {users.length} записів
              </span>
            </div>

            <div className="divide-y divide-gray-50">
              {users.map((user) => {
                const isExpanded = expandedUser === user.id;
                const latestQ = user.questionnaire_results[0];

                return (
                  <div key={user.id}>
                    <button
                      onClick={() =>
                        setExpandedUser(isExpanded ? null : user.id)
                      }
                      className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50/70 transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-semibold text-sm flex-shrink-0"
                          style={{ background: "var(--logo-green)" }}
                        >
                          {(user.name || "?")[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-900">
                              {user.name || "Без імені"}
                            </p>
                            {user.is_admin && (
                              <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded-full">
                                admin
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-0.5">
                            {user.phone && (
                              <span className="flex items-center gap-1 text-xs text-gray-400">
                                <Phone size={11} />
                                {user.phone}
                              </span>
                            )}
                            <span className="flex items-center gap-1 text-xs text-gray-400">
                              <Calendar size={11} />
                              {new Date(user.created_at).toLocaleDateString(
                                "uk-UA",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                },
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {latestQ && (
                          <span
                            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getRiskStyle(latestQ.risk_level)}`}
                          >
                            {latestQ.risk_level}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                          {user.questionnaire_results.length} анкет
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                          {user.apnea_results.length} апное
                        </span>
                        {isExpanded ? (
                          <ChevronUp
                            size={16}
                            className="text-gray-300 flex-shrink-0"
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="text-gray-300 flex-shrink-0"
                          />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-5 bg-gray-50/50 space-y-4">
                        <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 mt-2">
                          <Phone size={14} className="text-gray-400" />
                          <div>
                            <p className="text-xs text-gray-400">Телефон</p>
                            <p className="text-sm font-medium text-gray-800">
                              {user.phone || "—"}
                            </p>
                          </div>
                        </div>

                        {user.questionnaire_results.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                              Анкети ({user.questionnaire_results.length})
                            </p>
                            <div className="space-y-2">
                              {user.questionnaire_results.map((r, i) => (
                                <div
                                  key={r.id}
                                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400">
                                      #{user.questionnaire_results.length - i}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {r.total_score} балів
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {new Date(
                                          r.created_at,
                                        ).toLocaleDateString("uk-UA", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getRiskStyle(r.risk_level)}`}
                                  >
                                    {r.risk_level}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {user.apnea_results.length > 0 && (
                          <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                              Скринінг апное ({user.apnea_results.length})
                            </p>
                            <div className="space-y-2">
                              {user.apnea_results.map((r, i) => (
                                <div
                                  key={r.id}
                                  className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400">
                                      #{user.apnea_results.length - i}
                                    </span>
                                    <div>
                                      <p className="text-sm font-medium text-gray-800">
                                        {r.score} балів
                                      </p>
                                      <p className="text-xs text-gray-400">
                                        {new Date(
                                          r.created_at,
                                        ).toLocaleDateString("uk-UA", {
                                          day: "numeric",
                                          month: "long",
                                          year: "numeric",
                                        })}
                                        {r.city && ` · ${r.city}`}
                                      </p>
                                    </div>
                                  </div>
                                  <span
                                    className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getRiskStyle(r.risk_level)}`}
                                  >
                                    {r.risk_level}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {user.questionnaire_results.length === 0 &&
                          user.apnea_results.length === 0 && (
                            <p className="text-sm text-gray-400 text-center py-4">
                              Немає результатів
                            </p>
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="text-center pb-4">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-gray-400 hover:text-[var(--logo-green)] transition-colors"
          >
            ← До особистого кабінету
          </button>
        </div>
      </div>
    </div>
  );
}
