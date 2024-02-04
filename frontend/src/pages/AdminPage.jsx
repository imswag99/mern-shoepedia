import React from 'react'
import AdminDashboard from '../components/AdminDashboard'
import { Outlet } from 'react-router-dom'

const AdminPage = () => {
  return (
    <div className='flex min-h-screen'>
      <AdminDashboard />
      <Outlet />
    </div>
  )
}

export default AdminPage