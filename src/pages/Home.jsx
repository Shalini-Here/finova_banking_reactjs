/**
 * Home.jsx — Landing page (public route: /)
 *
 * Sections:
 * 1. Hero     — headline, sub-text, CTA buttons, mock phone UI
 * 2. Features — 4 feature cards
 * 3. Stats    — animated counters
 * 4. CTA Banner — "Start Banking Now"
 */
import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Shield, Activity, Zap, BarChart2, ArrowRight, TrendingUp } from 'lucide-react'

// Feature cards data
const FEATURES = [
  {
    icon: Shield,
    title: 'Secure & Safe',
    desc: 'Bank-grade security to protect your money and personal data at all times.',
    color: '#5B6CFF',
  },
  {
    icon: Activity,
    title: 'Real-time Tracking',
    desc: 'Track your transactions and spending in real-time with live updates.',
    color: '#22C55E',
  },
  {
    icon: Zap,
    title: 'Instant Transfers',
    desc: 'Send and receive money instantly with just a few clicks.',
    color: '#F59E0B',
  },
  {
    icon: BarChart2,
    title: 'Smart Analytics',
    desc: 'Visualize your spending patterns and save more with intelligent insights.',
    color: '#EC4899',
  },
]

// Stats section data
const STATS = [
  { value: '10K+',  label: 'Happy Users'  },
  { value: '99.9%', label: 'Uptime'       },
  { value: '50K+',  label: 'Transactions' },
  { value: '24/7',  label: 'Support'      },
]

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0F172A]">
      <Navbar />

      {/* ══ 1. Hero Section ══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left: Copy */}
        <div className="page-enter">
          <span className="inline-block bg-[#5B6CFF1A] text-[#5B6CFF] text-xs font-semibold px-3 py-1 rounded-full mb-6">
            Modern & Secure Banking
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1E293B] dark:text-[#F1F5F9] leading-tight mb-4">
            Smart Digital Banking<br />
            <span className="text-[#5B6CFF]">For Your Future</span>
          </h1>
          <p className="text-[#64748B] text-lg mb-8 leading-relaxed">
            Manage, track, and grow your finances easily. Finova Banking gives you the
            tools of a modern fintech — in your pocket.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2">
              Get Started <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-outline flex items-center gap-2">
              Explore Features
            </Link>
          </div>
        </div>

        {/* Right: Mock phone card — decorative UI preview */}
        <div className="relative flex justify-center">
          <div className="w-72 bg-white dark:bg-[#1E293B] rounded-3xl shadow-2xl p-6 border border-[#E2E8F0] dark:border-[#334155] animate-fade-in">
            {/* Balance card */}
            <div className="bg-gradient-to-br from-[#5B6CFF] to-[#8B9DFF] rounded-2xl p-5 mb-5 text-white">
              <p className="text-xs opacity-80 mb-1">Total Balance</p>
              <p className="text-2xl font-bold">₹1,25,000.50</p>
              <p className="text-xs opacity-70 mt-1">Available Balance</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="tracking-widest text-sm opacity-80">•••• •••• •••• 4567</span>
                <span className="text-xs font-bold opacity-90">VISA</span>
              </div>
            </div>
            {/* Quick actions */}
            <p className="text-xs font-semibold text-[#64748B] mb-3">Quick Actions</p>
            <div className="grid grid-cols-4 gap-2 mb-5">
              {['Send','Receive','Top Up','More'].map(a => (
                <div key={a} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-xl bg-[#F5F7FB] dark:bg-[#0F172A] flex items-center justify-center">
                    <TrendingUp size={14} className="text-[#5B6CFF]" />
                  </div>
                  <span className="text-[10px] text-[#64748B]">{a}</span>
                </div>
              ))}
            </div>
            {/* Recent transactions */}
            <p className="text-xs font-semibold text-[#64748B] mb-2">Recent Transactions</p>
            {[
              { label: 'Amazon Shopping', amt: '-₹2,450', date: 'Today' },
              { label: 'Salary Credit',   amt: '+₹52,000', date: '12 May' },
            ].map(t => (
              <div key={t.label} className="flex justify-between items-center py-2 border-b border-[#F1F5F9] dark:border-[#334155] last:border-0">
                <div>
                  <p className="text-xs font-medium text-[#1E293B] dark:text-[#F1F5F9]">{t.label}</p>
                  <p className="text-[10px] text-[#64748B]">{t.date}</p>
                </div>
                <span className={`text-xs font-semibold ${t.amt.startsWith('+') ? 'text-[#22C55E]' : 'text-red-500'}`}>
                  {t.amt}
                </span>
              </div>
            ))}
          </div>
          {/* Decorative blobs */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#5B6CFF] opacity-10 rounded-full blur-3xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[#22C55E] opacity-10 rounded-full blur-3xl" />
        </div>
      </section>

      {/* ══ 2. Features ══════════════════════════════════════ */}
      <section className="bg-white dark:bg-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1E293B] dark:text-[#F1F5F9] mb-12">
            Everything You Need to <span className="text-[#5B6CFF]">Bank Smarter</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: color + '20' }}
                >
                  <Icon size={22} style={{ color }} />
                </div>
                <h3 className="font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-2">{title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. Stats ══════════════════════════════════════════ */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-bold text-[#5B6CFF]">{value}</p>
              <p className="text-sm text-[#64748B] mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ 4. CTA Banner ════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="bg-gradient-to-r from-[#5B6CFF] to-[#8B9DFF] rounded-3xl p-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Start Your Journey with Finova Banking</h3>
            <p className="text-white/80 text-sm">Join thousands of happy customers who trust us for secure banking.</p>
          </div>
          <Link to="/register"
            className="bg-white text-[#5B6CFF] font-semibold px-8 py-3 rounded-xl hover:bg-[#F1F5F9] transition-colors whitespace-nowrap">
            Create Account
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home
