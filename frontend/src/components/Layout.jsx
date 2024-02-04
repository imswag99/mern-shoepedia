import React from 'react'
import Dashboard from './Dashboard';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex min-h-screen'>
      <Dashboard />
      <Outlet />
    </div>
  )
}

export default Layout