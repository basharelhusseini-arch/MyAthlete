'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Activity, Link as LinkIcon, CheckCircle, XCircle, TrendingUp, Zap, Moon, Heart } from 'lucide-react';
import { WhoopConnection, WhoopData } from '@/types';

export default function WhoopIntegrationPage() {
  const router = useRouter();
  const [connection, setConnection] = useState<WhoopConnection | null>(null);
  const [whoopData, setWhoopData] = useState<WhoopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<string | null>(null);

  useEffect(() => {
    const storedMemberId = localStorage.getItem('memberId');
    if (!storedMemberId) {
      router.push('/member/login');
      return;
    }
    setMemberId(storedMemberId);
    fetchConnection(storedMemberId);
    fetchWhoopData(storedMemberId);
  }, [router]);

  const fetchConnection = async (id: string) => {
    try {
      const response = await fetch(`/api/whoop/connection?memberId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setConnection(data.connected ? data : null);
      }
    } catch (error) {
      console.error('Failed to fetch Whoop connection:', error);
    }
  };

  const fetchWhoopData = async (id: string) => {
    try {
      const response = await fetch(`/api/whoop/data?memberId=${id}`);
      if (response.ok) {
        const data = await response.json();
        setWhoopData(data);
      }
    } catch (error) {
      console.error('Failed to fetch Whoop data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async () => {
    // In production, this would redirect to Whoop OAuth
    // For now, show a placeholder message
    alert('Whoop integration: In production, this would redirect to Whoop OAuth to connect your account. This feature requires Whoop API credentials.');
  };

  const handleDisconnect = async () => {
    if (!memberId) return;
    
    if (!confirm('Are you sure you want to disconnect your Whoop account?')) return;

    try {
      const response = await fetch(`/api/whoop/connection?memberId=${memberId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setConnection(null);
        setWhoopData([]);
      } else {
        alert('Failed to disconnect Whoop account');
      }
    } catch (error) {
      console.error('Failed to disconnect Whoop:', error);
      alert('Failed to disconnect Whoop account');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  const latestData = whoopData[0];

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="glass-effect border-b border-gray-800/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/member/dashboard"
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Whoop Integration</h1>
                <p className="text-sm text-gray-400">Connect your Whoop device to track recovery, strain, and sleep</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!connection ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Whoop Device</h3>
            <p className="text-gray-600 mb-6">
              Connect your Whoop account to automatically sync recovery, strain, and sleep data.
              This data will help optimize your training and recovery.
            </p>
            <button
              onClick={handleConnect}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <LinkIcon className="w-5 h-5 mr-2" />
              Connect Whoop Account
            </button>
            <p className="text-xs text-gray-500 mt-4">
              Note: Whoop integration requires API credentials. This is a placeholder for the integration.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Connection Status */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-indigo-100 rounded-lg">
                    <Activity className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Whoop Connected</h3>
                    <p className="text-sm text-gray-600">
                      Last synced: {connection.lastSyncedAt ? new Date(connection.lastSyncedAt).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>

            {/* Latest Data */}
            {latestData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {latestData.recovery !== undefined && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <h4 className="font-semibold text-gray-900">Recovery</h4>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{latestData.recovery}%</div>
                    <p className="text-sm text-gray-600">Today&apos;s recovery score</p>
                  </div>
                )}

                {latestData.strain !== undefined && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Zap className="w-5 h-5 text-orange-500" />
                        <h4 className="font-semibold text-gray-900">Strain</h4>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{latestData.strain}</div>
                    <p className="text-sm text-gray-600">Today&apos;s strain score</p>
                  </div>
                )}

                {latestData.sleep && (
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Moon className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold text-gray-900">Sleep</h4>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {Math.round(latestData.sleep.totalSleep / 60)}h {latestData.sleep.totalSleep % 60}m
                    </div>
                    <p className="text-sm text-gray-600">Last night&apos;s sleep</p>
                  </div>
                )}
              </div>
            )}

            {!latestData && (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Available</h3>
                <p className="text-gray-600">
                  Your Whoop data will appear here once synced. Data syncs automatically when connected.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
