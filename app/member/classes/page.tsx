'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, Users, CheckCircle, XCircle, LogOut } from 'lucide-react';

interface ClassData {
  id: string;
  name: string;
  description: string;
  trainerId: string;
  date: string;
  startTime: string;
  endTime: string;
  capacity: number;
  enrolledMembers: string[];
  waitlist: string[];
  checkedInMembers: string[];
  status: string;
}

interface TrainerData {
  id: string;
  firstName: string;
  lastName: string;
  specialization: string;
}

export default function MemberClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<ClassData[]>([]);
  const [trainers, setTrainers] = useState<Record<string, TrainerData>>({});
  const [memberId, setMemberId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('memberId');
    if (!id) {
      router.push('/member/login');
      return;
    }
    setMemberId(id);
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const [classesRes, trainersRes] = await Promise.all([
        fetch('/api/classes'),
        fetch('/api/trainers'),
      ]);

      const classesData = await classesRes.json();
      const trainersData = await trainersRes.json();

      // Create trainers map
      const trainersMap: Record<string, TrainerData> = {};
      trainersData.forEach((t: TrainerData) => {
        trainersMap[t.id] = t;
      });

      setTrainers(trainersMap);
      setClasses(classesData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClass = async (classId: string) => {
    if (!memberId) return;

    try {
      const response = await fetch(`/api/classes/${classId}/enroll`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });

      if (response.ok) {
        // Refresh classes
        fetchData();
        alert('Successfully enrolled in class!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to enroll in class');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleCancelClass = async (classId: string) => {
    if (!memberId) return;

    if (!confirm('Are you sure you want to cancel this class?')) return;

    try {
      const response = await fetch(`/api/classes/${classId}/enroll`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });

      if (response.ok) {
        fetchData();
        alert('Successfully cancelled class enrollment!');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to cancel enrollment');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
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

  const upcomingClasses = classes
    .filter(c => {
      const classDate = new Date(`${c.date}T${c.startTime}`);
      return classDate >= new Date() && c.status === 'scheduled';
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return dateA.getTime() - dateB.getTime();
    });

  const isEnrolled = (classId: string) => {
    return memberId ? classes.find(c => c.id === classId)?.enrolledMembers.includes(memberId) : false;
  };

  const isOnWaitlist = (classId: string) => {
    return memberId ? classes.find(c => c.id === classId)?.waitlist.includes(memberId) : false;
  };

  const isFull = (classItem: ClassData) => {
    return classItem.enrolledMembers.length >= classItem.capacity;
  };

  const getWaitlistPosition = (classItem: ClassData) => {
    if (!memberId) return -1;
    return classItem.waitlist.indexOf(memberId) + 1;
  };

  const handleJoinWaitlist = async (classId: string) => {
    if (!memberId) return;

    try {
      const response = await fetch(`/api/classes/${classId}/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });

      if (response.ok) {
        fetchData();
        alert('Added to waitlist! You\'ll be notified if a spot becomes available.');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to join waitlist');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  const handleLeaveWaitlist = async (classId: string) => {
    if (!memberId) return;

    try {
      const response = await fetch(`/api/classes/${classId}/waitlist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memberId }),
      });

      if (response.ok) {
        fetchData();
        alert('Removed from waitlist');
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to leave waitlist');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/member/dashboard" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
                Thrivv
              </Link>
              <p className="text-sm text-gray-600">Browse & Book Classes</p>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Classes</h1>

        {upcomingClasses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No upcoming classes available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map((classItem) => {
              const trainer = trainers[classItem.trainerId];
              const enrolled = isEnrolled(classItem.id);
              const onWaitlist = isOnWaitlist(classItem.id);
              const full = isFull(classItem);
              const waitlistPosition = getWaitlistPosition(classItem);

              return (
                <div
                  key={classItem.id}
                  className={`bg-white rounded-lg shadow p-6 ${
                    enrolled ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {classItem.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {classItem.description}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {trainer && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Trainer:</span> {trainer.firstName} {trainer.lastName}
                        <span className="text-gray-400"> • {trainer.specialization}</span>
                      </div>
                    )}
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(classItem.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {classItem.startTime} - {classItem.endTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {classItem.enrolledMembers.length}/{classItem.capacity} enrolled
                      {classItem.waitlist && classItem.waitlist.length > 0 && (
                        <span className="ml-2 text-orange-600">
                          ({classItem.waitlist.length} on waitlist)
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    {enrolled ? (
                      <div className="space-y-2">
                        <div className="flex items-center text-green-600 text-sm mb-2">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          You&apos;re enrolled
                        </div>
                        <button
                          onClick={() => handleCancelClass(classItem.id)}
                          className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Cancel Enrollment
                        </button>
                      </div>
                    ) : onWaitlist ? (
                      <div className="space-y-2">
                        <div className="text-center text-sm text-orange-600 py-2">
                          On waitlist (Position: {waitlistPosition})
                        </div>
                        <button
                          onClick={() => handleLeaveWaitlist(classItem.id)}
                          className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Leave Waitlist
                        </button>
                      </div>
                    ) : full ? (
                      <div className="space-y-2">
                        <div className="text-center text-sm text-red-600 py-2">
                          Class is full
                        </div>
                        <button
                          onClick={() => handleJoinWaitlist(classItem.id)}
                          className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        >
                          Join Waitlist
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleBookClass(classItem.id)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Book Class
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
