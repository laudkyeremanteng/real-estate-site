// =================================================================
// FEATURED PROPERTIES COMPONENT - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Showcase premium property listings on homepage
// Contains: Property cards with images, prices, and quick actions
// Used by: Homepage
// =================================================================

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

// TypeScript interface for property
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  image_url: string;
  media_urls?: string[];
  status: string;
  created_at: string;
}

// Featured properties showcase component
export default function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProperties()
  }, [])

  const fetchFeaturedProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(3)

    if (error) {
      console.error('Error fetching properties:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

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
        {loading ? (
          <div className="text-center text-gray-400">Loading properties...</div>
        ) : properties.length === 0 ? (
          <div className="text-center text-gray-400">No properties available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property: Property) => (
              
              <div key={property.id} className="group relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-gold/20 hover:-translate-y-2">
                {/* Property image container */}
                <div className="relative h-64 overflow-hidden">
                  {/* Property image with zoom effect on hover */}
                  <img 
                    src={property.media_urls?.[0] || property.image_url || 'https://via.placeholder.com/400x300?text=Property'} 
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Featured badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold text-black px-3 py-1 text-sm font-semibold">
                      Available
                    </span>
                  </div>
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
                    <span className="text-xl font-heading font-bold text-gold">
                      {property.currency === 'USD' ? '$' : 'GHS '} {property.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Posted date/time */}
                  <p className="text-gray-500 text-sm mb-4">
                    Posted: {new Date(property.created_at).toLocaleDateString()} at {new Date(property.created_at).toLocaleTimeString()}
                  </p>

                  {/* Action button */}
                  <Link 
                    href={`/properties/${property.id}`}
                    className="block w-full bg-gold text-black py-2 text-sm font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

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
