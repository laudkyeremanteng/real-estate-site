// =================================================================
// FEATURED PROPERTIES COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Showcase premium property listings on homepage
// Contains: Property cards with images, prices, and quick actions
// Used by: Homepage
// =================================================================

import Link from 'next/link'

// TypeScript interface for property
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
  featured: boolean;
}

// Sample featured properties data with real Delta Homes properties
export const featuredProperties: Property[] = [
  {
    id: 1,
    title: "2 Bedroom Apartment for Rent",
    location: "North Legon, Ghana",
    price: "GHS 5,000/month",
    bedrooms: 2,
    bathrooms: 1,
    image: "https://i.imgur.com/o4nvgjz.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Executive Four Bedroom House",
    location: "Taifa, Ghana",
    price: "GHS 8,000/month",
    bedrooms: 4,
    bathrooms: 1,
    image: "https://i.imgur.com/kh9afbz.jpeg",
    featured: true
  },
  {
    id: 3,
    title: "Three Bedroom House with Boys' Quarters",
    location: "East Legon Hills, Ghana",
    price: "GHs 6,500/month",
    bedrooms: 3,
    bathrooms: 1,
    image: "https://i.imgur.com/zqy14Z1.jpeg",
    featured: true
  }
]

// Featured properties showcase component
export default function FeaturedProperties() {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Featured <span className="text-gold">Properties</span>
          </h2>
          <p className="text-gray-300 font-body mb-8 max-w-2xl mx-auto text-base">
            Handpicked luxury properties from Ghana's most exclusive neighborhoods
          </p>
        </div>

        {/* Properties grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property: Property) => (
            
            <div key={property.id} className="group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2">
              {/* Property image container */}
              <div className="relative h-64 overflow-hidden">
                {/* Property image with zoom effect on hover */}
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Featured badge */}
                {property.featured && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-black px-3 py-1 text-sm font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>
              
              {/* Property details with background color change on hover */}
              <div className="bg-gray-900 p-6 group-hover:bg-gray-800 transition-colors duration-300">
                {/* Property title with gold color on hover */}
                <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                  {property.title}
                </h3>
                
                {/* Property location */}
                <p className="text-gray-400 font-body text-sm mb-4">{property.location}</p>
                
                {/* Price display */}
                <div className="mb-4">
                  <span className="text-xl font-heading font-bold text-gold">{property.price}</span>
                </div>

                {/* Action buttons */}
                <div className="flex space-x-3">
                  <Link 
                    href={`/properties/${property.id}`}
                    className="flex-1 bg-gold text-black py-2 text-sm font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg text-center"
                  >
                    View Details
                  </Link>
                  <button className="flex-1 border border-gold text-gold py-2 text-sm font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg">
                    Quick Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all properties link */}
        <div className="text-center mt-12">
          <Link 
            href="/properties" 
            className="inline-flex items-center text-gold hover:text-yellow-500 transition-colors font-body font-semibold"
          >
            View All Properties
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
