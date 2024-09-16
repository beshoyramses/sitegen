"use client";

import React from 'react';
import { SIDEBARLINKS } from '../lib/constants'; // Import your SIDEBARLINKS
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const { user } = useUser();
  const pathname = usePathname(); // Get the current route

  return (
    <div className="sidebar bg-gray-900 text-white w-48 p-4 custom-border">
      <div className='flex items-center gap-4 mb-8'>
        <UserButton />
        <h3>Welcome, {user?.firstName} {user?.lastName}!</h3>
      </div>
      <ul className="space-y-4">
        {SIDEBARLINKS.map((link, index) => (
          <li 
            key={index} 
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer 
            hover:bg-gray-700 ${pathname === link.route ? 'bg-gray-700' : ''}`}
          >
            <span>{link.icon}</span>
            <a href={link.route} className={`text-lg ${pathname === link.route ? 'font-bold' : ''}`}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
