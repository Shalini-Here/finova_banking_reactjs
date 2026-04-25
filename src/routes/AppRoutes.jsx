/**
 * AppRoutes.jsx — Central routing configuration
 *
 * Route Flow:
 * ┌─────────────────────────────────────────────────────┐
 * │  PUBLIC ROUTES (no login needed)                    │
 * │   /           → Home        (landing page)          │
 * │   /about      → About       (company info)          │
 * │   /contact    → Contact     (contact form)          │
 * │   /search     → Search      (global search)         │
 * │   /login      → Login       (auth form)             │
 * │   /register   → Register    (sign-up form)          │
 * ├─────────────────────────────────────────────────────┤
 * │  PRIVATE ROUTES (requires login → PrivateRoute)     │
 * │   /dashboard     → Dashboard  (overview + charts)   │
 * │   /transactions  → Transactions (CRUD list)         │
 * │   /transfer      → Transfer    (send money)         │
 * │   /profile       → Profile     (user settings)      │
 * └─────────────────────────────────────────────────────┘
 */
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

// Public pages
import Home        from '../pages/Home'
import About       from '../pages/About'
import Contact     from '../pages/Contact'
import Search      from '../pages/Search'
import Login       from '../pages/auth/Login'
import Register    from '../pages/auth/Register'

// Private pages (wrapped in PrivateRoute)
import Dashboard   from '../pages/dashboard/Dashboard'
import Transactions from '../pages/transactions/Transactions'
import Transfer    from '../pages/transactions/Transfer'
import Profile     from '../pages/profile/Profile'

const AppRoutes = () => (
  <Routes>
    {/* ── Public ──────────────────────────── */}
    <Route path="/"         element={<Home />}     />
    <Route path="/about"    element={<About />}    />
    <Route path="/contact"  element={<Contact />}  />
    <Route path="/search"   element={<Search />}   />
    <Route path="/login"    element={<Login />}    />
    <Route path="/register" element={<Register />} />

    {/* ── Private (need login) ─────────────── */}
    <Route path="/dashboard"    element={<PrivateRoute><Dashboard /></PrivateRoute>}    />
    <Route path="/transactions" element={<PrivateRoute><Transactions /></PrivateRoute>} />
    <Route path="/transfer"     element={<PrivateRoute><Transfer /></PrivateRoute>}     />
    <Route path="/profile"      element={<PrivateRoute><Profile /></PrivateRoute>}      />

    {/* Catch-all → redirect home */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
)

export default AppRoutes
