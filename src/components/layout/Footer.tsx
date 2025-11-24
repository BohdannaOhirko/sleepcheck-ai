import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Про компанію */}
          <div>
            <h4 className="font-semibold mb-4 text-left">Ехокор</h4>
            <p className="text-gray-400 text-sm text-left">
              Медичний центр з діагностики розладів сну. 
              Допомагаємо покращити якість вашого життя.
            </p>
          </div>

          {/* Навігація */}
          <div>
            <h4 className="font-semibold mb-4">Навігація</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition">
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/questionnaire" className="text-gray-400 hover:text-white transition">
                  Тест на ризики
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition">
                  Послуги
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Про нас
                </Link>
              </li>
            </ul>
          </div>

          {/* Послуги */}
          <div>
            <h4 className="font-semibold mb-4">Послуги</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">Консультація сомнолога</li>
              <li className="text-gray-400">Полісомнографія</li>
              <li className="text-gray-400">Діагностика апное</li>
              <li className="text-gray-400">Лікування розладів сну</li>
            </ul>
          </div>

          {/* Контакти */}
          <div>
            <h4 className="font-semibold mb-4">Контакти</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={16} />
                <span>+380 98 098 881 4499</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={16} />
                <span>info @ehokor.com.ua</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={16} />
                <span>Львів, вул. Угорська, 17</span>
              </li>
            </ul>
            
            {/* Соцмережі */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Ехокор. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  )
}

