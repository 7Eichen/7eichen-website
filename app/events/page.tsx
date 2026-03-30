import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getEvents } from '@/lib/events'
import { EventsTabs } from '@/components/EventsTabs'
import { BASE_URL } from '@/lib/constants'

const url = `${BASE_URL}/events`

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle Veranstaltungen und Anlässe des Verein 7 Eichen Siebnen.',
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    url,
    title: 'Veranstaltungen | Verein 7 Eichen Siebnen',
    description: 'Alle Veranstaltungen und Anlässe des Verein 7 Eichen Siebnen.',
  },
}

export default function EventsPage() {
  const sorted = [...getEvents()].sort((a, b) => a.start.localeCompare(b.start))
  const now = new Date().toISOString().slice(0, 10)

  const upcoming = sorted.filter((e) => (e.end ?? e.start) >= now)
  const past = sorted.filter((e) => (e.end ?? e.start) < now).reverse()

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          Veranstaltungen
        </h1>
        <p className="mt-4 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
          Anlässe und Events des Verein 7 Eichen Siebnen
        </p>
      </div>

      <Suspense>
        <EventsTabs upcoming={upcoming} past={past} />
      </Suspense>
    </div>
  )
}
