import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Asteroids',
  description: 'Сервис по покупки сближений с планетой Земля. Мы лучшие во всей вселенной',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
