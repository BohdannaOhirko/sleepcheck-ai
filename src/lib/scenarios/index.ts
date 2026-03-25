import { AnalysisResult } from '@/types/scenarios';
import { analyzeSymptoms } from './analyze-symptoms';
import { determineUrgency } from './determine-urgency';
import { generateScenarios } from './generate-scenarios';
import { generatePersonalizedAdvice } from './generate-advice';

export function analyzeAnswers(answers: Record<string, unknown>): AnalysisResult {
  const bmi = answers.bmi 
    ? answers.bmi.weight / Math.pow(answers.bmi.height / 100, 2) 
    : 25;
  
  const { symptoms, conditions } = analyzeSymptoms(answers, bmi);
  const urgency = determineUrgency(symptoms, answers, bmi);
  const scenarios = generateScenarios(symptoms, conditions, answers, bmi);
  const personalizedAdvice = generatePersonalizedAdvice(answers, bmi);
  
  return {
    urgency,
    criticalSymptoms: symptoms,
    possibleConditions: conditions,
    scenarios,
    personalizedAdvice
  };
}

export { analyzeSymptoms } from './analyze-symptoms';
export { determineUrgency } from './determine-urgency';
export { generateScenarios } from './generate-scenarios';
export { generatePersonalizedAdvice } from './generate-advice';