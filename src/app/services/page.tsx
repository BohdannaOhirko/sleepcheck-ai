'use client';

import { useState } from 'react';
import ServiceCard from '@/components/services/ServiceCard';
import BookingModal from '@/components/services/BookingModal';

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
    <div className="min-h-screen bg-background">
      
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="relative container mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block">
            <span className="text-sm tracking-wider text-muted-foreground uppercase">Наші послуги</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight">
            Професійна
            <br />
            <span className="font-semibold bg-gradient-to-r from-[var(--logo-aqua)] to-[var(--logo-green)] bg-clip-text text-transparent">
              діагностика сну
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            Сучасне обладнання. Досвідчені фахівці. Індивідуальний підхід.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto max-w-5xl"></div>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-5xl space-y-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onBook={openForm} />
          ))}

          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-3xl p-8 md:p-10">
            <div className="flex items-start gap-4">
              <div className="text-4xl">✨</div>
              <div>
                <h3 className="text-2xl font-light mb-2 tracking-tight">AI-діагностика</h3>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  Безкоштовна онлайн-анкета з AI-аналізом. Первинна оцінка ризиків за 5 хвилин.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <a href="/questionnaire" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-light text-sm border border-primary hover:bg-primary hover:text-white transition-all duration-300">
                    Пройти тест →
                  </a>
                  <span className="text-2xl font-light text-primary">Безкоштовно</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card border border-border rounded-3xl p-8 text-center">
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              <span className="font-medium text-foreground">Важлива інформація:</span> Ціни вказані станом на грудень 2025 року та можуть змінюватись. 
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