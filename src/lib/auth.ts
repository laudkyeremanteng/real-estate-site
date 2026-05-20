import { supabase } from './supabase'

// Agent registration
export async function registerAgent(email: string, password: string, name: string, phone: string) {
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

  // 2. Insert agent data into agents table
  const { error: agentError } = await supabase
    .from('agents')
    .insert({
      id: authData.user.id,
      email,
      password, // Note: In production, you should not store passwords
      name,
      phone,
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
