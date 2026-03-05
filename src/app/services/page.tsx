'use client';

import { useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import BookingModal from '@/components/services/BookingModal';
import Link from 'next/link';

const services = [
  {
    id: 1,
    icon: '🌙',
    title: 'Базова полісомнографія',
    subtitle: 'Комплексне дослідження сну',
    description: 'Нічне дослідження з реєстрацією основних показників: дихання, рівень кисню в крові, положення тіла, рухи, активність мозку.',
    features: ['Тривалість: 6-8 годин', 'Комфортна палата', 'Результати через 3-5 днів'],
    price: 9800,
    gradient: 'from-[var(--logo-green)] to-[var(--logo-lime)]',
    color: 'var(--logo-green)',
  },
  {
    id: 2,
    icon: '📊',
    title: 'Комбінована полісомнографія',
    subtitle: 'Розширене дослідження',
    description: 'Включає всі параметри базового дослідження + розширений аналіз структури сну, рухів кінцівок, ЕКГ моніторинг.',
    features: ['Всі параметри базової', 'ЕКГ моніторинг', 'Детальний звіт'],
    price: 13900,
    gradient: 'from-[var(--logo-aqua)] to-[var(--logo-light)]',
    color: 'var(--logo-aqua)',
  },
  {
    id: 3,
    icon: '🔬',
    title: 'Полісомнографія + MSLT',
    subtitle: 'Діагностика денної сонливості',
    description: 'Повне дослідження сну вночі + тест множинної латентності сну (MSLT) вдень. Діагностує нарколепсію.',
    features: ['Нічна + денний тест', 'Діагностика нарколепсії', 'Повний день у клініці'],
    price: 18800,
    gradient: 'from-[var(--logo-default)] to-[var(--logo-aqua)]',
    color: 'var(--logo-default)',
  },
  {
    id: 4,
    icon: '💼',
    title: 'Консультація сомнолога',
    subtitle: 'Очний прийом спеціаліста',
    description: 'Детальна консультація з досвідченим лікарем-сомнологом. Аналіз симптомів, план обстеження та лікування.',
    features: ['Тривалість: 45-60 хв', 'Аналіз результатів', 'План лікування'],
    price: 1300,
    gradient: 'from-[var(--logo-lime)] to-[var(--logo-bright)]',
    color: 'var(--logo-lime)',
  },
];

export default function ServicesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const openForm = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9]">

      {/* Hero */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, var(--logo-green), transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-green-100 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-600">Наші послуги</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-5">
            Професійна{' '}
            <span className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, var(--logo-green), var(--logo-aqua))' }}>
              діагностика сну
            </span>
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed">
            Сучасне обладнання. Досвідчені фахівці. Індивідуальний підхід.
          </p>
        </div>
      </section>

      {/* Послуги */}
      <section className="pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={openForm} />
          ))}

          {/* AI блок */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col sm:flex-row items-start gap-6">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #e8f7ed, #d0f0da)' }}>
              ✨
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">AI-діагностика</h3>
              <p className="text-gray-500 leading-relaxed mb-4">
                Безкоштовна онлайн-анкета з AI-аналізом. Первинна оцінка ризиків за 5 хвилин.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <Link href="/questionnaire"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: 'var(--logo-green)' }}>
                  Пройти тест
                  <span>→</span>
                </Link>
                <span className="text-xl font-bold" style={{ color: 'var(--logo-green)' }}>
                  Безкоштовно
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Дисклеймер */}
      <section className="pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
            <p className="text-sm text-gray-400 leading-relaxed">
              <span className="font-semibold text-gray-600">Важлива інформація:</span>{' '}
              Ціни вказані станом на грудень 2025 року та можуть змінюватись.
              Актуальну вартість уточнюйте за телефоном або через форму запису.
            </p>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        serviceName={selectedService}
      />
    </div>
  );
}