export default function ContactFAQ() {
  const faqs = [
    { q: 'Чи потрібно направлення від лікаря?', a: 'Ні, направлення не обов\'язкове. Ви можете записатись на консультацію самостійно або спочатку пройти безкоштовну AI-діагностику.' },
    { q: 'Скільки триває полісомнографія?', a: 'Дослідження проводиться вночі і триває 6-8 годин. Ви приїжджаєте ввечері, спите в комфортній палаті з датчиками, а вранці отримуєте результати.' },
    { q: 'Чи є паркування?', a: 'Так, біля нашої клініки є безкоштовний паркінг для пацієнтів. Також зручний під\'їзд громадським транспортом — зупинка в 2 хвилинах ходьби.' },
    { q: 'Які способи оплати доступні?', a: 'Ми приймаємо готівку, картки Visa/Mastercard, а також безготівковий розрахунок для юридичних осіб.' },
  ];

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-muted/20 to-transparent">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-light mb-4 tracking-tight">Часті питання</h2>
          <p className="text-muted-foreground font-light">Відповіді на найпопулярніші запитання</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
              <summary className="font-medium cursor-pointer list-none flex justify-between items-center">
                <span>{faq.q}</span>
                <span className="text-2xl transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-muted-foreground font-light leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}