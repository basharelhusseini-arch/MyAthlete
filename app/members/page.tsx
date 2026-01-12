'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Member } from '@/types';

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/members');
      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const response = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMembers();
      } else {
        alert('Failed to delete member');
      }
    } catch (error) {
      console.error('Failed to delete member:', error);
      alert('Failed to delete member');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Members</h1>
          <p className="mt-2 text-gray-400">Manage all gym members</p>
        </div>
        <Link
          href="/members/new"
          className="flex items-center px-4 py-2 btn-primary"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Member
        </Link>
      </div>

      <div className="dark-card overflow-hidden">
        <table className="min-w-full divide-y divide-gray-800/50">
          <thead className="bg-gray-900/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Join Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50">
            {members.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                  No members found. Add your first member to get started.
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <tr key={member.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">
                      {member.firstName} {member.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{member.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full border ${
                        member.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : member.status === 'suspended'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        href={`/members/${member.id}`}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Eye className="w-5 h-5" />
                      </Link>
                      <Link
                        href={`/members/${member.id}/edit`}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
