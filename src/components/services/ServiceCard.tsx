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
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md transition-all duration-300 p-7">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center text-xl`}>
              {service.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-0.5">{service.title}</h3>
              <p className="text-sm text-gray-400">{service.subtitle}</p>
            </div>
          </div>

          <p className="text-gray-500 leading-relaxed mb-4 text-sm">{service.description}</p>

          <div className="flex flex-wrap gap-2">
            {service.features.map((feature, index) => (
              <span key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-100 text-xs text-gray-600">
                <span style={{ color: service.color }}>✓</span>
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 flex-shrink-0">
          <div className="lg:text-right">
            <div className="text-3xl font-bold">
              <span className={`bg-gradient-to-r ${service.gradient} bg-clip-text text-transparent`}>
                {service.price.toLocaleString()}
              </span>
              <span className="text-base text-gray-400 font-normal"> грн</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">фіксована ціна</p>
          </div>
          <button
            onClick={() => onBook(service.title)}
            className="flex-shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: service.color }}
          >
            Записатись →
          </button>
        </div>
      </div>
    </div>
  );
}