'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const blogPosts = [
  {
    id: 1,
    title: "Top 5 Luxury Neighborhoods in Accra for 2024",
    excerpt: "Discover the most prestigious areas in Accra where luxury real estate is booming. From Airport Hills to Cantonments, we explore the prime locations for high-end properties.",
    author: "Kwame Mensah",
    date: "March 15, 2024",
    category: "Market Insights",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop",
    featured: true,
    tags: ["Accra", "Luxury", "Investment"]
  },
  {
    id: 2,
    title: "Understanding Ghana's Real Estate Market Trends",
    excerpt: "A comprehensive analysis of the current real estate market trends in Ghana, including price fluctuations, demand patterns, and investment opportunities for both local and international buyers.",
    author: "Ama Osei",
    date: "March 10, 2024",
    category: "Market Analysis",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Market Trends", "Investment", "Analysis"]
  },
  {
    id: 3,
    title: "Complete Guide to Buying Property in Ghana",
    excerpt: "Step-by-step process for purchasing property in Ghana as a local or foreign investor. Learn about legal requirements, documentation, and best practices for a smooth transaction.",
    author: "Kwame Mensah",
    date: "March 5, 2024",
    category: "Buying Guides",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Buying Guide", "Legal", "Process"]
  },
  {
    id: 4,
    title: "Luxury Amenities That Define Premium Properties",
    excerpt: "Explore the essential amenities that set luxury properties apart in Ghana's competitive real estate market. From infinity pools to smart home technology, discover what buyers expect.",
    author: "Naomi Adams",
    date: "February 28, 2024",
    category: "Property Features",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Amenities", "Luxury", "Features"]
  },
  {
    id: 5,
    title: "Investment Opportunities in Ghana's Coastal Properties",
    excerpt: "Coastal properties in Ghana are emerging as hot investment opportunities. We analyze the potential returns, risks, and best locations for beachfront real estate investments.",
    author: "Kojo Annan",
    date: "February 20, 2024",
    category: "Investment",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    featured: true,
    tags: ["Investment", "Coastal", "Beachfront"]
  },
  {
    id: 6,
    title: "Smart Home Technology in Ghanaian Luxury Properties",
    excerpt: "How smart home technology is transforming luxury properties in Ghana. From automated lighting to advanced security systems, discover the latest innovations in high-end real estate.",
    author: "Ama Osei",
    date: "February 15, 2024",
    category: "Technology",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Technology", "Smart Home", "Innovation"]
  },
  {
    id: 7,
    title: "Legal Framework for Foreign Property Buyers in Ghana",
    excerpt: "Essential legal information for foreigners looking to purchase property in Ghana. Understand the regulations, restrictions, and processes for international investors.",
    author: "Kwame Mensah",
    date: "February 10, 2024",
    category: "Legal",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Legal", "Foreign Investment", "Regulations"]
  },
  {
    id: 8,
    title: "Sustainable Luxury: Eco-Friendly Properties in Ghana",
    excerpt: "The growing trend of sustainable luxury properties in Ghana. Discover eco-friendly features, green building practices, and their impact on property values.",
    author: "Naomi Adams",
    date: "February 5, 2024",
    category: "Sustainability",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Sustainability", "Eco-Friendly", "Green Building"]
  },
  {
    id: 9,
    title: "Mortgage Options for Ghanaian Property Buyers",
    excerpt: "Comprehensive guide to mortgage options available in Ghana for property buyers. Compare rates, terms, and requirements from major banks and financial institutions.",
    author: "Kojo Annan",
    date: "January 30, 2024",
    category: "Financing",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Mortgage", "Financing", "Banking"]
  }
]

const categories = [
  "All Categories",
  "Market Insights",
  "Buying Guides",
  "Investment",
  "Property Features",
  "Technology",
  "Legal",
  "Sustainability",
  "Financing",
  "Market Analysis"
]

export default function BlogGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const filteredPosts = selectedCategory === "All Categories" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const BlogPostCard = ({ post }: { post: typeof blogPosts[0] }) => (
    <article className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gold/50 transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gold text-black px-3 py-1 text-sm font-body font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-gold px-3 py-1 text-sm font-body font-semibold rounded-full backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-400 font-body mb-3">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span>{post.readTime}</span>
        </div>
        
        <h3 className="text-xl font-heading font-semibold text-white mb-3 group-hover:text-gold transition-colors">
          <Link href={`/blog/${post.id}`}>
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-300 font-body mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="text-gold text-sm font-body font-semibold">
                {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
            <span className="text-gray-400 font-body text-sm">{post.author}</span>
          </div>
          
          <Link 
            href={`/blog/${post.id}`}
            className="text-gold hover:text-yellow-500 font-body font-semibold text-sm transition-colors flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="text-xs text-gray-500 font-body bg-gray-800 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )

  return (
    <div>
      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full font-body text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Count */}
      <div className="mb-6">
        <p className="text-gray-300 font-body">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredPosts.length)} of {filteredPosts.length} articles
          {selectedCategory !== "All Categories" && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

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
