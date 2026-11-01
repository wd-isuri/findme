import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, PlusCircle, User, MapPin } from 'lucide-react'
import logoImg from '../assets/logo.png'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Real Logo & Campus Tag */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src={logoImg}
                alt="FindMe Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full border border-purple-200">
              <MapPin className="w-3 h-3 text-purple-600" /> Campus & Hostels
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-gray-900'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-gray-900'
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
              className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
              title="Search items"
            >
              <Search className="w-5 h-5" />
            </Link>

            <Link
              to="/report"
              className="hidden sm:inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-4 py-2 rounded-xl shadow-md shadow-purple-600/20 transition active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Item</span>
            </Link>

            <Link
              to="/profile"
              className="p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition"
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