/**
 * PrivateRoute.jsx — Route guard for authenticated pages
 *
 * How it works:
 * • Checks if a user session exists in AuthContext.
 * • If YES → renders the child component (e.g., Dashboard).
 * • If NO  → redirects to /login using <Navigate />.
 *
 * Usage in AppRoutes.jsx:
 *   <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
 */
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()

  // If no user is logged in, send them to login page
  if (!user) return <Navigate to="/login" replace />

  // Otherwise render the protected page
  return children
}

export default PrivateRoute
