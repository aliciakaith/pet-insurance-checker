import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const faktum = localFont({
  src: [
    {
      path: './fonts/Rene Bieder - Faktum Test Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Rene Bieder - Faktum Test Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Will Fetch cover this?',
  description: 'AI-powered Fetch Australia coverage checker',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={faktum.className} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
