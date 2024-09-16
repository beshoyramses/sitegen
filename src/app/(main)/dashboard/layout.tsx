import Sidebar from '@/components/Sidebar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className="flex md:gap-[25px]">
      <Sidebar />
      <div className="pt-4 w-full">
        {children}
      </div>
    </div>
  )
}

export default Layout;
