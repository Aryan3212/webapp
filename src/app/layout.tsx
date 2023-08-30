import '@/styles/globals.css'
import type { Metadata } from 'next'
import Providers from './providers'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.worklist.club/'),
  title: 'WorkList',
  description: 'Fulfilling work for everyone. Find jobs here!',
  openGraph: {
    url: '/',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WorkList',
    description: 'Fulfilling work for everyone. Find jobs here!',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
