"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSchoolAuth } from "@/context/SchoolAuthContext"
import { Loader2 } from 'lucide-react'

export default function SchoolAuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading, school } = useSchoolAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/school/login")
    }

    // Check if user is a school
    if (!loading && isAuthenticated && school?.role !== "school") {
      router.push("/")
    }
  }, [isAuthenticated, loading, router, school])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
