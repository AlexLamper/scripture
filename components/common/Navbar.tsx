// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import Logo from "@/components/common/Logo";
// import {
//     ClerkLoaded,
//     ClerkLoading,
//     SignedIn,
//     SignedOut,
//     SignInButton,
//     SignUpButton,
//     UserButton,
// } from '@clerk/nextjs';
// import GrayButton from '@/components/buttons/BrownButton';
// import { FaBars } from 'react-icons/fa';
// import { usePathname } from 'next/navigation';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Navbar = () => {
//     const pathname = usePathname();
//     const [isOpen, setIsOpen] = useState(false);

//     const toggle = () => {
//         setIsOpen(!isOpen);
//     };

//     const pages = [
//         { name: 'Home', path: '/' },
//         { name: 'About', path: '/about' },
//         { name: 'Notes', path: '/notes' },
//         { name: 'Leaderboard', path: '/leaderboard' },
//     ];

//     const dropdownItems = [
//         { name: 'Chapters', path: '/chapters' },
//         { name: 'Places', path: '/places' },
//         { name: 'Characters', path: '/characters' },
//         { name: 'Events', path: '/events' },
//         { name: 'Themes', path: '/themes' },
//     ];

//     return (
//         <>
//             <div className="w-full h-20 bg-gray-900 shadow-lg sticky top-0 z-20">
//                 <div className="container mx-auto px-4 h-full">
//                     <div className="flex justify-between items-center h-full">
//                         <Logo />
//                         <button
//                             type="button"
//                             className="inline-flex items-center md:hidden text-gray-300"
//                             onClick={toggle}
//                         >
//                             <FaBars size={24} />
//                         </button>
//                         <ul className="hidden md:flex gap-x-6 text-gray-200">
//                             {pages.map((page) => (
//                                 <li key={page.path}>
//                                     <Link href={page.path}>
//                                         <p
//                                             className={`text-gray-300 hover:text-gray-100 transition duration-150 ${
//                                                 pathname === page.path ? 'border-b-2 border-teal-400' : ''
//                                             }`}
//                                         >
//                                             {page.name}
//                                         </p>
//                                     </Link>
//                                 </li>
//                             ))}
//                             <DropdownMenu>
//                                 <DropdownMenuTrigger>
//                                     <p className="text-gray-300 hover:text-gray-100 transition duration-150 cursor-pointer">
//                                         More
//                                     </p>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent>
//                                     <DropdownMenuLabel>Explore</DropdownMenuLabel>
//                                     <DropdownMenuSeparator />
//                                     {dropdownItems.map((item) => (
//                                         <DropdownMenuItem key={item.path}>
//                                             <Link href={item.path}>
//                                                 {item.name}
//                                             </Link>
//                                         </DropdownMenuItem>
//                                     ))}
//                                 </DropdownMenuContent>
//                             </DropdownMenu>
//                         </ul>
//                         {/* Auth Section for Larger Screens */}
//                         <div className="hidden md:flex items-center space-x-4">
//                             <ClerkLoading>
//                                 <div className="h-5 w-5 text-gray-400 animate-spin" />
//                             </ClerkLoading>
//                             <ClerkLoaded>
//                                 <SignedIn>
//                                     <UserButton />
//                                 </SignedIn>
//                                 <SignedOut>
//                                     <SignInButton mode="modal">
//                                         <GrayButton title="Login" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
//                                     </SignInButton>
//                                     <SignUpButton mode="modal">
//                                         <GrayButton title="Sign Up" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
//                                     </SignUpButton>
//                                 </SignedOut>
//                             </ClerkLoaded>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Mobile Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute left-0 right-0 top-20 z-10 bg-gray-800 shadow-lg">
//                     <ul className="flex flex-col items-center text-gray-200 gap-y-4 py-4">
//                         {pages.map((page) => (
//                             <li key={page.path}>
//                                 <Link href={page.path}>
//                                     <p
//                                         className={`text-gray-300 hover:text-gray-100 transition duration-150 ${
//                                             pathname === page.path ? 'border-b-2 border-teal-400' : ''
//                                         }`}
//                                     >
//                                         {page.name}
//                                     </p>
//                                 </Link>
//                             </li>
//                         ))}
//                         <DropdownMenu>
//                             <DropdownMenuTrigger>
//                                 <p className="text-gray-300 hover:text-gray-100 transition duration-150 cursor-pointer">
//                                     More
//                                 </p>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent>
//                                 <DropdownMenuLabel>Explore</DropdownMenuLabel>
//                                 <DropdownMenuSeparator />
//                                 {dropdownItems.map((item) => (
//                                     <DropdownMenuItem key={item.path}>
//                                         <Link href={item.path}>
//                                             {item.name}
//                                         </Link>
//                                     </DropdownMenuItem>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                         <ClerkLoading>
//                             <div className="h-5 w-5 text-gray-400 animate-spin" />
//                         </ClerkLoading>
//                         <ClerkLoaded>
//                             <div className="flex flex-col items-center">
//                                 <SignedIn>
//                                     <UserButton />
//                                 </SignedIn>
//                                 <SignedOut>
//                                     <div className="flex flex-col gap-y-2">
//                                         <SignInButton mode="modal">
//                                             <GrayButton title="Login" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
//                                         </SignInButton>
//                                         <SignUpButton mode="modal">
//                                             <GrayButton title="Sign Up" height="h-[2.8rem] p-4" fontSize="text-[1rem]" />
//                                         </SignUpButton>
//                                     </div>
//                                 </SignedOut>
//                             </div>
//                         </ClerkLoaded>
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Navbar;
