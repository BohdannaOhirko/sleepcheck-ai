import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-muted/20 to-background border-t border-border">
      <div className="container mx-auto px-6 py-16 max-w-6xl">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="text-center md:text-left">
            <h4 className="text-xl font-light mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-[var(--logo-default)] to-[var(--logo-aqua)] bg-clip-text text-transparent font-semibold">
                Ехокор
              </span>
            </h4>
            <p className="text-sm text-muted-foreground font-light leading-relaxed">
              Медичний центр з діагностики розладів сну. Допомагаємо покращити якість вашого життя.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4 text-foreground tracking-tight">Навігація</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground font-light hover:text-primary transition-colors duration-300">
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="text-muted-foreground font-light hover:text-primary transition-colors duration-300">
                  Тест на ризики
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground font-light hover:text-primary transition-colors duration-300">
                  Послуги
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground font-light hover:text-primary transition-colors duration-300">
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4 text-foreground tracking-tight">Послуги</h4>
            <ul className="space-y-3 text-sm text-muted-foreground font-light">
              <li>Консультація сомнолога</li>
              <li>Полісомнографія</li>
              <li>Діагностика апное</li>
              <li>AI-діагностика сну</li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4 text-foreground tracking-tight">Контакти</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-light">
                <span>📞</span>
                <a href="tel:+380988814499" className="hover:text-primary transition-colors">
                  +380 98 881 4499
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-light">
                <span>✉️</span>
                <a href="mailto:info@ehokor.com.ua" className="hover:text-primary transition-colors">
                  info@ehokor.com.ua
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground font-light">
                <span>📍</span>
                <span>Львів, вул. Угорська, 17</span>
              </li>
            </ul>
            
            <div className="flex justify-center md:justify-start gap-4 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <span className="text-lg">📷</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm text-muted-foreground font-light">
            &copy; {new Date().getFullYear()} Ехокор. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
