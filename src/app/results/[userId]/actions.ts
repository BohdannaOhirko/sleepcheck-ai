'use server';

import { createClient } from '@/lib/supabase/server';

export async function saveQuestionnaireResult(data: {
  answers: Record<string, unknown>;
  riskLevel: string;
  totalScore: number;
  recommendations: string[];
  keyIssues: string[];
  fallAsleepTime?: number;
  sleepQuality?: number;
  region?: string;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

console.log('user metadata:', JSON.stringify(user?.user_metadata));

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
      region: data.region,
      name: user.user_metadata?.name || null,
      contact: user.user_metadata?.phone || user.email || null,
    })
    .select()
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: result };
}