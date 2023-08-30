'use client'

import { useRouter } from "next/navigation"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  const router = useRouter()
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => router.push('/')}>Let&aposs go home?</button>
      </body>
    </html>
  )
}