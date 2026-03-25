import { getIcon } from '@/lib/icons';
import { Question, Section } from '@/types/questionnaire';

interface FormattedAnswer {
  question: Question;
  section: Section;
  value: unknown;
}

interface AnswersSectionProps {
  answersBySection: Array<{
    section: Section;
    answers: FormattedAnswer[];
  }>;
  formatAnswerValue: (answer: FormattedAnswer) => string;
}

export function AnswersSection({ answersBySection, formatAnswerValue }: AnswersSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        {getIcon('brain', 'w-6 h-6 text-gray-700')}
        <h3 className="text-2xl font-bold text-gray-900">Ваші відповіді</h3>
      </div>
      
      <div className="space-y-8">
        {answersBySection.map((group) => (
          <div key={group.section.id}>
            <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                {getIcon(group.section.icon || 'activity', 'w-6 h-6 text-blue-600')}
              </div>
              <h4 className="text-xl font-semibold text-gray-800">
                {group.section.title}
              </h4>
            </div>
            
            <div className="space-y-3 ml-4">
              {group.answers.map((answer, index) => (
                <div
                  key={answer.question.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-medium text-gray-900 mb-1">
                        {answer.question.question}
                      </h5>
                      <p className="text-blue-700 font-semibold">
                        {formatAnswerValue(answer)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}