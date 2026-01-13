'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Bell, Mail, Calendar, DollarSign, User, LogOut, CheckCircle } from 'lucide-react';

interface Notification {
  id: string;
  memberId: string;
  type: 'class_reminder' | 'class_cancelled' | 'payment_receipt' | 'membership_expiring' | 'welcome';
  subject: string;
  body: string;
  sent: boolean;
  sentAt?: string;
  createdAt: string;
}

export default function MemberNotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const memberId = localStorage.getItem('memberId');
    if (!memberId) {
      router.push('/member/login');
      return;
    }

    fetchNotifications(memberId);
  }, [router]);

  const fetchNotifications = async (memberId: string) => {
    try {
      const response = await fetch(`/api/member/notifications?memberId=${memberId}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('memberId');
    localStorage.removeItem('memberName');
    router.push('/member/login');
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'class_reminder':
      case 'class_cancelled':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'payment_receipt':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'membership_expiring':
        return <User className="w-5 h-5 text-orange-500" />;
      default:
        return <Mail className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/member/dashboard" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                Thriv
              </Link>
              <p className="text-sm text-gray-600">Notifications</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="text-gray-700 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>

          <div className="p-6">
            {notifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No notifications</p>
                <p className="text-gray-400 text-sm">You&apos;re all caught up!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                              {notification.subject}
                            </h3>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.body}
                            </p>
                            <p className="mt-2 text-xs text-gray-400">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                          </div>
                          {notification.sent && (
                            <div className="flex items-center text-green-600 text-xs">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Sent
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
