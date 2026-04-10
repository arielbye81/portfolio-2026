import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CustomCursor } from '@/components/custom-cursor'

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Bei Ye — UI/UX Designer',
  description: '10+ years in UI/UX, transforming messy ideas into intuitive experiences.',
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <CustomCursor />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
