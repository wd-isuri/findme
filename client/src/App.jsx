import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import { 
  Sparkles, 
  PlusCircle, 
  Compass, 
  Smartphone, 
  Key, 
  Search, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react'

// The Split Hero & Landing Page View
function HomePage() {
  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA (7 cols on desktop) */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/70 text-purple-700 text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              AI-Powered Lost & Found
            </div>

            {/* Editorial Headline */}
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Lost something? <br />
              <span className="italic font-normal text-purple-600">We'll find it.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              FindMe connects students across campus and hostels to recover lost belongings using smart AI matching and instant notifications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-purple-600/25 transition active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                Report a lost item
              </Link>

              <Link
                to="/items"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-800 font-medium px-6 py-3.5 rounded-xl border border-slate-200 shadow-xs transition active:scale-95"
              >
                <Compass className="w-5 h-5 text-purple-600" />
                I found something
              </Link>
            </div>

            {/* Trust badge */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free for students
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-500" /> Private & Verified
              </span>
            </div>

          </div>

          {/* Right Column: Floating AI Cards Graphic (5 cols on desktop) */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            
            {/* Center Background Card */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-gradient-to-tr from-[#1e1b4b] to-[#312e81] shadow-2xl flex flex-col items-center justify-center text-white relative overflow-hidden p-6 border border-indigo-900/50">
              <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-3 shadow-inner">
                <Search className="w-10 h-10 text-purple-300" />
              </div>
              <span className="font-bold text-xl tracking-tight">FindMe</span>
              <span className="text-xs text-purple-200">Campus Match Engine</span>

              {/* Ambient Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"></div>
            </div>

            {/* Floating Card 1: Top-Right "Samsung Galaxy S23 (94% Match)" */}
            <div className="absolute -top-2 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-100 max-w-[240px] transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Samsung Galaxy S23</h4>
                  <p className="text-[11px] text-slate-500">Lost • Main Library</p>
                </div>
              </div>

              {/* Match Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between items-center text-[10px] font-semibold text-purple-700 mb-1">
                  <span>AI Match Score</span>
                  <span>94%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full w-[94%]"></div>
                </div>
              </div>
            </div>

            {/* Floating Card 2: Bottom-Left "Keys with Red Keychain (Found)" */}
            <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-xl border border-slate-100 max-w-[230px] transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight">Keys & Keychain</h4>
                    <p className="text-[11px] text-slate-500">Found • Cafeteria</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Active
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. STATS BANNER (Full width dark band from your mockup) */}
      <section className="w-full bg-[#0f172a] text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                2,841
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Items Reported
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                1,693
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Successful Recoveries
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                24
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Campus Locations
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-purple-400 tracking-tight">
                91%
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Match Accuracy
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

// Placeholder Page Views
function BrowsePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Browse Campus Items</h2>
      <p className="text-slate-500 text-sm">Item list and category filter cards coming in Day 11!</p>
    </div>
  )
}

function ReportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Report Lost or Found Item</h2>
      <p className="text-slate-500 text-sm">Photo upload and reporting form coming in Day 12!</p>
    </div>
  )
}

function AlertsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">My Alerts & Activity</h2>
      <p className="text-slate-500 text-sm">Notifications and claim statuses will appear here.</p>
    </div>
  )
}

function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Student Profile</h2>
      <p className="text-slate-500 text-sm">Manage your registered items and account info.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<BrowsePage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}