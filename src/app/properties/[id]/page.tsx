// =================================================================

// PROPERTY DETAILS PAGE - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Display comprehensive property information
// Contains: Property details, images, features, contact options
// Route: /properties/[id] (dynamic route)
// =================================================================

'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

// TypeScript interface for property
interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  currency?: string;
  description: string;
  image_url: string;
  media_urls?: string[];
  status: string;
  whatsapp?: string;
  phone?: string;
}

// Property details page component
export default function PropertyDetailsPage() {
  const params = useParams()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    fetchProperty()
  }, [params.id])

  const fetchProperty = async () => {
    const id = params.id as string
    
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching property:', error)
      setLoading(false)
    } else {
      setProperty(data)
      setLoading(false)
    }
  }
  
  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Loading...</h1>
        </div>
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-300 mb-8">The property you're looking for doesn't exist.</p>
          <Link href="/properties" className="bg-gold text-black px-6 py-3 rounded-lg font-body font-semibold hover:bg-yellow-500 transition-colors">
            View All Properties
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Property hero section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Property media gallery */}
            <div>
              <div className="relative">
                {property.media_urls && property.media_urls.length > 0 ? (
                  <div className="space-y-4">
                    {property.media_urls.map((url, index) => {
                      const isVideo = url.match(/\.(mp4|webm|ogg|mov)$/i)
                      return isVideo ? (
                        <video
                          key={index}
                          src={url}
                          controls
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ) : (
                        <img
                          key={index}
                          src={url}
                          alt={`${property.title} - Media ${index + 1}`}
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      )
                    })}
                  </div>
                ) : (
                  <img 
                    src={property.image_url || 'https://via.placeholder.com/400x300?text=Property'}
                    alt={property.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
            
            {/* Property information */}
            <div>
              {/* Property title and price */}
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-white mb-4">
                  {property.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-heading font-bold text-gold">
                    {property.currency === 'USD' ? '$' : 'GHS '} {property.price.toLocaleString()}
                  </span>
                  <span className="text-gray-400 font-body">
                    {property.location}
                  </span>
                </div>
                <div className="mb-4">
                  <span className={`px-3 py-1 text-sm font-semibold rounded ${
                    property.status === 'available' ? 'bg-green-500 text-black' :
                    property.status === 'rented' ? 'bg-blue-500 text-black' :
                    'bg-red-500 text-black'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Property description */}
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gold mb-4">Description</h2>
                <p className="text-gray-300 font-body leading-relaxed">
                  {property.description}
                </p>
              </div>
              
              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => {
                    const message = `I am interested in the property: ${property.title}\n\nLocation: ${property.location}\nPrice: ${property.currency === 'USD' ? '$' : 'GHS '}${property.price.toLocaleString()}\n\nPlease provide more information.`
                    const cleanNumber = property.whatsapp?.replace(/[^0-9]/g, '') || ''
                    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="flex-1 border-2 border-gold text-gold px-6 py-3 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg"
                >
                  Contact Agent via WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}
