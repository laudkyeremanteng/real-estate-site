'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { getCurrentAgent, logoutAgent } from '@/lib/auth'

interface Property {
  id: string
  title: string
  location: string
  price: number
  currency?: string
  bedrooms: number
  bathrooms: number
  description: string
  image_url: string
  status: string
  created_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [agent, setAgent] = useState<any>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | null>(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if session is valid
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session) {
        // No valid session, redirect to homepage
        router.push('/')
        return
      }

      const currentAgent = await getCurrentAgent()
      if (!currentAgent) {
        // Session exists but agent not found, redirect to homepage
        router.push('/')
        return
      }
      
      setAgent(currentAgent)
      fetchProperties(currentAgent.id)
    } catch (error) {
      console.error('Auth check error:', error)
      router.push('/')
    }
  }

  const fetchProperties = async (agentId: string) => {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('agent_id', agentId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching properties:', error)
    } else {
      setProperties(data || [])
    }
    setLoading(false)
  }

  const handleLogout = async () => {
    await logoutAgent()
    router.push('/')
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Error deleting property')
    } else {
      fetchProperties(agent.id)
    }
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('properties')
      .update({ status: newStatus })
      .eq('id', id)

    if (error) {
      alert('Error updating property status')
    } else {
      fetchProperties(agent.id)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <Header />
        <div className="pt-24 pb-20 text-center text-white">Loading...</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="w-full md:w-auto">
              <h1 className="text-2xl md:text-4xl font-heading font-bold text-white mb-2">
                Agent Dashboard
              </h1>
              <p className="text-gray-400">Welcome, {agent?.name}</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full md:w-auto">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="w-full sm:w-auto bg-gold text-black px-6 py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg"
              >
                {showAddForm ? 'Cancel' : 'Add Property'}
              </button>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto border border-gold text-gold px-6 py-3 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Add Property Form */}
          {showAddForm && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gold/20 mb-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Add New Property</h2>
              <PropertyForm
                agentId={agent.id}
                onSuccess={() => {
                  setShowAddForm(false)
                  fetchProperties(agent.id)
                }}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Edit Property Form */}
          {editingProperty && (
            <div className="bg-gray-900 rounded-xl p-6 border border-gold/20 mb-8">
              <h2 className="text-2xl font-heading font-bold text-white mb-4">Edit Property</h2>
              <PropertyForm
                agentId={agent.id}
                property={editingProperty}
                onSuccess={() => {
                  setEditingProperty(null)
                  fetchProperties(agent.id)
                }}
                onCancel={() => setEditingProperty(null)}
              />
            </div>
          )}

          {/* Properties List */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gold/20">
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Your Properties</h2>
            {properties.length === 0 ? (
              <p className="text-gray-400">No properties yet. Add your first property!</p>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="bg-black/50 rounded-lg p-4 border border-gray-800">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-heading font-semibold text-white">{property.title}</h3>
                        <p className="text-gray-400 text-sm">{property.location}</p>
                        <p className="text-gold font-bold mt-2">{property.currency === 'USD' ? '$' : 'GHS '} {property.price.toLocaleString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingProperty(property)}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Posted: {new Date(property.created_at).toLocaleDateString()} at {new Date(property.created_at).toLocaleTimeString()}
                      </div>
                      <select
                        value={property.status}
                        onChange={(e) => handleStatusUpdate(property.id, e.target.value)}
                        className="bg-black/50 border border-gold/30 text-white rounded px-3 py-1 text-sm"
                      >
                        <option value="available">Available</option>
                        <option value="rented">Rented</option>
                        <option value="sold">Sold</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function PropertyForm({ agentId, property, onSuccess, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    location: property?.location || '',
    price: property?.price || '',
    currency: property?.currency || 'GHS',
    description: property?.description || '',
    whatsapp: property?.whatsapp || '',
    phone: property?.phone || '',
  })
  const [mediaFiles, setMediaFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 4) {
      alert('You can only upload up to 4 media items')
      return
    }
    setMediaFiles(files)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate WhatsApp number (10 digits)
    const whatsappDigits = formData.whatsapp.replace(/[^0-9]/g, '')
    if (whatsappDigits.length !== 10) {
      alert('WhatsApp number must be 10 digits')
      setLoading(false)
      return
    }

    // Validate phone number (10 digits)
    const phoneDigits = formData.phone.replace(/[^0-9]/g, '')
    if (phoneDigits.length !== 10) {
      alert('Phone number must be 10 digits')
      setLoading(false)
      return
    }

    // Validate that at least one media file is uploaded for new properties
    if (!property && mediaFiles.length === 0) {
      alert('Please upload at least one image or video for the property')
      setLoading(false)
      return
    }

    let mediaUrls: string[] = []

    // Upload files if provided
    if (mediaFiles.length > 0) {
      setUploading(true)
      try {
        const { uploadFiles } = await import('@/lib/storage')
        mediaUrls = await uploadFiles(mediaFiles, agentId, property?.id)
      } catch (error) {
        console.error('Error uploading files:', error)
        alert('Error uploading files. Please try again.')
        setLoading(false)
        setUploading(false)
        return
      }
      setUploading(false)
    }

    const propertyData = {
      title: formData.title,
      location: formData.location,
      price: parseFloat(formData.price),
      currency: formData.currency,
      description: formData.description,
      whatsapp: formData.whatsapp,
      phone: formData.phone,
      media_urls: mediaUrls.length > 0 ? mediaUrls : property?.media_urls || [],
      image_url: mediaUrls.length > 0 ? mediaUrls[0] : property?.image_url || '',
      agent_id: agentId,
      status: 'available',
    }

    let error
    if (property) {
      const result = await supabase
        .from('properties')
        .update(propertyData)
        .eq('id', property.id)
      error = result.error
    } else {
      const result = await supabase.from('properties').insert(propertyData)
      error = result.error
    }

    setLoading(false)

    if (error) {
      alert('Error saving property')
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white font-body mb-2">Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
        />
      </div>
      <div>
        <label className="block text-white font-body mb-2">Location</label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-body mb-2">Price</label>
          <input
            type="number"
            required
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
          />
        </div>
        <div>
          <label className="block text-white font-body mb-2">Currency</label>
          <select
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
          >
            <option value="GHS">GHS</option>
            <option value="USD">$</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-white font-body mb-2">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body h-32"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-body mb-2">WhatsApp Number *</label>
          <input
            type="tel"
            required
            value={formData.whatsapp}
            onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            placeholder="+233..."
          />
        </div>
        <div>
          <label className="block text-white font-body mb-2">Phone Number *</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
            placeholder="+233..."
          />
        </div>
      </div>
      <div>
        <label className="block text-white font-body mb-2">Property Media (Images & Videos) *</label>
        <p className="text-gray-400 text-sm mb-2">Upload at least 1 media item (up to 4 images or videos)</p>
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
        />
        {mediaFiles.length > 0 && (
          <div className="mt-2 text-sm text-gray-400">
            {mediaFiles.length} file(s) selected: {mediaFiles.map(f => f.name).join(', ')}
          </div>
        )}
        {property?.media_urls && property.media_urls.length > 0 && (
          <div className="mt-2 text-sm text-gray-400">
            Current media: {property.media_urls.length} file(s)
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex-1 bg-gold text-black py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : loading ? 'Saving...' : property ? 'Update Property' : 'Add Property'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 border border-gold text-gold py-3 font-body font-semibold hover:bg-gold hover:text-black transition-colors rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
