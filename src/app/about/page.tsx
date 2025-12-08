'use client';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
        <div className="relative container mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-block">
            <span className="text-sm tracking-wider text-muted-foreground uppercase">
              Медичний центр Ехокор
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight">
            Ми повертаємо
            <br />
            <span className="font-semibold bg-gradient-to-r from-[var(--logo-aqua)] to-[var(--logo-green)] bg-clip-text text-transparent">
              здоровий сон
            </span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-light">
            Прокинутись відпочившим — це не мрія. Це реальність, яку ми створюємо разом з вами.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto max-w-3xl"></div>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-4xl font-light mb-12 text-center tracking-tight">
            Наша історія
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground font-light">
            <p className="transition-all duration-500 hover:text-foreground">
              П'ятнадцять років тому ми відкрили перший в Україні центр діагностики сну. Тоді мало хто розумів серйозність проблеми.
            </p>
            <p className="transition-all duration-500 hover:text-foreground">
              За ці роки понад <span className="text-foreground font-medium">10 тисяч людей</span> повернули здоровий сон. Але скільки ще не знають про свою проблему?
            </p>
            <p className="transition-all duration-500 hover:text-foreground">
              Більшість просто звикли бути втомленими. Вони думають — це норма.
              <br />
              <span className="text-foreground font-medium">Це не норма.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-b from-muted/20 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-4 tracking-tight">
              Чому ми створили AI-діагностику
            </h2>
            <p className="text-lg text-muted-foreground font-light max-w-xl mx-auto">
              Технології мають служити здоров'ю. Просто. Доступно. Для всіх.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group text-center transition-all duration-500 hover:-translate-y-2">
              <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">⚡</div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">П'ять хвилин</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Швидка онлайн-діагностика без черг і стресу
              </p>
            </div>
            <div className="group text-center transition-all duration-500 hover:-translate-y-2">
              <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">🧠</div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">Розумний аналіз</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                AI працює як досвідчений сомнолог
              </p>
            </div>
            <div className="group text-center transition-all duration-500 hover:-translate-y-2">
              <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-110">💚</div>
              <h3 className="text-xl font-medium mb-3 tracking-tight">Безкоштовно</h3>
              <p className="text-muted-foreground font-light leading-relaxed">
                Здоров'я — це право кожної людини
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-light mb-12 text-center tracking-tight">
            Як це працює
          </h2>
          <div className="space-y-10">
            <div className="flex gap-6 items-start group transition-all duration-500 hover:translate-x-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-light text-lg transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                1
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-light mb-2 tracking-tight">Відповідаєте на питання</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Прості запитання про ваш сон. Складені професійними сомнологами на основі міжнародних стандартів.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start group transition-all duration-500 hover:translate-x-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-light text-lg transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                2
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-light mb-2 tracking-tight">AI аналізує дані</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Штучний інтелект оцінює ваші ризики. Бачить закономірності. Працює за секунди.
                </p>
              </div>
            </div>
            <div className="flex gap-6 items-start group transition-all duration-500 hover:translate-x-2">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-light text-lg transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                3
              </div>
              <div className="pt-2">
                <h3 className="text-2xl font-light mb-2 tracking-tight">Отримуєте результат</h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  Персональні рекомендації. Конкретні кроки. Якщо потрібно — направлення до лікаря.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-muted/10">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h2 className="text-4xl font-light mb-8 tracking-tight">Чесно про AI</h2>
          <div className="space-y-6 text-lg text-muted-foreground font-light leading-relaxed">
            <p className="transition-all duration-500 hover:text-foreground">
              AI не замінює лікаря. 
              <br />
              <span className="text-foreground font-medium">Ніколи.</span>
            </p>
            <p className="transition-all duration-500 hover:text-foreground">
              Це розумний помічник. Він допомагає зрозуміти, чи потрібна консультація спеціаліста.
            </p>
            <p className="transition-all duration-500 hover:text-foreground">
              Ваші дані залишаються приватними. Без продажу. Без передачі третім особам.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight tracking-tight">
            Здоровий сон —
            <br />
            <span className="font-medium">це ваше право</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 font-light">
            Почніть зараз. П'ять хвилин. Безкоштовно.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/questionnaire" className="group relative px-10 py-5 rounded-full font-light text-lg overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] transition-transform duration-500 group-hover:scale-110"></div>
              <span className="relative text-white flex items-center gap-3">
                Пройти діагностику
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </a>
            <a href="/" className="px-10 py-5 rounded-full font-light text-lg border border-border hover:bg-accent transition-all duration-500 hover:scale-105">
              Чат з AI-консультантом
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-10 font-light tracking-wide">
            Понад 10,000 людей нам довіряють
          </p>
        </div>
      </section>
    </div>
  );
}