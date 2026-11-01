import React from 'react'
import Navbar from './Navbar.jsx'
import BottomNav from './BottomNav.jsx'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50/50 to-slate-100/60 flex flex-col text-slate-900 antialiased font-sans">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  )
}