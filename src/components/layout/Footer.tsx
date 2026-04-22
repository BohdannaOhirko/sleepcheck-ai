import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Бренд */}
          <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <Image
              src="/images/logo.svg"
              alt="Ехокор"
              width={180}
              height={48}
              className="mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Спеціалізований медичний центр у Львові
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://www.facebook.com/ehokor/"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 flex items-center justify-center text-gray-400 hover:text-[var(--logo-green)] transition-all font-bold text-sm"
              >
                f
              </a>
              <a
                href="https://www.instagram.com/ehokor_lviv/"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 flex items-center justify-center text-gray-400 hover:text-[var(--logo-green)] transition-all text-sm"
              >
                ✦
              </a>
              <a
                href="https://ehokor.com.ua/"
                aria-label="Сайт"
                className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 flex items-center justify-center text-gray-400 hover:text-[var(--logo-green)] transition-all text-sm"
              >
                🌐
              </a>
            </div>
          </div>

          {/* Навігація */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p
              className="text-base font-bold mb-5"
              style={{ color: "var(--logo-green)" }}
            >
              Навігація
            </p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Головна" },
                { href: "/questionnaire", label: "Тест на ризики" },
                { href: "/services", label: "Послуги" },
                { href: "/about", label: "Про нас" },
                { href: "/contacts", label: "Контакти" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-[var(--logo-green)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Послуги */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p
              className="text-base font-bold mb-5"
              style={{ color: "var(--logo-default)" }}
            >
              Послуги
            </p>
            <ul className="space-y-3">
              {[
                { href: "/services", label: "Консультація сомнолога" },
                { href: "/services", label: "Полісомнографія" },
                { href: "/services", label: "Діагностика апное" },
                { href: "/questionnaire", label: "AI-діагностика сну" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-gray-500 hover:text-[var(--logo-green)] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Контакти */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p
              className="text-base font-bold mb-5"
              style={{ color: "var(--logo-aqua)" }}
            >
              Контакти
            </p>
            <ul className="space-y-3 w-full">
              <li>
                <a
                  href="tel:+380988814499"
                  className="flex items-center justify-center md:justify-start gap-2.5 text-sm text-gray-500 hover:text-[var(--logo-green)] transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs flex-shrink-0">
                    📞
                  </span>
                  +380 98 881 4499
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ehokor.com.ua"
                  className="flex items-center justify-center md:justify-start gap-2.5 text-sm text-gray-500 hover:text-[var(--logo-green)] transition-colors"
                >
                  <span className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs flex-shrink-0">
                    ✉️
                  </span>
                  info@ehokor.com.ua
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-2.5 text-sm text-gray-500">
                <span className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-xs flex-shrink-0">
                  📍
                </span>
                Львів, вул. Угорська, 17
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-gray-100 gap-3">
          <p className="text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} Ехокор. Всі права захищені.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">
              Працюємо онлайн та офлайн
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
