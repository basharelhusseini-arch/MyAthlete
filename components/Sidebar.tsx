'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Activity,
  Calendar, 
  UserCog,
  Menu,
  LogIn,
  LogOut,
  Dumbbell,
  UtensilsCrossed,
  Target,
  Heart,
  Trophy,
  User
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Admin/Trainer navigation
const adminNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Health Statistics', href: '/health', icon: Activity },
  { name: 'Classes', href: '/classes', icon: Calendar },
  { name: 'Trainers', href: '/trainers', icon: UserCog },
  { name: 'Workouts', href: '/workouts', icon: Dumbbell },
  { name: 'Recipes', href: '/recipes', icon: UtensilsCrossed },
  { name: 'Diet Tracker', href: '/nutrition', icon: Heart },
  { name: 'Habit Tracker', href: '/habits', icon: Target },
];

// Member navigation
const memberNavigation = [
  { name: 'Dashboard', href: '/member/dashboard', icon: LayoutDashboard },
  { name: 'My Workouts', href: '/member/workouts', icon: Dumbbell },
  { name: 'My Nutrition', href: '/member/nutrition', icon: UtensilsCrossed },
  { name: 'My Classes', href: '/member/classes', icon: Calendar },
  { name: 'Health Score', href: '/member/health', icon: Activity },
  { name: 'Habits', href: '/member/habits', icon: Target },
  { name: 'Rewards', href: '/member/rewards', icon: Trophy },
  { name: 'Wearables', href: '/member/wearables', icon: Heart },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [memberData, setMemberData] = useState<{ id: string; name: string; email: string } | null>(null);

  // Check if user is logged in
  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    const memberName = localStorage.getItem('memberName');
    const memberEmail = localStorage.getItem('memberEmail');
    
    if (memberId && memberName) {
      setMemberData({
        id: memberId,
        name: memberName,
        email: memberEmail || '',
      });
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    localStorage.removeItem('memberEmail');
    setMemberData(null);
    router.push('/');
  };

  // Determine which navigation to show
  const isInMemberPortal = pathname?.startsWith('/member');
  const navigation = isInMemberPortal || memberData ? memberNavigation : adminNavigation;

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
              Thrivv
            </h1>
          </div>

          {/* Member Info (if logged in) */}
          {memberData && (
            <div className="px-4 py-4 border-b border-yellow-500/30">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-500/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {memberData.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {memberData.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
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

          {/* Footer Actions */}
          <div className="px-4 py-4 border-t border-yellow-500/30">
            {memberData ? (
              // Sign Out Button (when logged in)
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-300 hover:bg-red-500/10 hover:text-red-400 hover:translate-x-1"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            ) : (
              // Member Portal Link (when not logged in, and not already in member portal)
              !isInMemberPortal && (
                <Link
                  href="/member/login"
                  className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400 hover:translate-x-1"
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Member Portal
                </Link>
              )
            )}
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
