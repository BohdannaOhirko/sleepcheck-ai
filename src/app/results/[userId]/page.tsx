"use client";

import { saveQuestionnaireResult } from "./actions";
import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import questionnaireData from "@/data/questionnaire.json";
import { Section } from "@/types/questionnaire";
import { AlertCircle, Printer, RotateCcw } from "lucide-react";
import { ExaminationsBlock } from "@/components/scenarios/ExaminationsBlock";
import { ConditionsList } from "@/components/scenarios/ConditionsList";
import { UrgencyLevel, PossibleCondition } from "@/types/scenarios";
import { RiskCard } from "./components/RiskCard";
import { RecommendationsList } from "./components/RecommendationsList";
import { ConsequencesBlock } from "./components/ConsequencesBlock";
import { AnswersSection } from "./components/AnswersSection";
import { calculateTotalScore } from "@/lib/scoring/calculator";
import { determineRiskLevel } from "@/lib/scoring/risk-levels";
import {
  getUrgencyData,
  getPossibleConditions,
  generateRecommendations,
} from "./utils/dataGenerators";
import { formatAnswerValue, getFormattedAnswers } from "./utils/formatters";

interface UserResult {
  userId: string;
  userName: string;
  totalScore: number;
  riskLevel: "low" | "medium" | "high";
  completedAt: string;
  answers: Record<string, unknown>;
  recommendations?: string[];
  urgencyData?: UrgencyLevel;
  possibleConditions?: PossibleCondition[];
}

export default function UserResultPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [result, setResult] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(true);

  const loadResult = useCallback(async () => {
    try {
      const answersData = localStorage.getItem("questionnaireAnswers");
      if (!answersData) {
        setResult(null);
        setLoading(false);
        return;
      }

      const answers = JSON.parse(answersData);

      const score = calculateTotalScore(answers);
      const risk = determineRiskLevel(score);

      const userResult: UserResult = {
        userId: userId,
        userName: "Користувач",
        totalScore: score,
        riskLevel:
          risk === "critical" ? "high" : risk === "moderate" ? "medium" : "low",
        completedAt: new Date().toISOString(),
        answers: answers,
        recommendations: generateRecommendations(risk, answers),
        urgencyData: getUrgencyData(risk, answers),
        possibleConditions: getPossibleConditions(risk, answers),
      };

      let region: string | undefined;
      try {
        const geoRes = await fetch("https://ipapi.co/json/");
        const geoData = await geoRes.json();
        region = geoData.region;
      } catch {
        region = undefined;
      }

      saveQuestionnaireResult({
        answers: answers,
        riskLevel:
          userResult.riskLevel === "high"
            ? "Високий"
            : userResult.riskLevel === "medium"
              ? "Середній"
              : "Низький",
        totalScore: score,
        recommendations: userResult.recommendations || [],
        keyIssues: userResult.possibleConditions?.map((c) => c.name) || [],
        fallAsleepTime: answers.fallAsleepTime,
        sleepQuality: answers.sleepQuality,
        region: region,
      }).catch((err) => console.log("Не авторизований або помилка:", err));

      setResult(userResult);
    } catch (error) {
      console.error("Помилка:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadResult();
  }, [loadResult]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Результат не знайдено
            </h2>
            <p className="text-gray-600 mb-6">
              Не вдалося знайти результати для цього користувача
            </p>
            <button
              onClick={() => router.push("/results")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Повернутися до результатів
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formattedAnswers = getFormattedAnswers(
    result.answers,
    questionnaireData.sections as unknown as Section[],
  );
  const answersBySection = (questionnaireData.sections as unknown as Section[])
    .map((section) => ({
      section,
      answers: formattedAnswers.filter(
        (answer) => answer.section.id === section.id,
      ),
    }))
    .filter((group) => group.answers.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.push("/results")}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2 font-medium hover:gap-3 transition-all"
          >
            ← Повернутися до всіх результатів
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Персональні результати
          </h1>
          <p className="text-gray-600">
            {result.userName || "Анонімний користувач"} •{" "}
            {new Date(result.completedAt).toLocaleDateString("uk-UA")}
          </p>
        </div>

        <div className="mb-6">
          <RiskCard riskLevel={result.riskLevel} score={result.totalScore} />
        </div>

        {result.recommendations && result.recommendations.length > 0 && (
          <div className="mb-6">
            <RecommendationsList recommendations={result.recommendations} />
          </div>
        )}

        {result.possibleConditions && result.possibleConditions.length > 0 && (
          <div className="mb-6">
            <ConditionsList conditions={result.possibleConditions} />
          </div>
        )}

        <div className="mb-6">
          <ConsequencesBlock riskLevel={result.riskLevel} />
        </div>

        {result.urgencyData && (
          <div className="mb-6">
            <ExaminationsBlock urgency={result.urgencyData} />
          </div>
        )}

        <div className="mb-6">
          <AnswersSection
            answersBySection={answersBySection}
            formatAnswerValue={formatAnswerValue}
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold shadow-md flex items-center justify-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Роздрукувати
          </button>
          <button
            onClick={() => router.push("/questionnaire/1")}
            className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold shadow-md flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Пройти знову
          </button>
        </div>
      </div>
    </div>
  );
}
