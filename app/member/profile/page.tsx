'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Mail, Phone, Calendar, CreditCard, LogOut } from 'lucide-react';

interface MemberData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  membershipId: string | null;
  status: string;
}

interface MembershipData {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  features: string[];
}

export default function MemberProfilePage() {
  const router = useRouter();
  const [member, setMember] = useState<MemberData | null>(null);
  const [membership, setMembership] = useState<MembershipData | null>(null);
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
      const memberRes = await fetch(`/api/members/${memberId}`);
      const memberData = await memberRes.json();
      setMember(memberData);

      if (memberData.membershipId) {
        const membershipRes = await fetch(`/api/memberships/${memberData.membershipId}`);
        const membershipData = await membershipRes.json();
        setMembership(membershipData);
      }
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

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

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
              <p className="text-sm text-gray-600">My Profile</p>
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
            <h1 className="text-2xl font-bold text-gray-900">Profile Information</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <User className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="text-gray-900 font-medium">
                      {member.firstName} {member.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-900 font-medium">{member.email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-900 font-medium">{member.phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="text-gray-900 font-medium">
                      {new Date(member.dateOfBirth).toLocaleDateString()} (Age: {calculateAge(member.dateOfBirth)})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Membership Information */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership</h2>
              {membership ? (
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center mb-2">
                        <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-xl font-bold text-gray-900">{membership.name}</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{membership.description}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${membership.price.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500">/month</span>
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 capitalize">
                      {member.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Features Included:</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {membership.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">No active membership</p>
                </div>
              )}
            </div>

            {/* Account Information */}
            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(member.joinDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Account Status</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    member.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : member.status === 'suspended'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {member.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
