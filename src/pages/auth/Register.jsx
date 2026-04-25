/**
 * Register.jsx — Registration page (public route: /register)
 * Collects: full name, email, password, confirm password + T&C checkbox
 * On success: logs in user and redirects to dashboard
 */
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { isValidEmail, isRequired, isValidPassword } from '../../utils/validators'

const Register = () => {
  const { login } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', agree: false })
  const [errors, setErrors] = useState({})
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!isRequired(form.name))          e.name    = 'Full name is required'
    if (!isValidEmail(form.email))       e.email   = 'Enter a valid email'
    if (!isValidPassword(form.password)) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm)  e.confirm  = 'Passwords do not match'
    if (!form.agree)                     e.agree    = 'You must accept the Terms & Conditions'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    // Mock registration — in real app POST to /api/register
    login({ name: form.name, email: form.email })
    showToast('Account created successfully! 🎉', 'success')
    navigate('/dashboard')
    setLoading(false)
  }

  const handleChange = (field, val) => {
    setForm(p => ({ ...p, [field]: val }))
    setErrors(p => ({ ...p, [field]: undefined }))
  }

  return (
    <div className="min-h-screen bg-[#F5F7FB] dark:bg-[#0F172A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 justify-center mb-6">
            <div className="w-10 h-10 bg-[#5B6CFF] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">F</span>
            </div>
            <span className="font-bold text-xl text-[#1E293B] dark:text-[#F1F5F9]">Finova Banking</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Create your account</h1>
          <p className="text-[#64748B] text-sm mt-1">Fill in the details to get started.</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Full Name</label>
              <input type="text" placeholder="John Doe" value={form.name}
                onChange={e => handleChange('name', e.target.value)}
                className={`input-field ${errors.name ? 'ring-2 ring-red-400' : ''}`} />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Email address</label>
              <input type="email" placeholder="example@gmail.com" value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className={`input-field ${errors.email ? 'ring-2 ring-red-400' : ''}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} placeholder="••••••••" value={form.password}
                  onChange={e => handleChange('password', e.target.value)}
                  className={`input-field pr-11 ${errors.password ? 'ring-2 ring-red-400' : ''}`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-[#64748B] mb-1">Confirm Password</label>
              <input type="password" placeholder="••••••••" value={form.confirm}
                onChange={e => handleChange('confirm', e.target.value)}
                className={`input-field ${errors.confirm ? 'ring-2 ring-red-400' : ''}`} />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            {/* T&C */}
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agree}
                  onChange={e => handleChange('agree', e.target.checked)}
                  className="accent-[#5B6CFF] rounded" />
                <span className="text-xs text-[#64748B]">
                  I agree to the{' '}
                  <span className="text-[#5B6CFF] hover:underline cursor-pointer">Terms & Conditions</span>
                </span>
              </label>
              {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><UserPlus size={16} /> Register</>
              }
            </button>
          </form>

          <p className="text-center text-xs text-[#64748B] mt-5">
            Already have an account?{' '}
            <Link to="/login" className="text-[#5B6CFF] font-medium hover:underline">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
