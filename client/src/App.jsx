import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'

// Temporary placeholders for Days 11-13
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