'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Mail, Phone, Award } from 'lucide-react';
import { Trainer } from '@/types';

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await fetch('/api/trainers');
      const data = await response.json();
      setTrainers(data);
    } catch (error) {
      console.error('Failed to fetch trainers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this trainer?')) return;

    try {
      const response = await fetch(`/api/trainers/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTrainers();
      } else {
        alert('Failed to delete trainer');
      }
    } catch (error) {
      console.error('Failed to delete trainer:', error);
      alert('Failed to delete trainer');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading trainers...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainers</h1>
          <p className="mt-2 text-gray-600">Manage your fitness trainers</p>
        </div>
        <Link
          href="/trainers/new"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Trainer
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No trainers found. Add your first trainer to get started.
          </div>
        ) : (
          trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {trainer.firstName} {trainer.lastName}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    trainer.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {trainer.status}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Award className="w-4 h-4 mr-2" />
                  <span className="font-medium">Specialization:</span>
                  <span className="ml-2">{trainer.specialization}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  {trainer.email}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  {trainer.phone}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Hired: {new Date(trainer.hireDate).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                <Link
                  href={`/trainers/${trainer.id}/edit`}
                  className="flex-1 flex items-center justify-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(trainer.id)}
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
