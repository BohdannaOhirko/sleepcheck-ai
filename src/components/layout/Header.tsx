'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 dark:bg-background/80 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md">
            <Image 
              src="/images/logo.svg"
              alt="Ехокор" 
              width={150} 
              height={40}
            />
          </Link>
 {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Головна
            </Link>
           <Link
            href="/questionnaire"
            className="px-3 py-2 rounded-md font-medium text-primary-foreground
  [--btn-bg:var(--logo-green)] bg-[var(--btn-bg)] 
  hover:[--btn-bg:rgba(255,0,0,0.8)]
  transition shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
  animate-pulse"
              >
            Тест на ризики
            </Link>
            <Link href="/about" className="px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Про нас
            </Link>
            <Link href="/contacts" className="px-3 py-2 rounded-md text-foreground/80 hover:text-foreground hover:bg-gray-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
              Контакти
            </Link>
            <Button asChild
             className="bg-[var(--logo-green)]">
              <Link href="/questionnaire">
                Пройти тест
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link 
              href="/" 
              className="block text-gray-700 hover:bg-[var(--logo-green)] transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Головна
            </Link>
           <Link
  href="/questionnaire"
  className="block text-gray-700 hover:bg-[var(--logo-green)] transition"
  onClick={() => setMobileMenuOpen(false)}
>
Тест на ризики
</Link>
            <Link 
              href="/about" 
              className="block text-gray-700 hover:bg-[var(--logo-green)] transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Про нас
            </Link>
            <Link 
              href="/contacts" 
              className="block text-gray-700 bg-blue-50 hover:bg-[var(--logo-green)] transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакти
            </Link>
            <Button asChild className="w-full">
              <Link href="/questionnaire">
                Пройти тест
              </Link>
            </Button>
          </div>
        )}
      </nav>
    </header>
  )
}
