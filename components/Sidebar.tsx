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
  { name: 'Recipes', href: '/member/recipes', icon: ChefHat },
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
          fixed inset-y-0 left-0 z-40 w-20 lg:w-20 bg-thrivv-bg-darker border-r border-thrivv-gold-500/10 text-white transform transition-all duration-300 ease-in-out
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
          <nav className="flex-1 px-3 py-6 space-y-3 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-300 relative
                      ${
                        isActive
                          ? 'bg-gradient-to-br from-thrivv-gold-500 to-thrivv-amber-500 text-black glow-gold'
                          : 'text-thrivv-text-secondary hover:text-thrivv-gold-500 hover:bg-thrivv-gold-500/10'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-thrivv-gold-500 rounded-r-full" />
                    )}
                  </Link>
                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-4 px-3 py-2 bg-thrivv-bg-card border border-thrivv-gold-500/20 rounded-lg text-sm text-thrivv-text-primary whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-50 top-1/2 -translate-y-1/2">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="px-3 py-4 border-t border-thrivv-gold-500/10">
            {memberData ? (
              // Sign Out Button (when logged in)
              <button
                onClick={handleLogout}
                className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 text-thrivv-text-secondary hover:text-red-400 hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              // Member Portal Link (when not logged in, and not already in member portal)
              !isInMemberPortal && (
                <Link
                  href="/member/login"
                  className="w-14 h-14 flex items-center justify-center rounded-xl transition-all duration-300 text-thrivv-text-secondary hover:text-thrivv-gold-500 hover:bg-thrivv-gold-500/10"
                >
                  <LogIn className="w-5 h-5" />
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
