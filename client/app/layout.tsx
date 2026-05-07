import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLIENT_URL || 'http://localhost:3000'),
  title: 'NeuroLearn 3D - Interactive 3D Learning Platform',
  description: 'Learn with interactive 3D models, AI-powered quizzes, and voice assistance',
  keywords: 'education, 3D learning, AI, interactive, neuroscience',
  authors: [{ name: 'NeuroLearn Team' }],
  openGraph: {
    title: 'NeuroLearn 3D',
    description: 'Interactive 3D learning platform powered by AI',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-dark text-light">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
