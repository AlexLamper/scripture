'use client';

import Link from 'next/link';
// import { SignedIn } from "@clerk/nextjs";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { MdHome, MdInfo, MdPlace, MdLeaderboard, MdPerson4, MdEventNote } from 'react-icons/md';
import { FaQuestionCircle, FaBookOpen, FaMap } from 'react-icons/fa';
import { FaAffiliatetheme } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen] = useState(false);
  const pathname = usePathname();

  return (
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-black bg-opacity-5 dark:bg-white dark:bg-opacity-5 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 max-h-full`}>
        <nav className="p-8 h-full overflow-y-auto">
          <ul>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdHome size={23} className="mr-2" />
                Home
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/map' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <FaMap size={20} className="mr-2" />
                Map
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map/chapters') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map/chapters" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <FaBookOpen size={20} className="mr-2" />
                Chapters
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map/places') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map/places" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdPlace size={20} className="mr-2" />
                Places
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map/characters') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map/characters" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdPerson4 size={20} className="mr-2" />
                Characters
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map/events') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map/events" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdEventNote size={20} className="mr-2" />
                Events
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname.startsWith('/map/themes') ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/map/themes" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <FaAffiliatetheme size={20} className="mr-2" />
                Themes
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/leaderboard' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/leaderboard" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdLeaderboard size={20} className="mr-2" />
                Leaderboard
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/about' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/about" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <MdInfo size={20} className="mr-2" />
                About
              </Link>
            </li>
            <li className={`mb-4 flex items-center cursor-pointer ${pathname === '/help' ? 'bg-[#A67B5B] text-white dark:bg-[#A67B5B] rounded-[0.4rem]' : ''}`}>
              <Link href="/help" className="flex items-center w-full px-4 py-2 rounded font-medium hover:bg-opacity-10 transition-colors duration-200">
                <FaQuestionCircle size={20} className="mr-2" />
                Help
              </Link>
            </li>
          </ul>
        </nav>
      </div>
  );
};

export default Sidebar;
