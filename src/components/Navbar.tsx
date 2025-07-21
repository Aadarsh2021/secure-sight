'use client';

import Image from 'next/image';
import Link from 'next/link';
import { 
  Squares2X2Icon as ViewGridIcon,
  VideoCameraIcon,
  FilmIcon,
  ExclamationTriangleIcon as ExclamationIcon,
  UsersIcon as UserGroupIcon
} from '@heroicons/react/24/solid';

const navItems = [
  { 
    icon: <ViewGridIcon className="w-5 h-5" />, 
    label: 'Dashboard', 
    href: '/', 
    active: true 
  },
  { 
    icon: <VideoCameraIcon className="w-5 h-5" />, 
    label: 'Cameras', 
    href: '/cameras' 
  },
  { 
    icon: <FilmIcon className="w-5 h-5" />, 
    label: 'Scenes', 
    href: '/scenes' 
  },
  { 
    icon: <ExclamationIcon className="w-5 h-5" />, 
    label: 'Incidents', 
    href: '/incidents' 
  },
  { 
    icon: <UserGroupIcon className="w-5 h-5" />, 
    label: 'Users', 
    href: '/users' 
  }
];

export default function Navbar() {
  return (
    <nav className="bg-[#1A1A1A] border-b border-[#333]">
      <div className="px-4">
        <div className="flex items-center h-14 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">MANDLACX</span>
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center space-x-2 px-4 h-14 border-x border-[#333] ${
                  item.active 
                    ? 'bg-[#333] text-white' 
                    : 'text-gray-400 hover:bg-[#222] hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3 text-right">
            <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
              <Image
                src="/avatar.jpg"
                alt="User avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-medium">Mohammed Ajhas</span>
              <span className="text-xs text-gray-400">ajhas@mandlac.com</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 