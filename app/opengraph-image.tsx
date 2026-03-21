import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const alt = 'Verein 7 Eichen Siebnen'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'

export default async function Image() {
  const imgData = await readFile(join(process.cwd(), 'public/images/home/siebnen.jpg'), 'base64')
  const imgSrc = `data:image/jpeg;base64,${imgData}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
        }}
      >
        {/* Background image */}
        <img src={imgSrc} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
          }}
        />

        {/* Gold top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#d4aa00',
          }}
        />

        {/* Text content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '60px',
            width: '100%',
          }}
        >
          <p
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#d4aa00',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              margin: 0,
              marginBottom: 16,
            }}
          >
            Willkommen beim
          </p>
          <p
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: '#ffffff',
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Verein{' '}
            <span style={{ color: '#d4aa00' }}>7 Eichen</span>
          </p>
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              color: '#d4aa00',
              margin: 0,
              marginTop: 8,
            }}
          >
            Siebnen
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
