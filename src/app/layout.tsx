import '../styles/globals.css'
import React from 'react'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'EmotionAI',
  description: 'Empowering Scalable Emotional Support',
  icons: {
    icon: '/icon.png',       // <-- your favicon
    shortcut: '/icon.png',   // <-- optional “shortcut icon” for older browsers
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
