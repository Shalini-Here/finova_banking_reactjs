/**
 * ThemeContext.jsx — Dark/Light mode global state
 *
 * How it works:
 * 1. On first load, reads saved preference from localStorage.
 * 2. Applies/removes the "dark" class on <html> element.
 * 3. Any component can call useTheme() to get the current mode and toggle it.
 *
 * Usage:
 *   const { isDark, toggleTheme } = useTheme()
 */
import React, { createContext, useContext, useEffect, useState } from 'react'

// Create the context with a default empty object
const ThemeContext = createContext({})

export function ThemeProvider({ children }) {
  // Initialize from localStorage so preference survives page refresh
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('finova_theme') === 'dark'
  })

  // Whenever isDark changes → update the HTML class and persist to storage
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
      localStorage.setItem('finova_theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('finova_theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook — import this in any component instead of useContext directly
export const useTheme = () => useContext(ThemeContext)
