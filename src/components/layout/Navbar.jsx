/**
 * Navbar.jsx — Top navigation bar (shown on public pages)
 *
 * Contains:
 * • Logo (links to /)
 * • Nav links: Home, About, Contact
 * • Search icon (links to /search)
 * • Dark mode toggle (calls ThemeContext)
 * • Login / Dashboard button (based on auth state)
 */
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Search, Menu, X } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { user } = useAuth()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Helper: highlight active link
  const isActive = (path) => location.pathname === path

  const links = [
    { to: '/',        label: 'Home' },
    { to: '/about',   label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#0F172A]/80 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ──────────────────────────────── */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#5B6CFF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="font-bold text-[#1E293B] dark:text-[#F1F5F9] text-lg">
              Finova <span className="text-[#5B6CFF]">Banking</span>
            </span>
          </Link>

          {/* ── Desktop Links ─────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200
                  ${isActive(to)
                    ? 'text-[#5B6CFF] bg-[#5B6CFF1A]'
                    : 'text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B6CFF] hover:bg-[#5B6CFF0D]'}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ── Right Controls ────────────────────── */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <Link to="/search"
              className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors">
              <Search size={18} />
            </Link>

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8] hover:bg-[#F1F5F9] dark:hover:bg-[#1E293B] transition-colors"
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Auth button */}
            {user ? (
              <Link to="/dashboard" className="btn-primary text-sm py-2 px-4">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="btn-primary text-sm py-2 px-4">
                Login
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-[#64748B] dark:text-[#94A3B8]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ────────────────────────── */}
        {menuOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] dark:border-[#1E293B] py-3 flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 text-sm text-[#64748B] dark:text-[#94A3B8] hover:text-[#5B6CFF]"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
