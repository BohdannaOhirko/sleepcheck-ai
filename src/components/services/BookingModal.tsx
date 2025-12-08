'use client';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
}

export default function BookingModal({ isOpen, onClose, serviceName }: BookingModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-light tracking-tight">Запис на послугу</h3>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
              ✕
            </button>
          </div>
          
          <div className="mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
            <p className="text-sm font-medium text-primary">{serviceName}</p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Ваше ім'я</label>
              <input type="text" placeholder="Іван Іваненко" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Телефон</label>
              <input type="tel" placeholder="+38 (0__) ___-__-__" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Email (опціонально)</label>
              <input type="email" placeholder="example@mail.com" className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-muted-foreground">Коментар</label>
              <textarea rows={3} placeholder="Ваші побажання щодо дати..." className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full group relative px-8 py-4 rounded-xl font-medium overflow-hidden transition-all duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--logo-green)] to-[var(--logo-lime)] transition-transform duration-500 group-hover:scale-110"></div>
              <span className="relative text-white">Відправити заявку</span>
            </button>

            <p className="text-xs text-muted-foreground text-center">Ми зв'яжемось з вами протягом робочого дня</p>
          </form>
        </div>
      </div>
    </div>
  );
}