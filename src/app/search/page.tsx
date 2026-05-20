'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

interface Property {
  id: string
  title: string
  location: string
  price: number
  bedrooms: number
  bathrooms: number
  description: string
  image_url: string
  media_urls?: string[]
  status: string
  agent_id: string
}

export default function SearchPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    status: 'available',
  })

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters.minPrice) {
      query = query.gte('price', parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      query = query.lte('price', parseFloat(filters.maxPrice))
    }
    if (filters.bedrooms) {
      query = query.eq('bedrooms', parseInt(filters.bedrooms))
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProperties()
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold text-white mb-8">
            Search Properties
          </h1>

          {/* Search Filters */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gold/20 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-white font-body mb-2">Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-white font-body mb-2">Min Price (GHS)</label>
                <input
                  type="number"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                  placeholder="Min price"
                />
              </div>

              <div>
                <label className="block text-white font-body mb-2">Max Price (GHS)</label>
                <input
                  type="number"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                  placeholder="Max price"
                />
              </div>

              <div>
                <label className="block text-white font-body mb-2">Bedrooms</label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-gold text-black py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Results */}
          {loading ? (
            <div className="text-center text-gray-400">Loading properties...</div>
          ) : properties.length === 0 ? (
            <div className="text-center text-gray-400">No properties found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={property.media_urls?.[0] || property.image_url || 'https://via.placeholder.com/400x300?text=Property'}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-gold text-black px-3 py-1 text-sm font-semibold rounded">
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                      {property.title}
                    </h3>
                    <p className="text-gray-400 font-body text-sm mb-4">{property.location}</p>
                    <div className="mb-4">
                      <span className="text-xl font-heading font-bold text-gold">
                        GHS {property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex space-x-4 text-sm text-gray-400 mb-4">
                      <span>{property.bedrooms} Bed</span>
                      <span>{property.bathrooms} Bath</span>
                    </div>
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
        </div>
      </div>
      <Footer />
    </div>
  )
}
