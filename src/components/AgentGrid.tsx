'use client'

import { useState } from 'react'
import Link from 'next/link'

const agents = [
  {
    id: 1,
    name: "Kwame Mensah",
    title: "Senior Real Estate Consultant",
    bio: "With over 15 years of experience in Ghana's luxury real estate market, Kwame specializes in high-end residential properties and investment opportunities. He has successfully closed over ₵200 million in property transactions.",
    experience: "15+ Years",
    specializations: ["Luxury Homes", "Investment Properties", "Airport Hills", "Cantonments"],
    languages: ["English", "Twi", "Ga"],
    phone: "+233 30 123 4567",
    whatsapp: "+233 30 123 4567",
    propertiesSold: 127,
    averageRating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    featured: true,
    achievements: ["Top Agent 2023", "Million Dollar Club", "Expert Negotiator"]
  },
  {
    id: 2,
    name: "Ama Osei",
    title: "Property Investment Specialist",
    bio: "Ama is an expert in real estate investment analysis and portfolio management. She helps both local and international investors identify profitable opportunities in Ghana's growing property market.",
    experience: "12+ Years",
    specializations: ["Investment Analysis", "Commercial Properties", "Market Research", "ROI Optimization"],
    languages: ["English", "Twi", "French"],
    phone: "+233 30 123 4568",
    whatsapp: "+233 30 123 4568",
    propertiesSold: 98,
    averageRating: 4.8,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1494790108755-2616b332c3ca?w=400&h=400&fit=crop&crop=face",
    featured: true,
    achievements: ["Investment Expert", "Market Analyst", "Multi-lingual"]
  },
  {
    id: 3,
    name: "Kojo Annan",
    title: "Luxury Property Specialist",
    bio: "Kojo focuses exclusively on premium and luxury properties in Accra's most prestigious neighborhoods. His deep understanding of the high-end market makes him invaluable to discerning clients.",
    experience: "10+ Years",
    specializations: ["Luxury Villas", "Penthouses", "Beachfront Properties", "High-End Clientele"],
    languages: ["English", "Ga", "Spanish"],
    phone: "+233 30 123 4569",
    whatsapp: "+233 30 123 4569",
    propertiesSold: 84,
    averageRating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4354c?w=400&h=400&fit=crop&crop=face",
    featured: false,
    achievements: ["Luxury Specialist", "Client Relations", "Premium Service"]
  },
  {
    id: 4,
    name: "Naomi Adams",
    title: "Residential Property Consultant",
    bio: "Naomi specializes in residential properties and has a keen eye for identifying homes that perfectly match her clients' lifestyles. She's known for her patience and attention to detail.",
    experience: "8+ Years",
    specializations: ["Family Homes", "First-Time Buyers", "Suburban Properties", "Property Valuation"],
    languages: ["English", "Twi", "Ewe"],
    phone: "+233 30 123 4570",
    whatsapp: "+233 30 123 4570",
    propertiesSold: 156,
    averageRating: 4.7,
    reviews: 102,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    featured: false,
    achievements: ["Family Specialist", "First-Time Expert", "Top Seller 2023"]
  },
  {
    id: 5,
    name: "David Ofori",
    title: "Commercial Real Estate Advisor",
    bio: "David brings extensive experience in commercial real estate, helping businesses find the perfect office spaces, retail locations, and investment properties across Ghana.",
    experience: "18+ Years",
    specializations: ["Office Spaces", "Retail Properties", "Commercial Leasing", "Business Relocation"],
    languages: ["English", "Twi", "Mandarin"],
    phone: "+233 30 123 4571",
    whatsapp: "+233 30 123 4571",
    propertiesSold: 76,
    averageRating: 4.8,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f3d?w=400&h=400&fit=crop&crop=face",
    featured: false,
    achievements: ["Commercial Expert", "Business Advisor", "18 Years Experience"]
  }
]

const specializations = [
  "All Specializations",
  "Luxury Homes",
  "Investment Properties",
  "Commercial Properties",
  "Residential Properties",
  "Beachfront Properties",
  "Market Analysis"
]

export default function AgentGrid() {
  const [selectedSpecialization, setSelectedSpecialization] = useState("All Specializations")

  const filteredAgents = selectedSpecialization === "All Specializations"
    ? agents
    : agents.filter(agent => agent.specializations.includes(selectedSpecialization))

  const handleContact = (type: 'phone' | 'whatsapp', contact: string) => {
    if (type === 'phone') {
      window.open(`tel:${contact}`)
    } else if (type === 'whatsapp') {
      const message = encodeURIComponent("Hi! I'm interested in learning more about your real estate services.")
      window.open(`https://wa.me/${contact.replace(/\D/g, '')}?text=${message}`, '_blank')
    }
  }

  const AgentCard = ({ agent }: { agent: typeof agents[0] }) => (
    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 group">
      <div className="relative">
        <div className="h-64 overflow-hidden">
          <img 
            src={agent.image} 
            alt={agent.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {agent.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-gold text-black px-3 py-1 text-sm font-body font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
          <h3 className="text-xl font-heading font-semibold text-white mb-1">{agent.name}</h3>
          <p className="text-gold font-body text-sm">{agent.title}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-gold font-heading font-bold">{agent.averageRating}</span>
            <span className="text-gray-400 font-body text-sm">({agent.reviews} reviews)</span>
          </div>
          <span className="text-gray-400 font-body text-sm">{agent.experience}</span>
        </div>

        <p className="text-gray-300 font-body text-sm mb-4 leading-relaxed line-clamp-3">
          {agent.bio}
        </p>

        <div className="mb-4">
          <p className="text-gray-400 font-body text-sm mb-2">Specializations:</p>
          <div className="flex flex-wrap gap-2">
            {agent.specializations.slice(0, 3).map((spec, index) => (
              <span 
                key={index}
                className="text-xs text-gold bg-gold/20 px-2 py-1 rounded-full font-body"
              >
                {spec}
              </span>
            ))}
            {agent.specializations.length > 3 && (
              <span className="text-xs text-gray-500 font-body">
                +{agent.specializations.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-400 font-body text-sm mb-2">Languages:</p>
          <div className="flex flex-wrap gap-2">
            {agent.languages.map((lang, index) => (
              <span 
                key={index}
                className="text-xs text-gray-300 bg-gray-800 px-2 py-1 rounded font-body"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-gold">{agent.propertiesSold}</p>
            <p className="text-xs text-gray-400 font-body">Properties Sold</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-heading font-bold text-gold">{agent.achievements.length}</p>
            <p className="text-xs text-gray-400 font-body">Achievements</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex space-x-2">
            <button
              onClick={() => handleContact('phone', agent.phone)}
              className="flex-1 bg-gold text-black py-2 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg text-sm"
            >
              Call
            </button>
            <button
              onClick={() => handleContact('whatsapp', agent.whatsapp)}
              className="flex-1 bg-green-600 text-white py-2 font-body font-semibold hover:bg-green-700 transition-colors rounded-lg text-sm"
            >
              WhatsApp
            </button>
          </div>
          
          <Link 
            href={`/agents/${agent.id}`}
            className="block w-full border border-gray-700 text-gray-300 py-2 font-body font-semibold hover:border-gold hover:text-gold transition-colors rounded-lg text-center"
          >
            View Full Profile
          </Link>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      {/* Specialization Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {specializations.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialization(spec)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
                selectedSpecialization === spec
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Count */}
      <div className="mb-6 text-center">
        <p className="text-gray-300 font-body">
          Showing {filteredAgents.length} expert agents
          {selectedSpecialization !== "All Specializations" && ` specializing in ${selectedSpecialization}`}
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}
