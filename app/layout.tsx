import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from 'next-themes'
import { BASE_URL } from '@/lib/constants'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Verein 7 Eichen Siebnen',
    template: '%s | Verein 7 Eichen Siebnen',
  },
  description:
    'Der Einwohnerverein von Siebnen – für ein lebendiges Dorfgemeinschaftsleben.',
  openGraph: {
    siteName: 'Verein 7 Eichen Siebnen',
    locale: 'de_CH',
    type: 'website',
    title: 'Verein 7 Eichen Siebnen',
    description: 'Der Einwohnerverein von Siebnen – für ein lebendiges Dorfgemeinschaftsleben.',
    url: BASE_URL,
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" suppressHydrationWarning className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
