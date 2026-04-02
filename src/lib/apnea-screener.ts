import { supabase } from '@/lib/supabase/client';
import screenerData from '@/data/apnea-screener.json';

export type Answer = boolean | string[] | null;

export interface ScoreResult {
  score: number;
  risk: 'low' | 'medium' | 'high';
  label: string;
  color: string;
  description: string;
}

export function calculateScore(answers: Record<string, Answer>): ScoreResult {
  let score = 0;

  screenerData.questions.forEach((q) => {
    if (q.type === 'yesno') {
      if (answers[q.id] === true) score += q.yesScore ?? 1;
    } else if (q.type === 'multiple' && Array.isArray(answers[q.id])) {
      const selected = answers[q.id] as string[];
      q.options?.forEach((opt) => {
        if (selected.includes(opt.id) && !opt.exclusive) score += opt.score;
      });
    }
  });

  const { scoring } = screenerData;
  if (score <= scoring.low.max) {
    return { score, risk: 'low', ...scoring.low };
  } else if (score <= scoring.medium.max) {
    return { score, risk: 'medium', ...scoring.medium };
  } else {
    return { score, risk: 'high', ...scoring.high };
  }
}

async function getLocationByIP(): Promise<{ city: string; country: string }> {
  try {
    const res = await fetch('https://ip-api.com/json/?fields=city,country&lang=uk');
    const data = await res.json();
    return { city: data.city || '', country: data.country || '' };
  } catch {
    return { city: '', country: '' };
  }
}

export async function saveScreenerResult(
  answers: Record<string, Answer>,
  result: ScoreResult
) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const location = await getLocationByIP();

    await supabase.from('apnea_screener_results').insert({
      user_id: session.user.id,
      score: result.score,
      risk_level: result.label,
      answers,
      city: location.city,
      country: location.country,
    });
  } catch {
    // тихо ігноруємо
  }
}