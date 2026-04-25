/**
 * ToastContext.jsx — Toast notification system
 *
 * Manages a list of toast messages shown at the top-right of the screen.
 * Each toast auto-dismisses after 3 seconds.
 *
 * Usage:
 *   const { showToast } = useToast()
 *   showToast('Transfer successful!', 'success')  // type: success | error | info
 */
import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext({})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])  // array of { id, message, type }

  const showToast = useCallback((message, type = 'info') => {
    const id = Date.now() // unique id for each toast
    setToasts(prev => [...prev, { id, message, type }])

    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      {/* Toast renderer lives here so it's always on top */}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

// Internal component — renders the stacked toasts
function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium animate-slide-up
            ${t.type === 'success' ? 'bg-[#22C55E]'
            : t.type === 'error'   ? 'bg-red-500'
            : 'bg-[#5B6CFF]'}`}
        >
          {t.message}
        </div>
      ))}
    </div>
  )
}

export const useToast = () => useContext(ToastContext)
