'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { LogoIcon } from './LogoIcon'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/events', label: 'Veranstaltungen' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--background)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease, padding 0.3s ease',
      }}
    >
      <div
        className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6"
        style={{
          paddingTop: scrolled ? '0.5rem' : '1rem',
          paddingBottom: scrolled ? '0.5rem' : '1rem',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="Verein 7 Eichen Siebnen – Startseite">
          <LogoIcon
            style={{
              height: scrolled ? '2rem' : '2.75rem',
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className="nav-link"
                style={{ opacity: isActive ? 1 : undefined }}
                data-active={isActive ? 'true' : undefined}
              >
                {label}
              </Link>
            )
          })}
          <div className="h-5 w-px" style={{ backgroundColor: 'var(--border)' }} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
