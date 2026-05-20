'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/properties')
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting to properties...</div>
    </div>
  )
}
