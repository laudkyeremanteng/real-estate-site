'use client'

import { useState } from 'react'
import { loginAdminWithPasscode } from '@/lib/auth'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminLogin() {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await loginAdminWithPasscode(passcode)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      // Redirect to admin dashboard with authentication parameter
      window.location.href = '/admin?authenticated=true'
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-gray-900 rounded-xl p-8 border border-gray-800">
        <h1 className="text-3xl font-heading font-bold text-gold mb-2 text-center">Admin Login</h1>
        <p className="text-gray-400 text-center mb-8">Enter admin passcode to access dashboard</p>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="passcode" className="block text-gray-300 mb-2 font-body">
              Passcode
            </label>
            <input
              type="password"
              id="passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gold transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gold text-black py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-400 hover:text-gold transition-colors text-sm">
            Back to Home
          </Link>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}
