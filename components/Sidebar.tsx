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
  User,
  ChefHat
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Admin/Trainer navigation
const adminNavigation = [
  { name: 'Dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Health Statistics', label: 'Health', href: '/health', icon: Activity },
  { name: 'Classes', label: 'Classes', href: '/classes', icon: Calendar },
  { name: 'Trainers', label: 'Trainers', href: '/trainers', icon: UserCog },
  { name: 'Workouts', label: 'Workouts', href: '/workouts', icon: Dumbbell },
  { name: 'Recipes', label: 'Recipes', href: '/recipes', icon: UtensilsCrossed },
  { name: 'Diet Tracker', label: 'Nutrition', href: '/nutrition', icon: Heart },
  { name: 'Habit Tracker', label: 'Habits', href: '/habits', icon: Target },
];

// Member navigation
const memberNavigation = [
  { name: 'Dashboard', label: 'Dashboard', href: '/member/dashboard', icon: LayoutDashboard },
  { name: 'My Workouts', label: 'Workouts', href: '/member/workouts', icon: Dumbbell },
  { name: 'My Nutrition', label: 'Nutrition', href: '/member/nutrition', icon: UtensilsCrossed },
  { name: 'Recipes', label: 'Recipes', href: '/member/recipes', icon: ChefHat },
  { name: 'My Classes', label: 'Classes', href: '/member/classes', icon: Calendar },
  { name: 'Health Score', label: 'Health', href: '/member/health', icon: Activity },
  { name: 'Habits', label: 'Habits', href: '/member/habits', icon: Target },
  { name: 'Rewards', label: 'Rewards', href: '/member/rewards', icon: Trophy },
  { name: 'Wearables', label: 'Wearables', href: '/member/wearables', icon: Heart },
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
          fixed inset-y-0 left-0 z-40 w-24 lg:w-24 bg-thrivv-bg-darker border-r border-thrivv-gold-500/10 text-white transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 px-3 border-b border-thrivv-gold-500/10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 flex items-center justify-center font-bold text-black text-lg">
              T
            </div>
          </div>

          {/* Member Avatar (if logged in) */}
          {memberData && (
            <div className="px-3 py-4 border-b border-thrivv-gold-500/10">
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 flex items-center justify-center transition-all duration-200 hover:scale-105 glow-gold">
                <User className="w-5 h-5 text-black" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-2 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              const displayLabel = item.label;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-300 relative group
                    ${
                      isActive
                        ? 'bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 glow-gold'
                        : 'hover:bg-thrivv-gold-500/10'
                    }
                  `}
                >
                  <Icon 
                    className={`w-5 h-5 mb-1.5 transition-colors duration-300 ${
                      isActive
                        ? 'text-black'
                        : 'text-thrivv-text-secondary group-hover:text-thrivv-gold-500'
                    }`}
                  />
                  <span 
                    className={`text-xs font-medium text-center leading-tight truncate w-full transition-colors duration-300 ${
                      isActive
                        ? 'text-black'
                        : 'text-thrivv-text-muted group-hover:text-thrivv-gold-500'
                    }`}
                  >
                    {displayLabel}
                  </span>
                  {isActive && (
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-10 bg-thrivv-gold-500 rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="px-2 py-4 border-t border-thrivv-gold-500/10">
            {memberData ? (
              // Sign Out Button (when logged in)
              <button
                onClick={handleLogout}
                className="w-full flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 text-thrivv-text-secondary hover:text-red-400 hover:bg-red-500/10 group"
              >
                <LogOut className="w-5 h-5 mb-1.5" />
                <span className="text-xs font-medium">Sign Out</span>
              </button>
            ) : (
              // Member Portal Link (when not logged in, and not already in member portal)
              !isInMemberPortal && (
                <Link
                  href="/member/login"
                  className="w-full flex flex-col items-center justify-center py-3 rounded-xl transition-all duration-300 text-thrivv-text-secondary hover:text-thrivv-gold-500 hover:bg-thrivv-gold-500/10 group"
                >
                  <LogIn className="w-5 h-5 mb-1.5" />
                  <span className="text-xs font-medium">Sign In</span>
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
