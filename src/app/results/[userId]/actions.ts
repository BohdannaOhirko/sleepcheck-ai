'use server';

import { createClient } from '@/lib/supabase/server';

export async function saveQuestionnaireResult(data: {
  answers: Record<string, any>;
  riskLevel: string;
  totalScore: number;
  recommendations: string[];
  keyIssues: string[];
  fallAsleepTime?: number;
  sleepQuality?: number;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Користувач не авторизований' };
  }

  const { data: result, error } = await supabase
    .from('questionnaire_results')
    .insert({
      user_id: user.id,
      answers: data.answers,
      risk_level: data.riskLevel,
      total_score: data.totalScore,
      recommendations: data.recommendations,
      key_issues: data.keyIssues,
      fall_asleep_time: data.fallAsleepTime,
      sleep_quality: data.sleepQuality,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: result };
}