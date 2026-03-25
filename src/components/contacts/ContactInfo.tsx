export default function ContactInfo() {
  const contacts = [
    { icon: '📍', title: 'Адреса', content: 'м. Львів, вул. Угорська, 17' },
    { icon: '📞', title: 'Телефон', content: '+38 (098) 881 4499', link: 'tel:+380988814499', sub: '+38 (098) 881 4499 (мобільний)' },
    { icon: '✉️', title: 'Email', content: 'info@ehokor.ua', link: 'mailto:info@ehokor.ua' },
    { icon: '🕐', title: 'Графік роботи', content: 'Пн-Пт: 08:00 - 19:00', sub: 'Сб: 08:00 - 17:00', sub2: 'Нд: вихідний' },
  ];

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-light mb-8 tracking-tight">Медичний центр &quot;Ехокор&quot;</h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Спеціалізуємось на діагностиці та лікуванні розладів сну. Працюємо з 2008 року.
              </p>
            </div>

            <div className="space-y-6">
              {contacts.map((item, index) => (
                <div key={index} className="group flex gap-4 items-start transition-all duration-500 hover:translate-x-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                    {item.link ? (
                      <>
                        <a href={item.link} className="text-muted-foreground font-light hover:text-foreground transition-colors">
                          {item.content}
                        </a>
                       
                      </>
                    ) : (
                      <p className="text-muted-foreground font-light">
                        {item.content}
                        {item.sub && <><br /><span className="text-sm">{item.sub}</span></>}
                        {item.sub2 && <><br />{item.sub2}</>}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <a href="https://www.google.com/maps/search/Городоцька+99+Львів" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-light">
                Відкрити в Google Maps
                <span className="transition-transform duration-300 hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
            <div className="w-full h-[500px] relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.9234567890123!2d24.0123456!3d49.8123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDQ4JzQ0LjQiTiAyNMKwMDAnNDQuNCJF!5e0!3m2!1suk!2sua!4v1234567890123!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта розташування медичного центру Ехокор"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              ></iframe>
            </div>
            <div className="p-6 bg-muted/30">
              <p className="text-sm text-muted-foreground font-light">
                📍 Ми розташовані у центрі Львова, зручний під&apos;їзд та паркування
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}