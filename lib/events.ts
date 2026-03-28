import fs from 'fs'
import path from 'path'
import * as XLSX from 'xlsx'

export interface Event {
  name: string
  description?: string
  location: string
  start: string  // 'YYYY-MM-DD'
  end?: string   // optional, 'YYYY-MM-DD'
  organizer: string
  url?: string
}

function toDateStr(val: unknown): string {
  if (val instanceof Date) {
    const y = val.getUTCFullYear()
    const m = String(val.getUTCMonth() + 1).padStart(2, '0')
    const d = String(val.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  const str = String(val ?? '').trim()
  // Accept dd.mm.yyyy and convert to yyyy-mm-dd
  const dmyMatch = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2]}-${dmyMatch[1]}`
  return str
}

export function getEvents(): Event[] {
  const filePath = path.join(process.cwd(), 'data', 'events.xlsx')
  const workbook = XLSX.read(fs.readFileSync(filePath), { cellDates: true })
  const sheet = workbook.Sheets[workbook.SheetNames[0]]
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })

  return rows
    .map((row) => {
      const start = toDateStr(row.start)
      const end = toDateStr(row.end)
      return {
        name: String(row.name ?? '').trim(),
        ...(row.description ? { description: String(row.description).trim() } : {}),
        location: String(row.location ?? '').trim(),
        start,
        ...(end ? { end } : {}),
        organizer: String(row.organizer ?? '').trim(),
        ...(row.url ? { url: String(row.url).trim() } : {}),
      }
    })
    .filter((e) => e.name && e.start)
}
