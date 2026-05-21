'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { registerAgent } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    whatsapp: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await registerAgent(
      formData.email,
      formData.password,
      formData.name,
      formData.phone,
      formData.whatsapp
    )

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      router.push('/auth/login?registered=true')
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-gray-900 rounded-xl p-8 border border-gold/20">
              <h1 className="text-3xl font-heading font-bold text-white mb-2">
                Agent Registration
              </h1>
              <p className="text-gray-400 mb-6">
                Create your agent account to manage properties
              </p>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-white font-body mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white font-body mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-white font-body mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label className="block text-white font-body mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                    placeholder="Enter your WhatsApp number"
                  />
                </div>

                <div>
                  <label className="block text-white font-body mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body pr-12"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold hover:text-yellow-500 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold text-black py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Register'}
                </button>
              </form>

              <p className="text-gray-400 text-center mt-6">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-gold hover:text-yellow-500 transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
