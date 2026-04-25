/**
 * Sidebar.jsx — Dashboard navigation sidebar
 *
 * Shown only in authenticated (private) pages.
 * Contains all private route links + user info + logout.
 * Highlights the currently active route.
 */
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ArrowLeftRight, Send, Users,
  CreditCard, BarChart2, User, Settings, LogOut, Sun, Moon
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'

// Sidebar navigation items — each maps to a private route
const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard',    to: '/dashboard'    },
  { icon: ArrowLeftRight,  label: 'Transactions', to: '/transactions' },
  { icon: Send,            label: 'Transfer Money',to: '/transfer'    },
  { icon: User,            label: 'Profile',       to: '/profile'     },
]

const Sidebar = () => {
  const { user, logout } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')  // send to login after logout
  }

  const isActive = (path) => location.pathname === path

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col bg-white dark:bg-[#1E293B] border-r border-[#E2E8F0] dark:border-[#334155]">

      {/* ── Logo ──────────────────────────────── */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-[#E2E8F0] dark:border-[#334155]">
        <div className="w-8 h-8 bg-[#5B6CFF] rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="font-bold text-[#1E293B] dark:text-[#F1F5F9]">
          Finova <span className="text-[#5B6CFF]">Banking</span>
        </span>
      </div>

      {/* ── Nav Links ─────────────────────────── */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, to }) => (
          <Link
            key={to}
            to={to}
            className={`sidebar-link ${isActive(to) ? 'active' : ''}`}
          >
            <Icon size={18} />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      {/* ── Bottom: theme toggle + user + logout ─ */}
      <div className="border-t border-[#E2E8F0] dark:border-[#334155] px-3 py-4 flex flex-col gap-2">

        {/* Dark mode toggle inside sidebar */}
        <button
          onClick={toggleTheme}
          className="sidebar-link w-full"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
        </button>

        {/* User info card */}
        {user && (
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#F5F7FB] dark:bg-[#0F172A] mt-1">
            <div className="w-9 h-9 rounded-full bg-[#5B6CFF] flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#1E293B] dark:text-[#F1F5F9] truncate">{user.name}</p>
              <p className="text-xs text-[#64748B] truncate">{user.email}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="sidebar-link w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
