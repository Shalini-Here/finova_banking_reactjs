/**
 * Contact.jsx — Contact page (public route: /contact)
 * Left: form with name, email, subject, message
 * Right: contact info (email, phone, address, social links)
 */
import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import { isValidEmail, isRequired } from '../utils/validators'
import { useToast } from '../context/ToastContext'

const SUBJECTS = ['General Inquiry', 'Technical Support', 'Account Issues', 'Feedback', 'Partnership']

const Contact = () => {
  const { showToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const validate = () => {
    const e = {}
    if (!isRequired(form.name))    e.name    = 'Name is required'
    if (!isValidEmail(form.email)) e.email   = 'Enter a valid email'
    if (!isRequired(form.message)) e.message = 'Message cannot be empty'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    // In a real app → POST to API endpoint
    setSent(true)
    showToast('Message sent successfully!', 'success')
  }

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: undefined })) // clear error on change
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-8 py-16 page-enter">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#5B6CFF1A] text-[#5B6CFF] text-xs font-semibold px-3 py-1 rounded-full mb-3">
            Get in Touch
          </span>
          <h1 className="text-3xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">
            Contact <span className="text-[#5B6CFF]">Us</span>
          </h1>
          <p className="text-[#64748B] mt-2 text-sm">We're here to help with any questions or concerns.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Contact Form ─────────────────────────────── */}
          <div className="lg:col-span-2 card">
            {sent ? (
              // Success state
              <div className="flex flex-col items-center justify-center h-64 gap-4">
                <CheckCircle size={48} className="text-[#22C55E]" />
                <h3 className="text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9]">Message Sent!</h3>
                <p className="text-[#64748B] text-sm text-center">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name:'', email:'', subject:'General Inquiry', message:'' }) }}
                  className="btn-outline text-sm py-2">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="text-lg font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-4">Send a Message</h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={e => handleChange('name', e.target.value)}
                      className={`input-field ${errors.name ? 'ring-2 ring-red-400' : ''}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-[#64748B] mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className={`input-field ${errors.email ? 'ring-2 ring-red-400' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Subject</label>
                  <select
                    value={form.subject}
                    onChange={e => handleChange('subject', e.target.value)}
                    className="input-field"
                  >
                    {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-[#64748B] mb-1">Message</label>
                  <textarea
                    rows={5}
                    placeholder="Type your message here..."
                    value={form.message}
                    onChange={e => handleChange('message', e.target.value)}
                    className={`input-field resize-none ${errors.message ? 'ring-2 ring-red-400' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                </div>

                <button type="submit" className="btn-primary flex items-center gap-2">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

          {/* ── Contact Info ─────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="card">
              <h3 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-4">Get in Touch</h3>
              <p className="text-xs text-[#64748B] mb-6 leading-relaxed">
                We are here to help you with any questions or concerns.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Mail,    label: 'Email',   value: 'support@finovabanking.com', color: '#5B6CFF' },
                  { icon: Phone,   label: 'Phone',   value: '+91 98765 43210',           color: '#22C55E' },
                  { icon: MapPin,  label: 'Address', value: '123 Banking Street, Mumbai, India', color: '#F59E0B' },
                ].map(({ icon: Icon, label, value, color }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: color + '20' }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#1E293B] dark:text-[#F1F5F9]">{label}</p>
                      <p className="text-xs text-[#64748B] mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working hours */}
            <div className="card">
              <h4 className="font-semibold text-[#1E293B] dark:text-[#F1F5F9] text-sm mb-3">Working Hours</h4>
              <div className="space-y-2 text-xs text-[#64748B]">
                <div className="flex justify-between"><span>Monday – Friday</span><span className="text-[#22C55E] font-medium">9am – 6pm</span></div>
                <div className="flex justify-between"><span>Saturday</span><span className="text-[#F59E0B] font-medium">10am – 4pm</span></div>
                <div className="flex justify-between"><span>Sunday</span><span className="text-red-400 font-medium">Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Contact
