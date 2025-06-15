"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

type AuthType = "login" | "signup"

interface AuthFormProps {
  type: AuthType
}

function getPasswordStrength(password: string): { label: string; color: string; score: number } {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (score >= 4) return { label: "Strong", color: "green", score }
  if (score >= 2) return { label: "Medium", color: "orange", score }
  return { label: "Weak", color: "red", score }
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const passwordStrength = type === "signup" ? getPasswordStrength(password) : null

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!email || !password || (type === "signup" && !confirmPassword)) {
      setError("Please fill out all fields.")
      return
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (type === "signup" && password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      if (type === "signup") {
        const { data: signupData, error: signupError } = await supabase.auth.signUp({ email, password })
        if (signupError) throw signupError

        if (signupData.user) {
          await supabase.from("users").insert([
            {
              id: signupData.user.id,
              email: signupData.user.email,
              name: email.split("@")[0],
              role: "client",
            },
          ])
        }
        setSuccess("Signup successful! Please check your email to confirm your account.")
      } else {
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) throw loginError
        setSuccess("Login successful! Redirecting...")
        setTimeout(() => {
          router.push("/profile")
        }, 1200)
      }
    } catch (err: unknown) {
      setError((err as Error).message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form-title">
        {type === "login" ? "Login to your account" : "Create your account"}
      </h2>
      <input
        type="email"
        className="auth-form-input"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        autoComplete="email"
      />
      <div style={{ position: "relative" }}>
        <input
          type={showPassword ? "text" : "password"}
          className="auth-form-input"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={8}
          autoComplete={type === "login" ? "current-password" : "new-password"}
        />
        <button
          type="button"
          className="auth-form-link"
          style={{
            position: "absolute",
            top: 10,
            right: 16,
            fontSize: "0.96rem",
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer"
          }}
          onClick={() => setShowPassword(v => !v)}
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      {type === "signup" && (
        <>
          <input
            type={showPassword ? "text" : "password"}
            className="auth-form-input"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={8}
            autoComplete="new-password"
          />
          <div className="password-strength-bar-container">
            <div
              className={`password-strength-bar ${passwordStrength?.color ?? "red"}`}
              style={{
                width: `${(passwordStrength?.score ?? 0) * 25}%`
              }}
            ></div>
          </div>
          <div className={`password-strength-label ${passwordStrength?.color ?? "red"}`}>
            {password ? passwordStrength?.label : "Enter a password"}
          </div>
        </>
      )}
      <button
        type="submit"
        className="auth-form-btn"
        disabled={loading}
      >
        {loading ? "Please wait..." : type === "login" ? "Login" : "Sign Up"}
      </button>
      <ul style={{ margin: "0 0 0.2rem 1rem", padding: 0, color: "#64748b", fontSize: "0.92rem" }}>
        {type === "signup" && (
          <>
            <li>Password must be at least 8 characters</li>
            <li>Use both letters and numbers for better security</li>
          </>
        )}
      </ul>
      {error && <div className="auth-form-error">{error}</div>}
      {success && <div className="auth-form-success">{success}</div>}
      <div className="auth-form-footer">
        {type === "login" ? (
          <a href="/auth/signup" className="auth-form-link">Don’t have an account? Sign up</a>
        ) : (
          <a href="/auth/login" className="auth-form-link">Already have an account? Login</a>
        )}
      </div>
    </form>
  )
}
