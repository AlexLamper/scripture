'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  MdHome, MdInfo, MdPlace, MdLeaderboard, MdPerson4, MdEventNote 
} from 'react-icons/md';
import { FaQuestionCircle, FaBookOpen, FaMap, FaAffiliatetheme } from 'react-icons/fa';

// Protected route matcher logic
const isProtectedRoute = (pathname: string) => {
  const protectedPaths = [
    '/home',
    '/api',
    '/chapters',
    '/characters',
    '/dashboard',
    '/events',
    '/leaderboard',
    '/notes',
    '/places',
    '/progress',
    '/settings',
    '/teachings',
    '/themes',
  ];

  return protectedPaths.some((route) => pathname.startsWith(route));
};

const Sidebar = () => {
  const [isOpen] = useState(false);
  const pathname = usePathname();

  // Check if the current route is protected
  if (!isProtectedRoute(pathname)) {
    return null; // Don't render the sidebar on public routes
  }

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 max-h-full`}>
      <nav className="p-8 h-full overflow-y-auto">
        <ul>
          <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/home' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
            <Link href="/home" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
              <MdHome size={23} className="mr-2" />
              Home
            </Link>
          </li>
          <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
            <Link href="/map" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
              <FaMap size={20} className="mr-2" />
              Map
            </Link>
          </li>
          {/* Add more sidebar links based on protected routes */}
          <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/chapters') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
            <Link href="/chapters" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
              <FaBookOpen size={20} className="mr-2" />
              Chapters
            </Link>
          </li>
          <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/places') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
            <Link href="/places" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
              <MdPlace size={20} className="mr-2" />
              Places
            </Link>
          </li>
          <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/characters') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
            <Link href="/characters" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
              <MdPerson4 size={20} className="mr-2" />
              Characters
            </Link>
          </li>
          {/* Add other links */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
