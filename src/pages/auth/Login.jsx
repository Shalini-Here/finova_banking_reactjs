/**
 * Login.jsx — Login page (public route: /login)
 *
 * Flow:
 * 1. User enters email + password
 * 2. Validation checks (isValidEmail, isRequired)
 * 3. Simulates auth (in real app → POST /api/login)
 * 4. Saves user to AuthContext → redirects to /dashboard
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { isValidEmail, isRequired } from '../../utils/validators'

const Login = () => {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!isValidEmail(form.email))    e.email    = 'Enter a valid email address'
    if (!isRequired(form.password))   e.password = 'Password is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800))

    // Mock auth — accept any valid email/password combo
    // In production: POST to backend, get JWT, verify
    const mockUser = { name: 'John Doe', email: form.email }
    login(mockUser)
    showToast('Welcome back! 👋', 'success')
    navigate('/dashboard')
    setLoading(false)
  }

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }))
    setErrors(p => ({ ...p, [field]: undefined }))
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0F172A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 bg-[#5B6CFF] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="font-bold text-xl text-[#1E293B] dark:text-[#F1F5F9]">Finova Banking</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Login to your account</h1>
          <p className="text-[#64748B] text-sm mt-1">Welcome back! Please enter your details.</p>
        </div>

        {/* Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Email address</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'ring-2 ring-red-400' : ''}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-[#64748B]">Password</label>
                <button type="button" className="text-xs text-[#5B6CFF] hover:underline">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`input-field pr-11 ${errors.password ? 'ring-2 ring-red-400' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#5B6CFF]"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-[#5B6CFF] accent-[#5B6CFF]" />
              <span className="text-xs text-[#64748B]">Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><LogIn size={16} /> Login</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-[#64748B] mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#5B6CFF] font-medium hover:underline">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
