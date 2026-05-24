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
  description: string;
  image_url: string;
  media_urls?: string[];
  status: string;
  created_at: string;
}

export default function PropertyGrid() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 9

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  const totalPages = Math.ceil(properties.length / propertiesPerPage)
  const startIndex = (currentPage - 1) * propertiesPerPage
  const endIndex = startIndex + propertiesPerPage
  const currentProperties = properties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PropertyCard = ({ key, property }: { key: string; property: Property }) => (
    <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 hover:scale-102 hover:-translate-y-1">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.media_urls?.[0] || property.image_url || 'https://via.placeholder.com/400x300?text=Property'}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 text-sm font-body font-semibold rounded-full ${
            property.status === 'available' ? 'bg-green-600 text-white' :
            property.status === 'rented' ? 'bg-blue-600 text-white' :
            'bg-red-600 text-white'
          }`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-400 font-body mb-4">{property.location}</p>

        <div className="mb-4">
          <span className="text-2xl font-heading font-bold text-gold">
            {property.currency === 'USD' ? '$' : 'GHS '} {property.price.toLocaleString()}
          </span>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Posted: {new Date(property.created_at).toLocaleDateString()} at {new Date(property.created_at).toLocaleTimeString()}
        </p>

        <Link
          href={`/properties/${property.id}`}
          className="block w-full bg-gold text-black py-2 font-body font-semibold text-center hover:bg-yellow-500 hover:scale-105 transition-all duration-300 rounded-lg"
        >
          View Details
        </Link>
      </div>
    </div>
  )

  const PropertyListItem = ({ key, property }: { key: string; property: Property }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 hover:scale-101 hover:-translate-y-0.5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
          <img
            src={property.media_urls?.[0] || property.image_url || 'https://via.placeholder.com/400x300?text=Property'}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-400 font-body mb-2">{property.location}</p>
              <p className="text-gray-300 font-body text-sm mb-4">{property.description}</p>
              <p className="text-gray-500 text-sm">
                Posted: {new Date(property.created_at).toLocaleDateString()} at {new Date(property.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-heading font-bold text-gold block mb-2">
                {property.currency === 'USD' ? '$' : 'GHS '} {property.price.toLocaleString()}
              </span>
            </div>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="block w-full bg-gold text-black py-2 font-body font-semibold text-center hover:bg-yellow-500 hover:scale-105 transition-all duration-300 rounded-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return <div className="text-center text-gray-400">Loading properties...</div>
  }

  if (properties.length === 0) {
    return <div className="text-center text-gray-400">No properties available yet.</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-300 font-body">
          Showing {startIndex + 1}-{Math.min(endIndex, properties.length)} of {properties.length} properties
        </p>
        <div className="flex bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2 rounded-md transition-colors ${
              viewMode === 'grid' 
                ? 'bg-gold text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2 rounded-md transition-colors ${
              viewMode === 'list' 
                ? 'bg-gold text-black' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProperties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentProperties.map((property: Property) => (
            <PropertyListItem key={property.id} property={property} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-body transition-colors ${
              currentPage === 1
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-lg font-body transition-colors ${
                currentPage === page
                  ? 'bg-gold text-black'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-body transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
