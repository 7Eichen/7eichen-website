'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { Event } from '@/lib/events'

function formatWeekdayRange(start: string, end?: string): string {
  const fmt = (d: string) => new Date(d).toLocaleDateString('de-CH', { weekday: 'long' })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
}

function formatDateRange(start: string, end?: string): string {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return end ? `${fmt(start)} – ${fmt(end)}` : fmt(start)
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
    <div className="card overflow-hidden rounded-2xl" style={{ backgroundColor: 'var(--card)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>Datum</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>Veranstaltung</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell" style={{ color: 'var(--muted-foreground)' }}>Ort</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell" style={{ color: 'var(--muted-foreground)' }}>Organisator</th>
              <th className="px-4 py-3 text-left font-semibold" style={{ color: 'var(--muted-foreground)' }}>Info</th>
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
                <td className="px-4 py-3 hidden sm:table-cell" style={{ color: 'var(--muted-foreground)' }}>{event.location}</td>
                <td className="px-4 py-3 hidden md:table-cell" style={{ color: 'var(--muted-foreground)' }}>{event.organizer}</td>
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

export function EventsTabs({ upcoming, past }: { upcoming: Event[]; past: Event[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab') ?? 'upcoming'

  function onTabChange(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', value)
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Tabs value={tab} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-6 !inline-flex !w-fit gap-1">
        <TabsTrigger value="upcoming" className="cursor-pointer !h-9 px-4 text-sm">
          Termine
        </TabsTrigger>
        <TabsTrigger value="past" className="cursor-pointer !h-9 px-4 text-sm">
          Vergangene Termine
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <EventTable events={upcoming} />
      </TabsContent>
      <TabsContent value="past">
        <EventTable events={past} muted />
      </TabsContent>
    </Tabs>
  )
}
