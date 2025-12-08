'use client';

interface Service {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: number;
  gradient: string;
  color: string;
}

interface ServiceCardProps {
  service: Service;
  onBook: (title: string) => void;
}

export default function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <div className="group bg-card border border-border rounded-3xl p-8 md:p-10 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-2xl`}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-2xl font-light mb-1 tracking-tight">{service.title}</h3>
              <p className="text-sm text-muted-foreground font-light">{service.subtitle}</p>
            </div>
          </div>
          <p className="text-muted-foreground font-light leading-relaxed mb-4">
            {service.description}
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground font-light">
            {service.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span style={{ color: service.color }}>✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:text-right flex-shrink-0">
          <div className="mb-4">
            <div className="text-4xl font-light mb-1">
              <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                {service.price.toLocaleString()}
              </span>
              <span className="text-xl text-muted-foreground"> грн</span>
            </div>
            <p className="text-xs text-muted-foreground font-light">Остаточна ціна</p>
          </div>
          <button
            onClick={() => onBook(service.title)}
            className="group/btn px-6 py-3 rounded-xl font-light text-sm border border-primary hover:bg-primary hover:text-white transition-all duration-300 w-full lg:w-auto"
          >
            <span className="flex items-center justify-center gap-2">
              Записатись
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}