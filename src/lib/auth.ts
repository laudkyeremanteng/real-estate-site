import { supabase } from './supabase'

// Agent registration
export async function registerAgent(email: string, password: string, name: string, phone: string, whatsapp: string) {
  // 1. Sign up user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    return { error: authError.message }
  }

  if (!authData.user) {
    return { error: 'Failed to create user' }
  }

  // 2. Insert agent data into agents table with pending status
  const { error: agentError } = await supabase
    .from('agents')
    .insert({
      id: authData.user.id,
      email,
      password, // Note: In production, you should not store passwords
      name,
      phone,
      whatsapp,
      status: 'pending', // Set status to pending for approval
    })

  if (agentError) {
    return { error: agentError.message }
  }

  return { success: true, user: authData.user }
}

// Agent login
export async function loginAgent(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // Check if agent is approved
  const { data: agent, error: agentError } = await supabase
    .from('agents')
    .select('status')
    .eq('id', data.user.id)
    .single()

  if (agentError || !agent) {
    return { error: 'Agent data not found' }
  }

  if (agent.status === 'rejected') {
    // Sign out the user since they're rejected
    await supabase.auth.signOut()
    return { error: 'Your account has been rejected. Please contact support for more information.' }
  }

  if (agent.status === 'pending') {
    // Sign out the user since they're pending approval
    await supabase.auth.signOut()
    return { error: 'Your account is pending approval. Please wait for admin approval.' }
  }

  return { success: true, user: data.user }
}

// Agent logout
export async function logoutAgent() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    return { error: error.message }
  }
  return { success: true }
}

// Get current authenticated agent
export async function getCurrentAgent() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    return null
  }

  // Get agent details from agents table
  const { data: agent, error: agentError } = await supabase
    .from('agents')
    .select('*')
    .eq('id', user.id)
    .single()

  if (agentError) {
    return null
  }

  return agent
}

// Request password reset email
export async function resetPassword(email: string) {
  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL 
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`
    : `${window.location.origin}/auth/reset-password`
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirectUrl,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

// Update password with reset token
export async function updatePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

// Admin login with passcode
export async function loginAdminWithPasscode(passcode: string) {
  // Define the admin passcode (in production, this should be in environment variables)
  const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || 'admin123'

  if (passcode !== ADMIN_PASSCODE) {
    return { error: 'Invalid passcode' }
  }

  return { success: true }
}

// Check if admin is authenticated (always returns false to force re-authentication on every visit)
export function isAdminAuthenticated() {
  return false
}

// Admin logout (no-op since session is not persisted)
export function logoutAdmin() {
  // No-op since session is not persisted
}
