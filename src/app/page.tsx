// =================================================================
// HOMEPAGE COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Main landing page showcasing luxury real estate offerings
// Contains: Hero section, featured properties, contact section
// Route: / (root URL)
// =================================================================

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedProperties from '@/components/FeaturedProperties'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

// Homepage component - main landing page
export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Header />                    {/* Navigation header with company logo and menu */}
      <Hero />                      {/* Hero section with main value proposition */}
      <FeaturedProperties />        {/* Showcase of premium property listings */}
      <ContactSection />            {/* Direct contact methods and information */}
      <Footer />                    {/* Footer with links and company information */}
    </main>
  )
}
