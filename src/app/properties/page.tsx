// =================================================================
// PROPERTIES PAGE - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Complete property listings with search and filtering
// Contains: Property search form, property grid, pagination
// Route: /properties
// =================================================================

import Header from '@/components/Header'
import PropertySearch from '@/components/PropertySearch'
import PropertyGrid from '@/components/PropertyGrid'
import Footer from '@/components/Footer'

// Properties listing page component
export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-black">
      <Header />                    {/* Navigation header */}
      
      {/* Page header section with title and description */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Luxury <span className="text-gold">Properties</span>
            </h1>
            <p className="text-xl font-body text-gray-300 max-w-2xl mx-auto">
              Browse our exclusive collection of premium properties in Ghana's most prestigious locations
            </p>
          </div>
        </div>
      </section>

      {/* Main content area with search and property listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <PropertySearch />            {/* Search and filter form */}
          <PropertyGrid />              {/* Property listings grid */}
        </div>
      </section>

      <Footer />                    {/* Footer with links and information */}
    </main>
  )
}
