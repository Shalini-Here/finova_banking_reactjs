/**
 * AuthContext.jsx — Authentication global state
 *
 * Stores the logged-in user object and exposes login/logout functions.
 * Data is persisted in localStorage so the session survives page refresh.
 *
 * Usage:
 *   const { user, login, logout } = useAuth()
 *
 * login(userData) → saves user to state + storage
 * logout()        → clears user from state + storage
 */
import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext({})

export function AuthProvider({ children }) {
  // Restore session from localStorage on mount
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('finova_user')
    return saved ? JSON.parse(saved) : null
  })

  // Called from Login page — saves user object and persists it
  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('finova_user', JSON.stringify(userData))
  }

  // Called from Sidebar logout button — clears everything
  const logout = () => {
    setUser(null)
    localStorage.removeItem('finova_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
