'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Calendar, Clock, Users } from 'lucide-react';
import { GymClass } from '@/types';

export default function ClassesPage() {
  const [classes, setClasses] = useState<GymClass[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('/api/classes');
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error('Failed to fetch classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortedClasses = [...classes].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateA.getTime() - dateB.getTime();
  });

  const upcomingClasses = sortedClasses.filter(c => {
    const classDate = new Date(`${c.date}T${c.startTime}`);
    return classDate >= new Date() && c.status === 'scheduled';
  });

  const pastClasses = sortedClasses.filter(c => {
    const classDate = new Date(`${c.date}T${c.startTime}`);
    return classDate < new Date() || c.status === 'completed';
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading classes...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Classes</h1>
          <p className="mt-2 text-gray-400">Schedule and manage fitness classes</p>
        </div>
        <Link
          href="/classes/new"
          className="flex items-center px-4 py-2 btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Schedule Class
        </Link>
      </div>

      {/* Upcoming Classes */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Upcoming Classes</h2>
        {upcomingClasses.length === 0 ? (
          <div className="glass-effect p-8 text-center text-gray-400">
            No upcoming classes scheduled
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingClasses.map((gymClass) => (
              <div
                key={gymClass.id}
                className="dark-card card-hover p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white">{gymClass.name}</h3>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      gymClass.status === 'scheduled'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : gymClass.status === 'completed'
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {gymClass.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-4 text-sm">{gymClass.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-white">
                      {new Date(gymClass.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-white">{gymClass.startTime} - {gymClass.endTime}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-white">{gymClass.enrolledMembers.length}/{gymClass.capacity} enrolled</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-yellow-500/20">
                  <Link
                    href={`/classes/${gymClass.id}`}
                    className="block text-center px-4 py-2 btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Classes */}
      {pastClasses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Past Classes</h2>
          <div className="glass-effect overflow-hidden">
            <table className="min-w-full divide-y divide-yellow-500/20">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Class Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Attendance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-yellow-500/10">
                {pastClasses.slice(0, 10).map((gymClass) => (
                  <tr key={gymClass.id} className="hover:bg-yellow-500/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {gymClass.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {new Date(gymClass.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {gymClass.startTime} - {gymClass.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {gymClass.enrolledMembers.length}/{gymClass.capacity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          gymClass.status === 'completed'
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {gymClass.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
