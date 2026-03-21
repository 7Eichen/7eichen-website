export interface Event {
  name: string
  location: string
  start: string   // 'YYYY-MM-DD'
  end?: string    // optional, 'YYYY-MM-DD'
  description: string
  url?: string
}

export const events: Event[] = [
  {
    name: 'Jahresversammlung 2026',
    location: 'Gemeindesaal Siebnen',
    start: '2026-03-28',
    description: 'Ordentliche Jahresversammlung des Vereins 7 Eichen mit Wahlen und Jahresbericht.',
  },
  {
    name: 'Frühlingsputz Siebnen',
    location: 'Treffpunkt Dorfplatz Siebnen',
    start: '2026-04-18',
    description: 'Gemeinsam machen wir das Dorf fit für den Frühling. Alle Hände sind willkommen!',
  },
  {
    name: 'Dorffest 2026',
    location: 'Dorfplatz Siebnen',
    start: '2026-06-13',
    end: '2026-06-14',
    description: 'Grosses Dorffest mit Musik, Essen und Unterhaltung für die ganze Familie.',
    url: 'https://www.siebnen.ch',
  },
  {
    name: 'Jahresausflug',
    location: 'Wird noch bekannt gegeben',
    start: '2026-08-22',
    description: 'Diesjähriger Vereinsausflug – Destination und Details folgen.',
  },
  {
    name: 'Weihnachtsmarkt Siebnen',
    location: 'Dorfplatz Siebnen',
    start: '2026-12-05',
    end: '2026-12-06',
    description: 'Stimmungsvoller Weihnachtsmarkt mit lokalen Ausstellern, Glühwein und Unterhaltung.',
  },
]
