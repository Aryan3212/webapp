import '@/styles/globals.css'
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'WorkList',
  description: 'Fulfilling work for everyone.',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
