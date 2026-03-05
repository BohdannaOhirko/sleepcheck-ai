import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar } from 'lucide-react';
import ResultDetail from '@/components/dashboard/ResultDetail';

export default async function ResultDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: result } = await supabase
    .from('questionnaire_results')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  if (!result) redirect('/dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-5 h-5" />
            Назад до кабінету
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Результат анкети</h1>
          <p className="text-gray-600 mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {new Date(result.created_at).toLocaleDateString('uk-UA', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>
      <ResultDetail result={result} />
    </div>
  );
}