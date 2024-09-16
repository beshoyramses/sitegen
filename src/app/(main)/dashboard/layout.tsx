import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
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
