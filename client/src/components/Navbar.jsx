import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, PlusCircle, User, MapPin } from 'lucide-react'
import logoImg from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE5DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Campus Tag */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="FindMe Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold bg-[#E8F1F2] text-[#0C4E55] px-3 py-1 rounded-full border border-[#C5DFE2]">
              <MapPin className="w-3.5 h-3.5 text-[#0C4E55]" /> Campus & Hostels
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-[#0C4E55] font-bold' : 'text-slate-600 hover:text-[#0C4E55]'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-[#0C4E55] font-bold' : 'text-slate-600 hover:text-[#0C4E55]'
                }`
              }
            >
              Browse Items
            </NavLink>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/items"
              className="p-2 text-slate-600 hover:text-[#0C4E55] hover:bg-[#E8F1F2] rounded-xl transition"
              title="Search items"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/report"
              className="hidden sm:inline-flex items-center gap-2 bg-[#0C4E55] hover:bg-[#07353A] text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-md shadow-[#0C4E55]/20 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Item</span>
            </Link>

            <Link
              to="/profile"
              className="p-2 text-slate-600 hover:text-[#0C4E55] hover:bg-[#E8F1F2] rounded-xl transition"
              title="User Account"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}