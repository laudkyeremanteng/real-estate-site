'use client'

import { useState } from 'react'
import Link from 'next/link'

const properties = [
  {
    id: 1,
    title: "Modern Villa in Airport Hills",
    location: "Accra, Ghana",
    price: "₵1,250,000",
    bedrooms: 5,
    bathrooms: 4,
    landSize: "1,200 sq m",
    propertyType: "Villa",
    featured: true,
    status: "Available",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&h=300&fit=crop",
    description: "Luxurious modern villa with panoramic city views, infinity pool, and state-of-the-art amenities."
  },
  {
    id: 2,
    title: "Penthouse Suite in Cantonments",
    location: "Cantonments, Accra",
    price: "₵850,000",
    bedrooms: 3,
    bathrooms: 3,
    landSize: "350 sq m",
    propertyType: "Penthouse",
    featured: true,
    status: "Available",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop",
    description: "Exclusive penthouse with rooftop terrace, city views, and premium finishes throughout."
  },
  {
    id: 3,
    title: "Beachfront Property",
    location: "Labadi, Accra",
    price: "₵2,100,000",
    bedrooms: 6,
    bathrooms: 5,
    landSize: "2,500 sq m",
    propertyType: "House",
    featured: true,
    status: "Available",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    description: "Stunning beachfront property with private beach access, infinity pool, and tropical gardens."
  },
  {
    id: 4,
    title: "Executive Apartment",
    location: "Airport City, Accra",
    price: "₵450,000",
    bedrooms: 2,
    bathrooms: 2,
    landSize: "180 sq m",
    propertyType: "Apartment",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
    description: "Modern executive apartment in prime location with concierge services and gym access."
  },
  {
    id: 5,
    title: "Colonial Style House",
    location: "East Legon, Accra",
    price: "₵1,800,000",
    bedrooms: 4,
    bathrooms: 3,
    landSize: "800 sq m",
    propertyType: "House",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Elegant colonial-style house with modern amenities, swimming pool, and lush gardens."
  },
  {
    id: 6,
    title: "Luxury Townhouse",
    location: "Dawhenya, Accra",
    price: "₵680,000",
    bedrooms: 3,
    bathrooms: 2,
    landSize: "220 sq m",
    propertyType: "House",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Contemporary townhouse with modern design, private garden, and secure gated community."
  },
  {
    id: 7,
    title: "Garden Villa",
    location: "Tema, Ghana",
    price: "₵920,000",
    bedrooms: 4,
    bathrooms: 3,
    landSize: "600 sq m",
    propertyType: "Villa",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
    description: "Beautiful garden villa with outdoor entertainment area and mature tropical gardens."
  },
  {
    id: 8,
    title: "Prime Land Plot",
    location: "Airport Hills, Accra",
    price: "₵350,000",
    bedrooms: 0,
    bathrooms: 0,
    landSize: "700 sq m",
    propertyType: "Land",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&h=300&fit=crop",
    description: "Prime residential land plot in exclusive neighborhood, ready for development."
  },
  {
    id: 9,
    title: "Waterfront House",
    location: "Ada Foah, Ghana",
    price: "₵1,500,000",
    bedrooms: 5,
    bathrooms: 4,
    landSize: "1,800 sq m",
    propertyType: "House",
    featured: false,
    status: "Available",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
    description: "Exclusive waterfront property with private dock, beach access, and stunning views."
  }
]

export default function PropertyGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 9

  const totalPages = Math.ceil(properties.length / propertiesPerPage)
  const startIndex = (currentPage - 1) * propertiesPerPage
  const endIndex = startIndex + propertiesPerPage
  const currentProperties = properties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PropertyCard = ({ property }: { property: typeof properties[0] }) => (
    <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gold text-black px-3 py-1 text-sm font-body font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="bg-green-600 text-white px-3 py-1 text-sm font-body font-semibold rounded-full">
            {property.status}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
          {property.title}
        </h3>
        <p className="text-gray-400 font-body mb-4">{property.location}</p>
        
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-heading font-bold text-gold">{property.price}</span>
          <div className="flex space-x-4 text-sm text-gray-400 font-body">
            <span>{property.bedrooms > 0 ? `${property.bedrooms} beds` : 'Land'}</span>
            {property.bathrooms > 0 && <span>{property.bathrooms} baths</span>}
          </div>
        </div>

        <div className="flex space-x-3">
          <Link 
            href={`/properties/${property.id}`}
            className="flex-1 bg-gold text-black py-2 font-body font-semibold text-center hover:bg-yellow-500 transition-colors rounded-lg"
          >
            View Details
          </Link>
          <button className="flex-1 border border-gold text-gold py-2 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg">
            Schedule Tour
          </button>
        </div>
      </div>
    </div>
  )

  const PropertyListItem = ({ property }: { property: typeof properties[0] }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {property.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gold text-black px-3 py-1 text-sm font-body font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-heading font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                {property.title}
              </h3>
              <p className="text-gray-400 font-body mb-2">{property.location}</p>
              <p className="text-gray-300 font-body text-sm mb-4">{property.description}</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-heading font-bold text-gold block mb-2">{property.price}</span>
              <div className="text-sm text-gray-400 font-body">
                <span>{property.bedrooms > 0 ? `${property.bedrooms} beds` : 'Land'}</span>
                {property.bathrooms > 0 && <span> • {property.bathrooms} baths</span>}
                <span> • {property.landSize}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Link 
              href={`/properties/${property.id}`}
              className="flex-1 bg-gold text-black py-2 font-body font-semibold text-center hover:bg-yellow-500 transition-colors rounded-lg"
            >
              View Details
            </Link>
            <button className="flex-1 border border-gold text-gold py-2 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg">
              Schedule Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  )

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
          {currentProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {currentProperties.map((property) => (
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
