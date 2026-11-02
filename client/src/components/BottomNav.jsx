import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, Compass, Plus, Bell, User } from 'lucide-react'

export default function BottomNav() {
  const navItems = [
    { name: 'Home', to: '/', icon: Home },
    { name: 'Browse', to: '/items', icon: Compass },
    { name: 'Report', to: '/report', icon: Plus, isAction: true },
    { name: 'Alerts', to: '/alerts', icon: Bell },
    { name: 'Profile', to: '/profile', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#FBF9F5]/95 backdrop-blur-md border-t border-[#EAE5DC] px-3 py-2 md:hidden shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon

          // Center floating button
          if (item.isAction) {
            return (
              <NavLink
                key={item.name}
                to={item.to}
                className="flex flex-col items-center -mt-6 group focus:outline-none"
              >
                <div className="w-12 h-12 rounded-full bg-[#0C4E55] text-white flex items-center justify-center shadow-lg shadow-[#0C4E55]/30 group-active:scale-95 transition-all">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[11px] font-semibold text-[#0C4E55] mt-1">
                  {item.name}
                </span>
              </NavLink>
            )
          }

          // Normal tabs
          return (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center py-1 px-2 text-xs transition-colors focus:outline-none ${
                  isActive
                    ? 'text-[#0C4E55] font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={`w-5 h-5 mb-0.5 transition-transform ${
                      isActive ? 'stroke-[2.5] scale-110' : 'stroke-[1.75]'
                    }`}
                  />
                  <span>{item.name}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}