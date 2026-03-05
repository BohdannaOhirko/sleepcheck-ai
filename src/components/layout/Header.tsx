'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, User, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => {
      subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/services', label: 'Послуги' },
    { href: '/about', label: 'Про нас' },
    { href: '/contacts', label: 'Контакти' },
  ]

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.08)]'
        : 'bg-white/80 backdrop-blur-sm border-b border-gray-100'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Логотип */}
        <Link href="/" className="flex-shrink-0">
          <Image src="/images/logo.svg" alt="Ехокор" width={130} height={36} priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                pathname === href
                  ? 'text-[var(--logo-green)] bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/questionnaire"
            className="relative flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl overflow-hidden group"
            style={{ background: 'var(--logo-green)' }}
          >
            <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            <span className="relative flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Тест на ризики
            </span>
          </Link>

          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:border-green-300 hover:text-[var(--logo-green)] hover:bg-green-50/50 transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--logo-green)' }}>
                <User size={13} className="text-white" />
              </div>
              Кабінет
            </Link>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
            >
              Увійти
              <ChevronRight size={14} className="text-gray-400" />
            </Link>
          )}
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3">
          {/* Навігаційні лінки */}
          <div className="space-y-1 mb-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  pathname === href
                    ? 'text-[var(--logo-green)] bg-green-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Розділювач */}
          <div className="h-px bg-gray-100 mb-3" />

          {/* CTA кнопки */}
          <div className="space-y-2 pb-1">
            <Link
              href="/questionnaire"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--logo-green), #1a7a4a)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Тест на ризики
            </Link>

            {isLoggedIn ? (
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:border-green-200 hover:bg-green-50 transition-all active:scale-95"
              >
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--logo-green)' }}>
                  <User size={11} className="text-white" />
                </div>
                Кабінет
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 w-full py-3 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-100 transition-all active:scale-95"
              >
                Увійти
                <ChevronRight size={14} className="text-gray-400" />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}