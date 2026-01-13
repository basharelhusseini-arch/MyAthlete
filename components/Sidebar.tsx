'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity,
  Calendar, 
  UserCog,
  Menu,
  LogIn,
  Dumbbell,
  UtensilsCrossed,
  Target,
  Heart,
  Trophy
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Health Statistics', href: '/health', icon: Activity },
  { name: 'Rewards', href: '/member/rewards', icon: Trophy },
  { name: 'Classes', href: '/classes', icon: Calendar },
  { name: 'Trainers', href: '/trainers', icon: UserCog },
  { name: 'Workouts', href: '/workouts', icon: Dumbbell },
  { name: 'Recipes', href: '/recipes', icon: UtensilsCrossed },
  { name: 'Diet Tracker', href: '/nutrition', icon: Heart },
  { name: 'Habit Tracker', href: '/habits', icon: Target },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-black hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 shadow-lg shadow-yellow-500/20"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-yellow-500/20 text-white transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-yellow-500/30">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              MyAthlete
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg shadow-yellow-500/30 font-bold'
                        : 'text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 hover:translate-x-1'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Member Portal Link */}
          <div className="px-4 py-4 border-t border-yellow-500/30">
            <Link
              href="/member/login"
              target="_blank"
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 hover:translate-x-1"
            >
              <LogIn className="w-5 h-5 mr-3" />
              Member Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
