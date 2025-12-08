export default function ContactForm() {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12">
          <h3 className="text-2xl font-light mb-6 tracking-tight text-center">Швидкий запис на консультацію</h3>
          <form className="max-w-2xl mx-auto space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Ваше ім'я</label>
                <input type="text" placeholder="Іван Іваненко" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Телефон</label>
                <input type="tel" placeholder="+38 (0__) ___-__-__" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Email</label>
                <input type="email" placeholder="example@mail.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Тип консультації</label>
                <select className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                  <option>Перша консультація</option>
                  <option>Полісомнографія</option>
                  <option>Повторний прийом</option>
                  <option>Інше</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Коментар</label>
              <textarea rows={4} placeholder="Опишіть вашу ситуацію..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full group relative px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] transition-transform duration-500 group-hover:scale-110"></div>
              <span className="relative text-white flex items-center justify-center gap-2">
                Відправити заявку
                <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
              </span>
            </button>

            <p className="text-xs text-muted-foreground text-center">Ми зв'яжемось з вами протягом робочого дня</p>
          </form>
        </div>
      </div>
    </section>
  );
}