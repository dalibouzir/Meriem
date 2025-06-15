"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

interface User {
  id: string;
  email: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
   

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/auth/login")
      }
    })
    return () => {
      listener?.subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>
  }

  return (
    <div className="center" style={{ marginTop: "4rem" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700 }}>Welcome, {user?.email || "User"}!</h1>
      <p style={{ margin: "1rem 0" }}>You are logged in.</p>
      <button
        className="btn-outline"
        onClick={async () => {
          await supabase.auth.signOut()
          router.push("/auth/login")
        }}
      >
        Log out
      </button>
    </div>
  )
}
