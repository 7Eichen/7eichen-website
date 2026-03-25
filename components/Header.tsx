'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { LogoIcon } from './LogoIcon'
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from './ui/sheet'

const navLinks = [
  { href: '/', label: 'Start' },
  { href: '/events', label: 'Veranstaltungen' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const shrinkAt = 40
    const expandAt = 10

    const onScroll = () => {
      const y = window.scrollY
      setScrolled((current) => {
        if (!current && y > shrinkAt) return true
        if (current && y < expandAt) return false
        return current
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: 'var(--background)',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6"
        style={{
          paddingTop: scrolled ? '0.75rem' : '1.1rem',
          paddingBottom: scrolled ? '0.75rem' : '1.1rem',
          transition: 'padding 0.3s ease',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Verein 7 Eichen Siebnen – Startseite"
          className="flex items-center"
        >
          <LogoIcon
            style={{
              height: scrolled ? '2.8rem' : '3.5rem',
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
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

        {/* Mobile: theme toggle + Sheet trigger */}
        <div className="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button
                aria-label="Menü öffnen"
                className="p-2 rounded-md"
                style={{ color: 'var(--foreground)' }}
              >
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col gap-1 px-6 pt-8">
                {navLinks.map(({ href, label }) => {
                  const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
                  return (
                    <SheetClose asChild key={href}>
                      <Link
                        href={href}
                        className="nav-link py-3"
                        style={{ opacity: isActive ? 1 : undefined, fontSize: '1rem' }}
                        data-active={isActive ? 'true' : undefined}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
