// src/components/landing/Hero.tsx

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-secondary py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      
      {/* Декоративні елементи - ПРИХОВАНІ на мобільних */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--logo-aqua)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--logo-green)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-[var(--logo-light)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center">
          
          {/* Бейдж */}
          <div className="inline-block mb-6 sm:mb-8 animate-fade-down">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[var(--logo-default)] via-[var(--logo-aqua)] to-[var(--logo-green)] rounded-full blur opacity-40 group-hover:opacity-60 transition duration-1000"></div>
              <span className="relative flex items-center gap-2 bg-card px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold border border-border">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--logo-green)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--logo-green)]"></span>
                </span>
                Медичний центр "Ехокор"
              </span>
            </div>
          </div>
          
          {/* Головний заголовок */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-down animation-delay-200 px-4">
            <span className="bg-gradient-to-r from-[var(--logo-default)] via-[var(--logo-light)] to-[var(--logo-aqua)] bg-clip-text text-transparent">
              AI-діагностика
            </span>
            <br />
            <span className="text-foreground">розладів сну за </span>
            <span className="relative inline-block">
              <span className="text-foreground">5 хвилин</span>
              <svg className="absolute -bottom-2 left-0 w-full hidden sm:block" height="12" viewBox="0 0 200 12" fill="none">
                <path d="M2 10C60 2 140 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{stopColor: 'var(--logo-green)'}} />
                    <stop offset="100%" style={{stopColor: 'var(--logo-aqua)'}} />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          
          {/* Опис */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-down animation-delay-400 px-4">
            Перевірте ризик апное сну та інших розладів сну <span className="text-[var(--logo-green)] font-semibold">безкоштовно</span>. 
            Отримайте персоналізований аналіз від <span className="text-[var(--logo-aqua)] font-semibold">AI-асистента сомнолога</span> та рекомендації експертів.
          </p>
          
          {/* Кнопки */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 animate-fade-down animation-delay-600 px-4">
            <button className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] via-[var(--logo-lime)] to-[var(--logo-bright)] transition-transform duration-300 group-hover:scale-105"></div>
              <span className="relative text-white flex items-center justify-center gap-2">
                Пройти анкету безкоштовно
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border-2 border-border bg-card hover:border-[var(--logo-aqua)] hover:bg-accent transition-all duration-300">
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--logo-default)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Консультація AI-асистента
              </span>
            </button>
          </div>
          
          {/* Статистика/Переваги */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto animate-fade-up animation-delay-800 px-4">
            
            <div className="group p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[var(--logo-green)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--logo-green)]/10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-8 h-8 text-[var(--logo-green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Безкоштовно
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Онлайн анкета та базовий аналіз
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[var(--logo-aqua)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--logo-aqua)]/10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-8 h-8 text-[var(--logo-aqua)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                5 хвилин
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Швидкий AI-аналіз та результат
              </div>
            </div>
            
            <div className="group p-4 sm:p-6 rounded-2xl bg-card border border-border hover:border-[var(--logo-default)] transition-all duration-300 hover:shadow-lg hover:shadow-[var(--logo-default)]/10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <svg className="w-8 h-8 text-[var(--logo-default)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Без реєстрації
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Анонімно та конфіденційно
              </div>
            </div>
            
          </div>

          {/* Довіра - новий блок */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">
              💙 Довіряють понад <span className="font-semibold text-[var(--logo-default)]">10,000+</span> пацієнтів
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--logo-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>AI від сомнологів</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--logo-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Медичний стандарт</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[var(--logo-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Конфіденційність даних</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}