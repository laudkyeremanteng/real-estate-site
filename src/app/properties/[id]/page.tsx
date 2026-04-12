// =================================================================

// PROPERTY DETAILS PAGE - Delta Homes Gh Real Estate Website
// =================================================================
// Purpose: Display comprehensive property information
// Contains: Property details, images, features, contact options
// Route: /properties/[id] (dynamic route)
// =================================================================

'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Import featured properties data to sync with homepage
import { featuredProperties } from '@/components/FeaturedProperties'

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

// Property details page component
export default function PropertyDetailsPage() {
  const params = useParams()
  
  // Add null check for params.id
  const id = params.id ? parseInt(params.id as string) : null
  
  // Find property by ID from featured properties
  const property = id ? featuredProperties.find((p: Property) => p.id === id) : null
  
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

  // Get property details based on ID
  const details = property.id === 1 ? {
    title: "2 Bedroom Apartment for Rent",
    location: "North Legon, Ghana",
    price: "GHS 5,000/month",
    bedrooms: 2,
    description: "Modern 2-bedroom apartment located in the prestigious North Legon area. This unfurnished apartment features spacious living areas, modern finishes, and excellent amenities. Perfect for professionals and small families seeking quality living in one of Accra's most desirable neighborhoods.",
    features: [
      "2 Spacious Bedrooms",
      "Bathroom", 
      "Open Plan Living Area",
      "Modern Kitchen",
      "24/7 Security"
    ],
    video: "https://i.imgur.com/o4nvgjz.mp4",
    hasVideo: true
  } : property.id === 2 ? {
    title: "Executive Four Bedroom House",
    location: "Taifa, Ghana",
    price: "GHS 8,000/month",
    bedrooms: 4,
    description: "Newly built executive four-bedroom house located in Taifa, Mr. Agyei area. This premium property features modern construction, spacious living areas, and excellent amenities. Perfect for families seeking quality living with direct agency deal - no middleman fees.",
    features: [
      "4 Spacious Bedrooms",
      "Bathroom", 
      "Open Plan Living Area",
      "Modern Kitchen",
      "Parking Space",
      "24/7 Security",
      "New Construction",
      "Direct Agency Deal"
    ],
    video: null,
    hasVideo: false
  } : {
    title: "Three Bedroom House with Boys' Quarters",
    location: "East Legon Hills, Ghana",
    price: "GHs 6,500/month",
    bedrooms: 3,
    description: "Beautiful three-bedroom house with boys' quarters located in the prestigious East Legon Hills Santoe area. This property features en-suite bedrooms, guest washroom, fitted kitchen, air conditioning, water reservoir, self-compound with security fence, and automated gate. Perfect for families seeking luxury living in one of Accra's most desirable neighborhoods.",
    features: [
      "3 En-suite Bedrooms",
      "Boys' Quarters",
      "Guest Washroom",
      "Fitted Kitchen",
      "Air Conditioning",
      "Water Reservoir",
      "Security Fence",
      "Automated Gate"
    ],
    video: null,
    hasVideo: false
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Property hero section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Property media - Video or Image */}
            <div>
              <div className="relative">
                {details.hasVideo && details.video ? (
                  /* Video player for properties with video */
                  <>
                    <video 
                      src={details.video}
                      controls
                      autoPlay
                      muted
                      loop
                      className="w-full h-96 object-cover rounded-lg"
                      poster={property.image}
                    >
                      Your browser does not support the video tag.
                    </video>
                    
                    {/* Video controls info */}
                    <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                      <h3 className="text-gold font-heading font-semibold mb-2">Property Video Tour</h3>
                      <p className="text-gray-300 font-body text-sm">
                        Watch the complete video tour of this {details.bedrooms}-bedroom property in {details.location}.
                      </p>
                    </div>
                  </>
                ) : (
                  /* Image display for properties without video */
                  <>
                    <img 
                      src={property.image}
                      alt={details.title}
                      className="w-full h-96 object-cover rounded-lg"
                    />
                    
                    {/* Image info */}
                    <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                      <h3 className="text-gold font-heading font-semibold mb-2">Property Photos</h3>
                      <p className="text-gray-300 font-body text-sm">
                        View this beautiful {details.bedrooms}-bedroom property located in {details.location}.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Property information */}
            <div>
              {/* Property title and price */}
              <div className="mb-6">
                <h1 className="text-4xl font-heading font-bold text-white mb-4">
                  {details.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-heading font-bold text-gold">
                    {details.price}
                  </span>
                  <span className="text-gray-400 font-body">
                    {details.location}
                  </span>
                </div>
              </div>
              
              {/* Property specifications */}
              <div className="mb-6">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <h3 className="text-gold font-heading font-semibold mb-2">Bedrooms</h3>
                  <p className="text-2xl font-heading font-bold">{details.bedrooms}</p>
                </div>
              </div>
              
              {/* Property description */}
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gold mb-4">Description</h2>
                <p className="text-gray-300 font-body leading-relaxed">
                  {details.description}
                </p>
              </div>
              
              {/* Property features */}
              <div className="mb-6">
                <h2 className="text-2xl font-heading font-bold text-gold mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300 font-body">
                      <svg className="w-5 h-5 text-gold mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 border-2 border-gold text-gold px-6 py-3 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg">
                  Contact Agent
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
