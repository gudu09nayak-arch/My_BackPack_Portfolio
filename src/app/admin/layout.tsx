'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  const verifyAuth = useCallback(async () => {
    // Skip auth check for login page
    if (pathname === '/admin') {
      setLoading(false)
      return
    }

    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/admin/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const data = await res.json()

      if (data.valid) {
        setAuthenticated(true)
      } else {
        localStorage.removeItem('adminToken')
        router.push('/admin')
      }
    } catch {
      localStorage.removeItem('adminToken')
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }, [pathname, router])

  useEffect(() => {
    verifyAuth()
  }, [verifyAuth])

  if (pathname === '/admin') {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}
