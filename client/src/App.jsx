import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import HomePage from './pages/HomePage.jsx'
import BrowseItems from "./pages/BrowseItems.jsx";
import ItemDetails from "./pages/ItemDetails.jsx";
import ReportLostItem from "./pages/ReportLostItem.jsx";

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
          <Route path="/items" element={<BrowseItems />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/report" element={<ReportLostItem />} />
          <Route path="/report/lost" element={<ReportLostItem />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}