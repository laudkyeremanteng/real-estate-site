'use client'

import { useState } from 'react'

export default function PropertySearch() {
  const [searchData, setSearchData] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    propertyType: 'all'
  })

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Search data:', searchData)
    // Handle search logic here
  }

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gold/20">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="location" className="block text-sm font-body font-medium text-gray-300 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={searchData.location}
              onChange={handleInputChange}
              placeholder="e.g. Accra, Airport Hills"
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            />
          </div>

          <div>
            <label htmlFor="priceMin" className="block text-sm font-body font-medium text-gray-300 mb-2">
              Min Price (GHS)
            </label>
            <input
              type="number"
              id="priceMin"
              name="priceMin"
              value={searchData.priceMin}
              onChange={handleInputChange}
              placeholder="500,000"
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            />
          </div>

          <div>
            <label htmlFor="priceMax" className="block text-sm font-body font-medium text-gray-300 mb-2">
              Max Price (GHS)
            </label>
            <input
              type="number"
              id="priceMax"
              name="priceMax"
              value={searchData.priceMax}
              onChange={handleInputChange}
              placeholder="5,000,000"
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            />
          </div>

          <div>
            <label htmlFor="propertyType" className="block text-sm font-body font-medium text-gray-300 mb-2">
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchData.propertyType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            >
              <option value="all">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="penthouse">Penthouse</option>
              <option value="land">Land</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            className="bg-gold text-black px-8 py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg"
          >
            Search Properties
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 font-body text-sm">View:</span>
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                type="button"
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
                type="button"
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
        </div>
      </form>
    </div>
  )
}
