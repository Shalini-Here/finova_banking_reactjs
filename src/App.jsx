/**
 * App.jsx — Root component
 *
 * Wraps everything in all Context Providers.
 * Provider order matters — contexts used by other providers must be outer:
 *
 *   ThemeProvider        ← manages dark/light mode
 *     ToastProvider      ← toast notifications (used in Auth flows)
 *       AuthProvider     ← user session
 *         TransactionProvider ← transaction data
 *           AppRoutes    ← page routing
 *
 * All providers wrap AppRoutes so every page/component can access any context.
 */
import React from 'react'
import { ThemeProvider }       from './context/ThemeContext'
import { AuthProvider }        from './context/AuthContext'
import { ToastProvider }       from './context/ToastContext'
import { TransactionProvider } from './context/TransactionContext'
import AppRoutes               from './routes/AppRoutes'

const App = () => (
  <ThemeProvider>
    <ToastProvider>
      <AuthProvider>
        <TransactionProvider>
          {/* AppRoutes renders the correct page based on the URL */}
          <AppRoutes />
        </TransactionProvider>
      </AuthProvider>
    </ToastProvider>
  </ThemeProvider>
)

export default App
