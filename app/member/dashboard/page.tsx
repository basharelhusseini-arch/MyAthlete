'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Users, CreditCard, LogOut, User, BookOpen, CheckCircle, Bell, DollarSign, Dumbbell, UtensilsCrossed } from 'lucide-react';

interface MemberData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipId: string | null;
  status: string;
  completedSessions: number;
}

interface MembershipData {
  id: string;
  name: string;
  price: number;
  features: string[];
}

interface ClassData {
  id: string;
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolledMembers: string[];
  checkedInMembers: string[];
  waitlist: string[];
  status: string;
}

export default function MemberDashboardPage() {
  const router = useRouter();
  const [member, setMember] = useState<MemberData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
  const [upcomingClasses, setUpcomingClasses] = useState<ClassData[]>([]);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      router.push('/member/login');
      return;
    }

    fetchMemberData(memberId);
  }, [router]);

  const fetchMemberData = async (memberId: string) => {
    try {
      // Fetch member data
      const memberRes = await fetch(`/api/members/${memberId}`);
      const memberData = await memberRes.json();
      setMember(memberData);
      setCompletedSessions(memberData.completedSessions || 0);

      // Fetch session count
      const sessionsRes = await fetch(`/api/member/${memberId}/sessions`);
      const sessionsData = await sessionsRes.json();
      setCompletedSessions(sessionsData.completedSessions || 0);

      // Fetch membership if exists
      if (memberData.membershipId) {
        const membershipRes = await fetch(`/api/memberships/${memberData.membershipId}`);
        const membershipData = await membershipRes.json();
        setMembership(membershipData);
      }

      // Fetch all classes and filter enrolled ones
      const classesRes = await fetch('/api/classes');
      const allClasses = await classesRes.json();
      const enrolled = allClasses.filter((c: ClassData) => 
        c.enrolledMembers.includes(memberId) && 
        c.status === 'scheduled' &&
        new Date(`${c.date}T${c.startTime}`) >= new Date()
      );
      setUpcomingClasses(enrolled);
    } catch (error) {
      console.error('Failed to fetch member data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    router.push('/member/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!member) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">MyAthlete</h1>
              <p className="text-sm text-gray-600">Welcome back, {member.firstName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed Sessions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {completedSessions}
                </p>
                <p className="text-xs text-gray-500 mt-1">Keep it up!</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">My Membership</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {membership ? membership.name : 'None'}
                </p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming Classes</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {upcomingClasses.length}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Account Status</p>
                <p className="text-2xl font-bold text-gray-900 mt-1 capitalize">
                  {member.status}
                </p>
              </div>
              <User className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Classes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">My Upcoming Classes</h2>
                <Link
                  href="/member/classes"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="p-6">
                {upcomingClasses.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">No upcoming classes</p>
                    <Link
                      href="/member/classes"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Browse Classes
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingClasses.map((classItem) => {
                      const isCheckedIn = classItem.checkedInMembers?.includes(member?.id || '');
                      const canCheckIn = new Date(`${classItem.date}T${classItem.startTime}`) <= new Date() && 
                                        !isCheckedIn && 
                                        classItem.enrolledMembers.includes(member?.id || '');
                      
                      return (
                        <div
                          key={classItem.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {classItem.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {classItem.description}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />
                                  {new Date(classItem.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {classItem.startTime} - {classItem.endTime}
                                </div>
                                <div className="flex items-center">
                                  <Users className="w-4 h-4 mr-1" />
                                  {classItem.enrolledMembers.length}/{classItem.capacity}
                                </div>
                              </div>
                              {isCheckedIn && (
                                <div className="flex items-center text-green-600 text-sm">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Checked in
                                </div>
                              )}
                              {canCheckIn && (
                                <button
                                  onClick={async () => {
                                    try {
                                      const res = await fetch(`/api/classes/${classItem.id}/checkin`, {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ memberId: member?.id }),
                                      });
                                      if (res.ok) {
                                        const data = await res.json();
                                        setCompletedSessions(data.sessionsCompleted);
                                        fetchMemberData(member?.id || '');
                                        alert('Successfully checked in!');
                                      }
                                    } catch (error) {
                                      alert('Failed to check in');
                                    }
                                  }}
                                  className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                                >
                                  Check In
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Membership Info & Quick Links */}
          <div className="space-y-6">
            {/* Membership Card */}
            {membership && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">My Membership</h2>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-gray-900">{membership.name}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      ${membership.price.toFixed(2)}
                      <span className="text-sm font-normal text-gray-500">/month</span>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Features:</p>
                    <ul className="space-y-1">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Links */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Quick Links</h2>
              </div>
              <div className="p-6 space-y-3">
                <Link
                  href="/member/classes"
                  className="block w-full text-left px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <BookOpen className="w-5 h-5 inline mr-2" />
                  Browse & Book Classes
                </Link>
                <Link
                  href="/member/profile"
                  className="block w-full text-left px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-5 h-5 inline mr-2" />
                  My Profile
                </Link>
                <Link
                  href="/member/payments"
                  className="block w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <DollarSign className="w-5 h-5 inline mr-2" />
                  Payments
                </Link>
                <Link
                  href="/member/notifications"
                  className="block w-full text-left px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <Bell className="w-5 h-5 inline mr-2" />
                  Notifications
                </Link>
                <Link
                  href="/member/workouts"
                  className="block w-full text-left px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <Dumbbell className="w-5 h-5 inline mr-2" />
                  My Workouts
                </Link>
                <Link
                  href="/member/nutrition"
                  className="block w-full text-left px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <UtensilsCrossed className="w-5 h-5 inline mr-2" />
                  My Nutrition
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
