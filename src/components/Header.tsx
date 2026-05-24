// =================================================================
// HEADER COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Navigation header with company logo and menu
// Contains: Company branding, navigation links, mobile menu toggle
// Used by: All pages
// =================================================================

'use client'

import { useState } from 'react'
import Link from 'next/link'

// Header component with responsive navigation
export default function Header() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gold/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Company logo/brand */}
          <Link 
            href="/" 
            className="text-xl font-heading font-bold text-gold tracking-tight transition-all duration-300 ease-in-out hover:text-white hover:shadow-gold hover:shadow-lg hover:scale-105 rounded-lg px-2 py-1"
          >
            Delta Homes Gh
          </Link>

          {/* Desktop navigation menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-white font-body hover:text-gold transition-colors font-medium relative group">
              Home
              {/* Gold underline appears on hover */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/properties" className="text-white font-body hover:text-gold transition-colors font-medium relative group">
              Properties
              {/* Gold underline appears on hover */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/contact" className="text-white font-body hover:text-gold transition-colors font-medium relative group">
              Contact Us
              {/* Gold underline appears on hover */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/auth/login" className="text-gold font-body hover:text-yellow-500 transition-colors font-medium relative group">
              Agent Login
              {/* Gold underline appears on hover */}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile navigation menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-gold transition-colors relative group">
                Home
                {/* Gold underline appears on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/properties" className="text-white hover:text-gold transition-colors relative group">
                Properties
                {/* Gold underline appears on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/contact" className="text-white hover:text-gold transition-colors relative group">
                Contact Us
                {/* Gold underline appears on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/auth/login" className="text-gold hover:text-yellow-500 transition-colors relative group">
                Agent Login
                {/* Gold underline appears on hover */}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
