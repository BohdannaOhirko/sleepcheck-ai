import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Політика конфіденційності | SleepCheck AI — Ехокор",
  description:
    "Політика конфіденційності сервісу SleepCheck AI. Як ми збираємо, зберігаємо та захищаємо ваші персональні дані.",
};

export default function PrivacyPage() {
  const lastUpdated = "29 червня 2026 року";

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-sm text-gray-400 mb-2">
          Останнє оновлення: {lastUpdated}
        </p>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Політика конфіденційності
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Ця Політика конфіденційності пояснює, як ТзОВ «Медичний центр Ехокор»
          (далі — «Ехокор», «ми») збирає, використовує та захищає ваші
          персональні дані під час використання сервісу SleepCheck AI за адресою{" "}
          <a
            href="https://sleepcheck-ai.ehokor.com.ua"
            className="text-[var(--logo-green)] hover:underline"
          >
            sleepcheck-ai.ehokor.com.ua
          </a>{" "}
          (далі — «Сервіс»).
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            1. Хто відповідає за ваші дані
          </h2>
          <p>
            Оператором персональних даних є ТзОВ «Медичний центр Ехокор», м.
            Львів, вул. Угорська, 17. Контактна електронна пошта:{" "}
            <a
              href="mailto:info@ehokor.com.ua"
              className="text-[var(--logo-green)] hover:underline"
            >
              info@ehokor.com.ua
            </a>
            .
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            2. Які дані ми збираємо
          </h2>
          <p className="mb-3">
            Залежно від того, як ви використовуєте Сервіс, ми можемо збирати
            такі категорії даних:
          </p>

          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800 mb-1">
                а) Реєстрація та профіль
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ім&apos;я</li>
                <li>Номер телефону</li>
                <li>Адреса електронної пошти</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">
                б) Повна анкета сну (30 питань)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Вік, стать, індекс маси тіла (ІМТ)</li>
                <li>
                  Симптоми порушень сну (хропіння, денна сонливість, якість сну
                  тощо)
                </li>
                <li>Загальний бал, рівень ризику, персональні рекомендації</li>
                <li>Регіон (визначається автоматично)</li>
              </ul>
              <p className="text-sm mt-2 text-gray-500">
                Ці дані зберігаються лише якщо ви увійшли в акаунт. Анонімні
                проходження не зберігаються.
              </p>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">
                в) Скринінг апное (STOP-BANG)
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Відповіді на 5 питань шкали STOP-BANG</li>
                <li>Числовий бал, рівень ризику</li>
                <li>Місто та країна (визначаються автоматично)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">
                г) Форма запису на консультацію
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Ім&apos;я, номер телефону, email (необов&apos;язково)</li>
                <li>Тип бажаної послуги, коментар</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-gray-800 mb-1">
                д) Технічні дані
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>IP-адреса (для захисту від зловживань — rate limiting)</li>
                <li>Дата і час звернень</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            3. Для чого ми використовуємо ваші дані
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              Надання доступу до особистого кабінету та збереження результатів
              діагностики
            </li>
            <li>
              Генерація персональних рекомендацій на основі відповідей анкети
            </li>
            <li>
              Обробка заявок на консультацію та зворотний зв&apos;язок з вами
            </li>
            <li>Захист Сервісу від зловживань (rate limiting, XSS-захист)</li>
            <li>Покращення якості Сервісу на основі агрегованої статистики</li>
          </ul>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            4. Передача даних третім сторонам
          </h2>
          <p className="mb-3">
            Ми не продаємо та не передаємо ваші персональні дані третім особам,
            за винятком таких технічних партнерів, залучених виключно для
            надання Сервісу:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              <span className="font-semibold">Supabase Inc.</span> — хмарна база
              даних для зберігання профілів і результатів анкетування. Дані
              зберігаються на захищених серверах.{" "}
              <a
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--logo-green)] hover:underline"
              >
                Політика конфіденційності Supabase
              </a>
              .
            </li>
            <li>
              <span className="font-semibold">Anthropic PBC</span> — AI-модель
              Claude використовується для генерації рекомендацій у чат-асистенті
              та аналізу результатів анкети. До Anthropic передаються лише
              знеособлені відповіді анкети без імені, телефону чи email.{" "}
              <a
                href="https://www.anthropic.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--logo-green)] hover:underline"
              >
                Політика конфіденційності Anthropic
              </a>
              .
            </li>
            <li>
              <span className="font-semibold">Zoho Mail</span> — SMTP-сервіс для
              надсилання вам підтверджень реєстрації та передачі заявок на
              консультацію адміністраторам клініки.
            </li>
            <li>
              <span className="font-semibold">Vercel Inc.</span> — хостинг
              Сервісу. Vercel обробляє HTTP-запити в рамках надання
              інфраструктури.
            </li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            5. Зберігання та захист даних
          </h2>
          <p className="mb-2">
            Ваші дані зберігаються в базі даних Supabase із застосуванням
            шифрування при передачі (TLS/HTTPS) та розмежуванням доступу (Row
            Level Security).
          </p>
          <p>
            Ми застосовуємо технічні заходи захисту: обмеження частоти запитів
            (rate limiting), захист від XSS-атак, автентифікацію через захищені
            токени сесії.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            6. Термін зберігання
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>
              Дані профілю та результати анкет зберігаються протягом усього часу
              існування вашого акаунту.
            </li>
            <li>Після видалення акаунту дані видаляються протягом 30 днів.</li>
            <li>
              Анонімні результати скринінгу без прив&apos;язки до акаунту
              зберігаються не більше 12 місяців.
            </li>
            <li>
              IP-адреси для rate limiting зберігаються не більше 24 годин.
            </li>
          </ul>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            7. Ваші права
          </h2>
          <p className="mb-3">
            Відповідно до Закону України «Про захист персональних даних» ви
            маєте право:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm">
            <li>Знати, які ваші дані ми обробляємо</li>
            <li>Отримати доступ до своїх даних</li>
            <li>Вимагати виправлення неточних даних</li>
            <li>Вимагати видалення ваших даних («право бути забутим»)</li>
            <li>Відкликати згоду на обробку даних у будь-який момент</li>
          </ul>
          <p className="mt-3">
            Для реалізації прав звертайтесь на{" "}
            <a
              href="mailto:info@ehokor.com.ua"
              className="text-[var(--logo-green)] hover:underline"
            >
              info@ehokor.com.ua
            </a>
            . Ми відповімо протягом 10 робочих днів.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Cookies</h2>
          <p>
            Сервіс використовує технічно необхідні cookies для підтримки сесії
            авторизованого користувача. Ми не використовуємо маркетингові або
            аналітичні cookie-файли третіх сторін.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">
            9. Зміни до Політики
          </h2>
          <p>
            Ми можемо оновлювати цю Політику. Про суттєві зміни ми повідомимо
            шляхом розміщення нової версії на цій сторінці із зазначенням дати
            оновлення. Продовження використання Сервісу після публікації змін
            означає вашу згоду з оновленою Політикою.
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Контакти</h2>
          <p>
            З питань конфіденційності звертайтесь:{" "}
            <a
              href="mailto:info@ehokor.com.ua"
              className="text-[var(--logo-green)] hover:underline"
            >
              info@ehokor.com.ua
            </a>
            <br />
            ТзОВ «Медичний центр Ехокор», м. Львів, вул. Угорська, 17.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-100">
        <Link
          href="/"
          className="text-sm text-[var(--logo-green)] hover:underline"
        >
          ← Повернутись на головну
        </Link>
      </div>
    </main>
  );
}
