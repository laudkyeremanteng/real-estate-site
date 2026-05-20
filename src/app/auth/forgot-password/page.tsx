'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { resetPassword } from '@/lib/auth'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const result = await resetPassword(email)

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
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
                Reset Password
              </h1>
              <p className="text-gray-400 mb-6">
                Enter your email address and we'll send you a link to reset your password
              </p>

              {error && (
                <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {success ? (
                <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg mb-6">
                  Password reset email sent! Check your inbox for the reset link.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-body mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-black/50 border border-gold/30 text-white rounded-lg focus:outline-none focus:border-gold transition-colors font-body"
                      placeholder="Enter your email"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gold text-black py-3 font-body font-semibold hover:bg-yellow-500 transition-colors rounded-lg disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </button>
                </form>
              )}

              <p className="text-gray-400 text-center mt-6">
                Remember your password?{' '}
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
