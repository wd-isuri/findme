import React from 'react'
import { Link } from 'react-router-dom'
import { 
  PlusCircle, 
  Compass, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  UploadCloud, 
  Cpu, 
  Lock, 
  ArrowRight, 
  MapPin, 
  Clock, 
  Tag, 
  Sparkles,
  Key,
  Radio,
  Library,
  Building2,
  Headphones
} from 'lucide-react'
import logoImg from '../assets/logo.png'

export default function HomePage() {
  const sampleRecentItems = [
    {
      id: 1,
      title: 'Apple AirPods Pro (2nd Gen)',
      type: 'LOST',
      category: 'Electronics',
      location: 'Science Block - Lab 3',
      date: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&auto=format&fit=crop&q=60',
      description: 'White case with a small scratch on the front lid. Lost during afternoon lecture.'
    },
    {
      id: 2,
      title: 'Student ID Card & Dorm Keycard',
      type: 'FOUND',
      category: 'Cards & Wallets',
      location: 'Hostel B - Ground Floor Cafeteria',
      date: '5 hours ago',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60',
      description: 'Found on the lunch tray return counter with a dark blue lanyard.'
    },
    {
      id: 3,
      title: 'Hydro Flask Metal Water Bottle',
      type: 'FOUND',
      category: 'Personal Belongings',
      location: 'Main Campus Gymnasium',
      date: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60',
      description: 'Teal/mint colored 32oz bottle with university stickers on the side.'
    }
  ]

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Report in 30 Seconds',
      description: 'Lost something or found an item? Post the title, campus location, and a quick photo.',
      icon: UploadCloud,
    },
    {
      step: '02',
      title: 'AI Smart Matching',
      description: 'Our Google Gemini AI engine instantly scans items across hostels and halls to find matches.',
      icon: Cpu,
    },
    {
      step: '03',
      title: 'Anti-Fraud Verification',
      description: 'Claimants must prove ownership by answering the secret detail known only to the real owner.',
      icon: Lock,
    },
    {
      step: '04',
      title: 'Safe Campus Handover',
      description: 'Connect securely and pick up your belonging at the campus security desk or student lounge.',
      icon: CheckCircle2,
    }
  ]

  return (
    <div className="w-full">
      {/* ========================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Amber Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
              AI-Powered Lost & Found
            </div>

            {/* Editorial Serif Headline */}
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#152A2D] tracking-tight leading-[1.15]">
              Lost something? <br />
              <span className="italic font-normal text-[#0C4E55]">We'll find it.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#4A5E61] max-w-xl leading-relaxed">
              FindMe connects students across campus and hostels to recover lost belongings using smart AI matching and instant notifications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
              <Link
                to="/report"
                className="inline-flex items-center justify-center gap-2.5 bg-[#0C4E55] hover:bg-[#07353A] text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-[#0C4E55]/20 transition active:scale-95"
              >
                <PlusCircle className="w-5 h-5" />
                Report a lost item
              </Link>

              <Link
                to="/items"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-[#F3EFE7] text-[#0C4E55] font-semibold px-6 py-3.5 rounded-xl border-2 border-[#0C4E55] shadow-xs transition active:scale-95"
              >
                <Compass className="w-5 h-5 text-[#0C4E55]" />
                I found something
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-2 flex items-center gap-5 text-xs text-[#526B6E] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0C4E55]" /> Free for students
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0C4E55]" /> Private & Verified
              </span>
            </div>

          </div>

          {/* Right Column: Interactive Campus Radar & Hotspots */}
          <div className="lg:col-span-5 relative flex items-center justify-center py-6">
            
            {/* Campus Radar Base Map Card */}
            <div className="w-full max-w-md bg-[#F4F0E8] rounded-3xl p-6 border-2 border-[#EAE5DC] shadow-xl relative overflow-hidden">
              
              {/* Topographic Background Grid Pattern */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#0C4E55 1px, transparent 1px)`,
                  backgroundSize: '20px 20px'
                }}
              ></div>

              {/* Header inside radar card */}
              <div className="flex items-center justify-between relative z-10 mb-4 pb-3 border-b border-[#EAE5DC]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                  <span className="text-xs font-bold text-[#0C4E55] tracking-wide uppercase">
                    Campus Live Radar
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-[#EAE5DC]">
                  24 Locations Active
                </span>
              </div>

              {/* Center Radar Beacon */}
              <div className="relative z-10 flex flex-col items-center justify-center my-6">
                <div className="relative flex items-center justify-center">
                  {/* Expanding Radar Rings */}
                  <div className="absolute w-24 h-24 rounded-full border border-[#0C4E55]/20 animate-ping"></div>
                  <div className="absolute w-36 h-36 rounded-full border border-[#0C4E55]/10"></div>
                  
                  {/* Central Hub Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#0C4E55] text-white flex items-center justify-center shadow-lg shadow-[#0C4E55]/30 relative z-10">
                    <Radio className="w-6 h-6 animate-pulse" />
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0C4E55] mt-2.5">FindMe Hub</span>
                <span className="text-[10px] text-slate-500">Scanning campus perimeter...</span>
              </div>

              {/* HOTSPOT 1: Main Library (Lost iPhone) */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#EAE5DC] shadow-sm hover:shadow-md transition-all mb-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-rose-50 text-rose-600 border border-rose-100">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-rose-500 text-white">
                          LOST
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">
                          Space Gray iPhone 15 Pro
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Library className="w-3 h-3 text-[#0C4E55]" /> Main Library • 2nd Floor
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">2h ago</span>
                </div>
              </div>

              {/* HOTSPOT 2: Hostel B (Found Keys) */}
              <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#EAE5DC] shadow-sm hover:shadow-md transition-all mb-3 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <Key className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold bg-[#0C4E55] text-white">
                          FOUND
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">
                          Dorm Room Keys & Lanyard
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-[#0C4E55]" /> Hostel Block B • Cafeteria
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    At Security
                  </span>
                </div>
              </div>

              {/* HOTSPOT 3: Science Complex (Matched AirPods) */}
              <div className="relative z-10 bg-gradient-to-r from-white to-[#E8F1F2] rounded-xl p-3 border border-[#C5DFE2] shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#0C4E55] text-white">
                      <Headphones className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-extrabold text-[#0C4E55] flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" /> 96% AI MATCH
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">
                          Apple AirPods Pro
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#0C4E55]" /> Science Block • Lab 3
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#0C4E55]">
                    Reunited ✨
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. STATS BANNER */}
      {/* ========================================================= */}
      <section className="w-full bg-[#083A40] text-white py-14 border-y border-[#062B30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">2,841</div>
              <div className="text-xs sm:text-sm text-[#A3D3D8] mt-1.5 font-medium">Items Reported</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">1,693</div>
              <div className="text-xs sm:text-sm text-[#A3D3D8] mt-1.5 font-medium">Successful Recoveries</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">24</div>
              <div className="text-xs sm:text-sm text-[#A3D3D8] mt-1.5 font-medium">Active Universities</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-serif font-bold text-[#FDE68A] tracking-tight">91%</div>
              <div className="text-xs sm:text-sm text-[#A3D3D8] mt-1.5 font-medium">Match Accuracy</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. HOW FINDME WORKS */}
      {/* ========================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0C4E55] bg-[#E8F1F2] px-3.5 py-1.5 rounded-full border border-[#C5DFE2]">
            Simple & Smart Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#152A2D] mt-4 tracking-tight">
            How FindMe Works
          </h2>
          <p className="text-[#526B6E] text-sm sm:text-base mt-2">
            Built specially for students and hostel life to return lost belongings quickly and safely.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorksSteps.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-[#EAE5DC] shadow-xs hover:shadow-md transition-all relative group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E8F1F2] text-[#0C4E55] border border-[#C5DFE2]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-serif font-bold text-slate-300 group-hover:text-[#0C4E55] transition-colors">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#152A2D] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#526B6E] leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. RECENT CAMPUS DISCOVERIES */}
      {/* ========================================================= */}
      <section className="bg-[#F3EFE7]/80 border-t border-[#EAE5DC] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0C4E55] bg-white px-3.5 py-1.5 rounded-full border border-[#C5DFE2]">
                Live Campus Activity
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#152A2D] mt-3 tracking-tight">
                Recent Discoveries
              </h2>
              <p className="text-[#526B6E] text-sm mt-1">
                Items reported across campus in the last 24 hours.
              </p>
            </div>

            <Link
              to="/items"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0C4E55] hover:underline transition"
            >
              <span>View all campus items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleRecentItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#EAE5DC] shadow-xs hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs ${
                        item.type === 'LOST'
                          ? 'bg-[#BE123C] text-white'
                          : 'bg-[#0C4E55] text-white'
                      }`}
                    >
                      {item.type}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="bg-slate-900/75 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" /> {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-[#152A2D] text-base mb-1 line-clamp-1 group-hover:text-[#0C4E55] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#526B6E] mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-[#526B6E]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0C4E55] shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. CAMPUS FOOTER */}
      {/* ========================================================= */}
      <footer className="bg-[#FBF9F5] border-t border-[#EAE5DC] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="FindMe" className="h-9 w-auto" />
              <div>
                <p className="text-xs text-[#526B6E]">
                  Smart Lost & Found System for Universities & Hostels
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
              <Link to="/items" className="hover:text-[#0C4E55] transition">Browse Items</Link>
              <Link to="/report" className="hover:text-[#0C4E55] transition">Report Item</Link>
              <Link to="/profile" className="hover:text-[#0C4E55] transition">Account</Link>
            </div>

            <div className="text-xs text-slate-400">
              © {new Date().getFullYear()} FindMe. Built for students.
            </div>

          </div>
        </div>
      </footer>

    </div>
  )
}