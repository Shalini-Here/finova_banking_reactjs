/**
 * About.jsx — About page (public route: /about)
 *
 * Sections:
 * 1. Hero with illustration area
 * 2. What is Finova Banking? (expanded description)
 * 3. Objectives
 * 4. Tech Stack
 * 5. Key Features grid
 * 6. Stats bar
 */
import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Target, Code2, Star, CheckCircle2, Users, Activity, Shield, Zap } from 'lucide-react'

const OBJECTIVES = [
  'Build a scalable, modular frontend architecture using React + Vite',
  'Demonstrate real-world fintech UI/UX patterns with clean design',
  'Practice global state management with React Context API',
  'Implement protected routing and session-based authentication',
]

const TECH_STACK = [
  { name: 'React 18',     desc: 'Component-based UI library',        color: '#61DAFB' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS framework',        color: '#06B6D4' },
  { name: 'Context API',  desc: 'Global state management',           color: '#5B6CFF' },
  { name: 'React Router', desc: 'Client-side routing',               color: '#F59E0B' },
  { name: 'Recharts',     desc: 'Charts & data visualization',       color: '#22C55E' },
  { name: 'Vite',         desc: 'Lightning-fast build tool',         color: '#646CFF' },
]

const KEY_FEATURES = [
  { icon: Shield,   text: 'Secure Authentication UI with form validation' },
  { icon: Activity, text: 'Dashboard with live balance & expense analytics' },
  { icon: Zap,      text: 'Transaction Management — add, view, delete (CRUD)' },
  { icon: Users,    text: 'Responsive Design — works on all screen sizes' },
  { icon: Star,     text: 'Dark / Light mode with localStorage persistence' },
  { icon: CheckCircle2, text: 'Protected Routes using PrivateRoute guard' },
]

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FB] dark:bg-[#0F172A]">
      <Navbar />

      <main className="flex-1">

        {/* ══ Hero ══════════════════════════════════════════ */}
        <section className="bg-white dark:bg-[#1E293B] border-b border-[#E2E8F0] dark:border-[#334155]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 grid lg:grid-cols-2 gap-12 items-center">
            <div className="page-enter">
              <span className="inline-block bg-[#5B6CFF1A] text-[#5B6CFF] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                About Us
              </span>
              <h1 className="text-4xl font-bold text-[#1E293B] dark:text-[#F1F5F9] mb-4">
                About <span className="text-[#5B6CFF]">Finova Banking</span>
              </h1>
              <p className="text-[#64748B] leading-relaxed text-base">
                Finova Banking is a modern web-based banking interface built using React and Tailwind CSS.
                This project is designed to simulate a real-world digital banking experience with a
                strong focus on usability, performance, and clean UI design.
              </p>
              <p className="text-[#64748B] leading-relaxed text-base mt-4">
                The platform allows users to manage their financial activities such as tracking transactions,
                transferring money, and analyzing spending patterns through an intuitive dashboard.
                Every page is crafted with attention to accessibility and responsive design.
              </p>
            </div>

            {/* Illustration area */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-[#5B6CFF] to-[#8B9DFF] rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-white text-center">
                  <div className="text-6xl font-bold mb-2">F</div>
                  <div className="text-sm opacity-80">Finova Banking</div>
                  <div className="text-xs opacity-60 mt-1">v1.0.0</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Objectives ════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12">

            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#5B6CFF1A] rounded-xl flex items-center justify-center">
                  <Target size={20} className="text-[#5B6CFF]" />
                </div>
                <h2 className="text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Our Objectives</h2>
              </div>
              <ul className="space-y-3">
                {OBJECTIVES.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#64748B]">
                    <CheckCircle2 size={16} className="text-[#22C55E] mt-0.5 flex-shrink-0" />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#22C55E1A] rounded-xl flex items-center justify-center">
                  <Code2 size={20} className="text-[#22C55E]" />
                </div>
                <h2 className="text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Tech Stack</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {TECH_STACK.map(({ name, desc, color }) => (
                  <div key={name} className="bg-[#F5F7FB] dark:bg-[#0F172A] rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                      <span className="text-sm font-semibold text-[#1E293B] dark:text-[#F1F5F9]">{name}</span>
                    </div>
                    <p className="text-xs text-[#64748B]">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ Key Features ══════════════════════════════════ */}
        <section className="bg-white dark:bg-[#1E293B] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-[#F59E0B1A] rounded-xl flex items-center justify-center">
                <Star size={20} className="text-[#F59E0B]" />
              </div>
              <h2 className="text-xl font-bold text-[#1E293B] dark:text-[#F1F5F9]">Key Features</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {KEY_FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3 bg-[#F5F7FB] dark:bg-[#0F172A] rounded-xl p-4">
                  <div className="w-8 h-8 bg-[#5B6CFF1A] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#5B6CFF]" />
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Stats Bar ═════════════════════════════════════ */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { v: '10K+', l: 'Happy Users' }, { v: '99.9%', l: 'Uptime' },
              { v: '50K+', l: 'Transactions'}, { v: '24/7', l: 'Support' }
            ].map(({ v, l }) => (
              <div key={l} className="card text-center">
                <p className="text-3xl font-bold text-[#5B6CFF]">{v}</p>
                <p className="text-sm text-[#64748B] mt-1">{l}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default About
