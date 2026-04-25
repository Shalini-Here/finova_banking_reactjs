/**
 * DashboardLayout.jsx — Wrapper for all private/authenticated pages
 *
 * Renders:
 * • Sidebar (left, sticky) — navigation for private routes
 * • Main content area (right, scrollable) — page content
 *
 * Usage: wrap any private page content with this component
 *   <DashboardLayout>
 *     <Dashboard />
 *   </DashboardLayout>
 *
 * Note: This layout is NOT used for public pages (Home, About, etc.)
 *       which use Navbar + Footer instead.
 */
import React from 'react'
import Sidebar from './Sidebar'

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-[#F5F7FB] dark:bg-[#0F172A] overflow-hidden">
    {/* Fixed sidebar */}
    <Sidebar />
    {/* Scrollable content */}
    <main className="flex-1 overflow-y-auto">
      <div className="p-6 lg:p-8 page-enter">
        {children}
      </div>
    </main>
  </div>
)

export default DashboardLayout
