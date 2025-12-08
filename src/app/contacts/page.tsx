'use client';

import ContactHero from '@/components/contacts/ContactHero';
import ContactInfo from '@/components/contacts/ContactInfo';
import ContactForm from '@/components/contacts/ContactForm';
import ContactFAQ from '@/components/contacts/ContactFAQ';

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-background">
      <ContactHero />
      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto max-w-3xl"></div>
      <ContactInfo />
      <ContactForm />
      <ContactFAQ />
      
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-light mb-6 tracking-tight">Не знайшли відповідь?</h2>
          <p className="text-lg text-muted-foreground mb-10 font-light">
            Запитайте у нашого AI-консультанта — він працює 24/7
          </p>
          <a href="/" className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-light text-lg border border-border hover:bg-accent transition-all duration-500 hover:scale-105">
            Чат з AI-консультантом 💬
          </a>
        </div>
      </section>
    </div>
  );
}