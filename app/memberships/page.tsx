'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react';
import { Membership } from '@/types';

export default function MembershipsPage() {
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const response = await fetch('/api/memberships');
      const data = await response.json();
      setMemberships(data);
    } catch (error) {
      console.error('Failed to fetch memberships:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this membership?')) return;

    try {
      const response = await fetch(`/api/memberships/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMemberships();
      } else {
        alert('Failed to delete membership');
      }
    } catch (error) {
      console.error('Failed to delete membership:', error);
      alert('Failed to delete membership');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading memberships...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Memberships</h1>
          <p className="mt-2 text-gray-600">Manage membership plans and pricing</p>
        </div>
        <Link
          href="/memberships/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Membership
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No memberships found. Add your first membership plan to get started.
          </div>
        ) : (
          memberships.map((membership) => (
            <div
              key={membership.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{membership.name}</h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    membership.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {membership.status}
                </span>
              </div>

              <div className="flex items-baseline mb-4">
                <DollarSign className="w-6 h-6 text-gray-400 mr-1" />
                <span className="text-3xl font-bold text-gray-900">{membership.price}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>

              <p className="text-gray-600 mb-4">{membership.description}</p>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Features:</p>
                <ul className="space-y-1">
                  {membership.features.map((feature, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-sm text-gray-500 mb-4">
                Duration: {membership.duration} days
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <Link
                  href={`/memberships/${membership.id}/edit`}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(membership.id)}
                  className="flex items-center justify-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
