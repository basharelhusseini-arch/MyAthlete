import { Users, CreditCard, Calendar, UserCog, TrendingUp, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { store } from '@/lib/store';

export default function DashboardPage() {
  const members = store.getAllMembers();
  const memberships = store.getAllMemberships();
  const classes = store.getAllClasses();
  const trainers = store.getAllTrainers();

  const activeMembers = members.filter(m => m.status === 'active').length;
  const upcomingClasses = classes.filter(c => c.status === 'scheduled' && new Date(c.date) >= new Date()).length;
  const monthlyRevenue = memberships.reduce((sum, membership) => {
    const memberCount = members.filter(m => m.membershipId === membership.id && m.status === 'active').length;
    return sum + (membership.price * memberCount);
  }, 0);

  const stats = [
    {
      name: 'Total Members',
      value: members.length,
      icon: Users,
      color: 'bg-blue-500',
      href: '/members',
    },
    {
      name: 'Active Members',
      value: activeMembers,
      icon: TrendingUp,
      color: 'bg-green-500',
      href: '/members',
    },
    {
      name: 'Memberships',
      value: memberships.length,
      icon: CreditCard,
      color: 'bg-purple-500',
      href: '/memberships',
    },
    {
      name: 'Upcoming Classes',
      value: upcomingClasses,
      icon: Calendar,
      color: 'bg-orange-500',
      href: '/classes',
    },
    {
      name: 'Trainers',
      value: trainers.filter(t => t.status === 'active').length,
      icon: UserCog,
      color: 'bg-pink-500',
      href: '/trainers',
    },
    {
      name: 'Monthly Revenue',
      value: `$${monthlyRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-emerald-500',
      href: '/memberships',
    },
  ];

  const recentMembers = members.slice(-5).reverse();
  const upcomingClassList = classes
    .filter(c => c.status === 'scheduled' && new Date(c.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome to your Gym CRM</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Members */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Members</h2>
          </div>
          <div className="p-6">
            {recentMembers.length > 0 ? (
              <ul className="space-y-4">
                {recentMembers.map((member) => (
                  <li key={member.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : member.status === 'suspended'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {member.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No members yet</p>
            )}
            <div className="mt-6">
              <Link
                href="/members"
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Members
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Classes</h2>
          </div>
          <div className="p-6">
            {upcomingClassList.length > 0 ? (
              <ul className="space-y-4">
                {upcomingClassList.map((gymClass) => {
                  const trainer = trainers.find(t => t.id === gymClass.trainerId);
                  const trainerName = trainer
                    ? `${trainer.firstName} ${trainer.lastName}`
                    : 'Unknown Trainer';
                  return (
                    <li key={gymClass.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{gymClass.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(gymClass.date).toLocaleDateString()} at {gymClass.startTime} - {trainerName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {gymClass.enrolledMembers.length}/{gymClass.capacity} enrolled
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                        {gymClass.status}
                      </span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming classes</p>
            )}
            <div className="mt-6">
              <Link
                href="/classes"
                className="block text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                View All Classes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
