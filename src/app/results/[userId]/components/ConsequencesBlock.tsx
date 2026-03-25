import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ConsequencesBlockProps {
  riskLevel: 'low' | 'medium' | 'high';
}

export function ConsequencesBlock({ riskLevel }: ConsequencesBlockProps) {
  if (riskLevel === 'low') return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Можливі наслідки без лікування
          </h3>
          <p className="text-sm text-gray-600">
            Прогноз перебігу без медичного втручання
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Короткострокові */}
        <div className="border-l-4 border-orange-400 bg-orange-50 p-5 rounded-r-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center">
              <span className="text-orange-700 font-bold text-sm">1</span>
            </div>
            <h4 className="font-bold text-orange-900">Найближчі місяці</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 ml-10">
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Постійна втома та сонливість протягом дня</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Зниження концентрації уваги та продуктивності</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Підвищена дратівливість та перепади настрою</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-600 mt-1">•</span>
              <span>Головні болі, особливо після пробудження</span>
            </li>
          </ul>
        </div>

        {/* Середньострокові */}
        <div className="border-l-4 border-red-400 bg-red-50 p-5 rounded-r-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center">
              <span className="text-red-700 font-bold text-sm">2</span>
            </div>
            <h4 className="font-bold text-red-900">Через 1-3 роки</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 ml-10">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Розвиток або погіршення артеріальної гіпертензії</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Підвищений ризик цукрового діабету 2 типу</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Метаболічні порушення та набір зайвої ваги</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">•</span>
              <span>Зниження якості життя та працездатності</span>
            </li>
          </ul>
        </div>

        {/* Довгострокові */}
        <div className="border-l-4 border-purple-400 bg-purple-50 p-5 rounded-r-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
              <span className="text-purple-700 font-bold text-sm">3</span>
            </div>
            <h4 className="font-bold text-purple-900">Через 5+ років</h4>
          </div>
          <ul className="space-y-2 text-sm text-gray-700 ml-10">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Серцево-судинні захворювання (аритмія, серцева недостатність)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Підвищений ризик інфаркту міокарда та ішемічного інсульту у <strong>3-4 рази</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Когнітивні порушення, погіршення пам&apos;яті</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Скорочення очікуваної тривалості життя на 10-15 років</span>
            </li>
          </ul>
        </div>

        {/* Медичне зауваження */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Важлива інформація
              </p>
              <p className="text-sm text-blue-800 leading-relaxed">
                Своєчасна діагностика та лікування дозволяють запобігти більшості ускладнень. 
                Ефективність терапії найвища при ранньому зверненні до спеціаліста.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}