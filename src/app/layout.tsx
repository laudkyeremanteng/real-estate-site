// =================================================================
// ROOT LAYOUT COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Main layout wrapper for the entire application
// Contains: Metadata configuration, font setup, and HTML structure
// Used by: All pages in the Next.js App Router
// =================================================================

import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

// Configure Plus Jakarta Sans font for headings
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'] })

// Website metadata for SEO and browser display
export const metadata: Metadata = {
  title: 'Delta Homes Gh - Luxury Real Estate',
  description: 'Discover exclusive properties in Ghana. Delta Homes Gh offers premium real estate sales, investments & development services in Ghana\'s most prestigious neighborhoods.',
}

// Root layout component - wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>{children}</body>
    </html>
  )
}
