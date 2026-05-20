'use client'

import Link from 'next/link'

// TypeScript interfaces
interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
}

interface Category {
  name: string;
  count: number;
}

const recentPosts: BlogPost[] = [
  {
    id: 5,
    title: "Investment Opportunities in Ghana's Coastal Properties",
    date: "February 20, 2024",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=150&h=100&fit=crop"
  },
  {
    id: 3,
    title: "Complete Guide to Buying Property in Ghana",
    date: "March 5, 2024",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=150&h=100&fit=crop"
  },
  {
    id: 1,
    title: "Top 5 Luxury Neighborhoods in Accra for 2024",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=150&h=100&fit=crop"
  },
  {
    id: 4,
    title: "Luxury Amenities That Define Premium Properties",
    date: "February 28, 2024",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=150&h=100&fit=crop"
  }
]

const categories: Category[] = [
  { name: "Market Insights", count: 2 },
  { name: "Buying Guides", count: 1 },
  { name: "Investment", count: 1 },
  { name: "Property Features", count: 1 },
  { name: "Technology", count: 1 },
  { name: "Legal", count: 1 },
  { name: "Sustainability", count: 1 },
  { name: "Financing", count: 1 },
  { name: "Market Analysis", count: 1 }
]

const popularTags = [
  "Accra", "Luxury", "Investment", "Market Trends", "Buying Guide", 
  "Legal", "Technology", "Smart Home", "Sustainability", "Mortgage"
]

export default function BlogSidebar() {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-heading font-semibold text-white mb-4">Search Blog</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full px-4 py-3 bg-black border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body pr-12"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold hover:text-yellow-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-heading font-semibold text-white mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post: BlogPost) => (
            <Link 
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex space-x-3 group hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              <img 
                src={post.image} 
                alt={post.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-sm font-heading font-semibold text-white group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-400 font-body mt-1">{post.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-heading font-semibold text-white mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category: Category) => (
            <Link
              key={category.name}
              href={`/blog/category/${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex justify-between items-center py-2 text-gray-300 font-body hover:text-gold transition-colors"
            >
              <span>{category.name}</span>
              <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">{category.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-heading font-semibold text-white mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag: string) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-gray-400 font-body bg-gray-800 px-3 py-1 rounded-full hover:bg-gold hover:text-black transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
