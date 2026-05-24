'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { isAdminAuthenticated, logoutAdmin } from '@/lib/auth'

interface Agent {
  id: string
  email: string
  name: string
  phone: string
  whatsapp: string
  company_name: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  approved_at?: string
}

export default function AdminDashboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [currentAgents, setCurrentAgents] = useState<Agent[]>([])
  const hasCheckedAuth = useRef(false)

  useEffect(() => {
    if (!hasCheckedAuth.current) {
      checkAdminAccess()
      hasCheckedAuth.current = true
    }
  }, [])

  useEffect(() => {
    if (hasCheckedAuth.current) {
      fetchPendingAgents()
      fetchCurrentAgents()
    }
  }, [hasCheckedAuth.current])

  const checkAdminAccess = () => {
    // Check if admin just authenticated via URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const justAuthenticated = urlParams.get('authenticated') === 'true'

    if (!justAuthenticated) {
      window.location.href = '/auth/admin/login'
      return
    }

    // Remove the authenticated parameter from URL to prevent reuse
    window.history.replaceState({}, '', '/admin')
  }

  const fetchPendingAgents = async () => {
    console.log('Fetching pending agents...')
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false })

    console.log('Pending agents fetch result:', { data, error, count: data?.length })

    if (error) {
      console.error('Error fetching agents:', error)
    } else {
      setAgents(data || [])
    }
    setLoading(false)
  }

  const fetchCurrentAgents = async () => {
    const { data, error } = await supabase
      .from('agents')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching current agents:', error)
    } else {
      setCurrentAgents(data || [])
    }
  }

  const approveAgent = async (agentId: string) => {
    const { error } = await supabase
      .from('agents')
      .update({
        status: 'approved',
        approved_at: new Date().toISOString(),
      })
      .eq('id', agentId)

    if (error) {
      console.error('Error approving agent:', error)
      alert('Failed to approve agent')
    } else {
      alert('Agent approved successfully')
      fetchPendingAgents()
      fetchCurrentAgents()
    }
  }

  const rejectAgent = async (agentId: string) => {
    console.log('Rejecting agent:', agentId)

    // Delete agent from agents table
    const { error: deleteError } = await supabase
      .from('agents')
      .delete()
      .eq('id', agentId)

    console.log('Delete result:', { deleteError })

    if (deleteError) {
      console.error('Error deleting agent:', deleteError)
      alert('Failed to reject agent')
      return
    }

    console.log('Agent deleted successfully, now deleting auth user')

    // Delete auth user via API route
    try {
      const response = await fetch('/api/delete-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: agentId }),
      })
      console.log('Auth user deletion response:', response.status)
    } catch (error) {
      console.error('Error deleting auth user:', error)
      // Continue even if auth user deletion fails
    }

    console.log('Refreshing pending agents list')
    alert('Agent rejected and account deleted successfully')
    fetchPendingAgents()
  }

  if (loading) {
    return <div className="text-center text-gray-400">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <div className="flex-1 p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-heading font-bold text-gold mb-8">
            Admin Dashboard
          </h1>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-8">
          <h2 className="text-xl font-heading font-semibold text-white mb-6">Pending Agent Approvals</h2>

          {agents.length === 0 ? (
            <p className="text-gray-400">No pending agents to approve.</p>
          ) : (
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white font-semibold">{agent.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{agent.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">{agent.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WhatsApp</p>
                      <p className="text-white">{agent.whatsapp}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Registered</p>
                      <p className="text-white">{new Date(agent.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => approveAgent(agent.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectAgent(agent.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-heading font-semibold text-white mb-6">Current Agents</h2>

          {currentAgents.length === 0 ? (
            <p className="text-gray-400">No approved agents yet.</p>
          ) : (
            <div className="space-y-4">
              {currentAgents.map((agent) => (
                <div key={agent.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-400 text-sm">Name</p>
                      <p className="text-white font-semibold">{agent.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white">{agent.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white">{agent.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">WhatsApp</p>
                      <p className="text-white">{agent.whatsapp}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Approved</p>
                      <p className="text-white">{new Date(agent.approved_at || agent.created_at).toLocaleDateString()}</p>
                    </div>
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
