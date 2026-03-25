export default function ContactHero() {
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>
      <div className="relative container mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-block">
          <span className="text-sm tracking-wider text-muted-foreground uppercase">Зв&apos;язок з нами</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight tracking-tight">
          Ми завжди
          <br />
          <span className="font-semibold bg-gradient-to-r from-[var(--logo-aqua)] to-[var(--logo-green)] bg-clip-text text-transparent">
            на зв&apos;язку
          </span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed font-light">
          Маєте питання? Потрібна консультація? Ми готові допомогти.
        </p>
      </div>
    </section>
  );
}