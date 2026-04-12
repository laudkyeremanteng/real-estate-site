// =================================================================
// CONTACT PAGE - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Dedicated contact page with full contact information
// Contains: Page header, contact section with multiple contact methods
// Route: /contact
// =================================================================

'use client' // Enable client-side functionality for scroll animations

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

// Contact page component with main title styling and animations
export default function ContactPage() {
  // Reference for the main "Let's Connect" text element
  const mainTitleRef = useRef<HTMLHeadingElement>(null)
  // State to track if main title animation has started
  const [hasMainAnimated, setHasMainAnimated] = useState(false)

  // Function to split text into individual letters with spans
  const createLetterSpans = (text: string, className: string) => {
    return text.split('').map((letter, index) => (
      <span key={index} className={`letter ${className}`}>
        {letter}
      </span>
    ))
  }

  // Start letter-by-letter animation for main title immediately on page load
  useEffect(() => {
    // Start typing animation immediately when component mounts
    const startMainTyping = () => {
      if (mainTitleRef.current && !hasMainAnimated) {
        console.log('Starting main title letter-by-letter animation') // Debug log
        
        // Add letter-by-letter animation to all letter spans
        const letters = mainTitleRef.current?.querySelectorAll('.letter')
        if (letters) {
          letters.forEach((letter, index) => {
            // Stagger the animation start time for each letter - slower speed
            setTimeout(() => {
              ;(letter as HTMLElement).style.opacity = '1'
              ;(letter as HTMLElement).style.transform = 'translateY(0) scale(1) rotateX(0deg)'
            }, index * 200) // 200ms delay between each letter (slower)
          })
          
          // Remove cursors after typing completes
          setTimeout(() => {
            const whiteText = mainTitleRef.current?.querySelector('.text-white')
            const goldText = mainTitleRef.current?.querySelector('.text-gold')
            if (whiteText) whiteText.classList.add('typing-complete')
            if (goldText) goldText.classList.add('typing-complete')
          }, 2400) // Wait for all letters to appear
        }
        
        setHasMainAnimated(true) // Prevent re-animation
      }
    }

    // Small delay to ensure DOM is ready, then start typing
    const timer = setTimeout(startMainTyping, 500)

    // Cleanup timer on component unmount
    return () => {
      clearTimeout(timer)
    }
  }, []) // Empty dependency array - runs only once on mount

  return (
    <main className="min-h-screen bg-black">
      <Header />                    {/* Navigation header */}
      
      {/* Page header section with title and description */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* Main page title with letter-by-letter animation */}
            <h1 
              ref={mainTitleRef}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 italic"
            >
              <span className="text-white">
                {createLetterSpans("Let's", "text-white")}
              </span>{' '}
              <span className="text-gold">
                {createLetterSpans("Connect", "text-gold")}
              </span>
            </h1>
            <p className="text-lg font-body text-gray-300 max-w-2xl mx-auto mb-4">
              Ready to find your perfect luxury property? Our team is here to help you every step of the way
            </p>
          </div>
        </div>
      </section>

      {/* Contact section with "Start Your Journey" - reduced gap from description */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            {/* This section now only contains the ContactSection component */}
          </div>
        </div>
      </section>

      <ContactSection />            {/* Full contact section with all contact methods */}

      <Footer />                    {/* Footer with links and information */}
    </main>
  )
}
