import type { Metadata } from 'next'
import Link from 'next/link'
import { getEvents, type Event } from '@/lib/events'
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

function formatWeekdayRange(start: string, end?: string): string {
  const fmt = (d: string) => new Date(d).toLocaleDateString('de-CH', { weekday: 'long' })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
}

function formatDateRange(start: string, end?: string): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
}

export default function EventsPage() {
  const sorted = [...getEvents()].sort((a, b) => a.start.localeCompare(b.start))
  const now = new Date().toISOString().slice(0, 10)

  const upcoming = sorted.filter((e) => (e.end ?? e.start) >= now)
  const past = sorted.filter((e) => (e.end ?? e.start) < now)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold sm:text-4xl" style={{ color: 'var(--foreground)' }}>
          Veranstaltungen
        </h1>
        <p className="mt-2 text-base" style={{ color: 'var(--muted-foreground)' }}>
          Anlässe und Events des Verein 7 Eichen Siebnen
        </p>
      </div>

      <EventTable events={upcoming} />

      {past.length > 0 && (
        <div className="mt-12">
          <h2 className="mb-4 text-lg font-semibold" style={{ color: 'var(--muted-foreground)' }}>
            Vergangene Veranstaltungen
          </h2>
          <EventTable events={past} muted />
        </div>
      )}
    </div>
  )
}

function EventTable({ events, muted = false }: { events: Event[]; muted?: boolean }) {
  if (events.length === 0) {
    return (
      <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
        Keine Veranstaltungen vorhanden.
      </p>
    )
  }

  return (
    <div
      className="card overflow-hidden rounded-2xl"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                Datum
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                Veranstaltung
              </th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell" style={{ color: 'var(--muted-foreground)' }}>
                Ort
              </th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell" style={{ color: 'var(--muted-foreground)' }}>
                Organisator
              </th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>
                Info
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => (
              <tr
                key={i}
                style={{
                  borderBottom: i < events.length - 1 ? '1px solid var(--border)' : undefined,
                  opacity: muted ? 0.45 : 1,
                  fontStyle: muted ? 'italic' : undefined,
                }}
              >
                <td className="px-4 py-3 font-medium tabular-nums" style={{ color: 'var(--foreground)' }}>
                  <span className="block text-xs font-medium" style={{ color: 'var(--muted-foreground)' }}>
                    {formatWeekdayRange(event.start, event.end)}
                  </span>
                  {formatDateRange(event.start, event.end)}
                </td>
                <td className="px-4 py-3" style={{ color: 'var(--foreground)' }}>
                  <span className="font-medium">{event.name}</span>
                  {event.description && (
                    <span className="mt-0.5 block text-xs" style={{ color: 'var(--muted-foreground)' }}>
                      {event.description}
                    </span>
                  )}
                  <span className="mt-0.5 block text-xs sm:hidden" style={{ color: 'var(--muted-foreground)' }}>
                    {event.location}
                  </span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--muted-foreground)' }}>
                  {event.location}
                </td>
                <td className="px-4 py-3 hidden md:table-cell" style={{ color: 'var(--muted-foreground)' }}>
                  {event.organizer}
                </td>
                <td className="px-4 py-3">
                  {event.url ? (
                    <Link
                      href={event.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium underline underline-offset-2 hover:opacity-75"
                      style={{ color: '#6b3b19' }}
                    >
                      Details →
                    </Link>
                  ) : (
                    <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
