// =================================================================
// HERO COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Main hero section with value proposition and CTAs
// Contains: Background image, headline, description, action buttons
// Used by: Homepage
// =================================================================

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&h=1080&fit=crop')"
        }}
      ></div>

      {/* Main hero content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Main headline with gold accent */}
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 text-shadow-xl tracking-tight">
          Discover <span className="text-gold text-shadow-xl">Luxury Living</span>
        </h1>
        
        {/* Supporting description with glassmorphism effect */}
        <p className="text-lg md:text-xl font-body text-gray-100 mb-8 max-w-2xl mx-auto text-shadow-lg bg-black/30 py-4 px-6 rounded-lg backdrop-blur-sm leading-relaxed">
          Exclusive properties in Ghana's most prestigious neighborhoods. 
          Where elegance meets sophistication.
        </p>
        
        {/* Call-to-action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA - View Properties */}
          <button className="bg-gold text-black px-6 py-3 text-base font-body font-semibold hover:bg-yellow-500 transition-colors rounded-xl">
            View Properties
          </button>
          
          {/* Secondary CTA - Schedule Consultation with link to contact page */}
          <Link href="/contact" className="border-2 border-gold text-gold px-6 py-3 text-base font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-xl text-center">
            Schedule Consultation
          </Link>
        </div>
      </div>

      {/* Scroll indicator animation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
