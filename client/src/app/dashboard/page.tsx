"use client";

import { useEffect, useState } from 'react';
import { getUserSession } from '../lib/auth';
import { fetchUserProfile } from '../services/userService';
import { setUserSession } from '../lib/auth';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if we have user in localStorage
        const sessionUser = getUserSession();
        
        if (sessionUser) {
          setUser(sessionUser);
          setLoading(false);
          return;
        }
        
        // If not, try to fetch using token
        const token = localStorage.getItem('authToken');
        if (token) {
          const userData = await fetchUserProfile(token);
          setUser(userData);
          setUserSession(userData);
        }
        
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md text-center">
          <h2 className="text-xl font-bold mb-2">Not Authenticated</h2>
          <p>Please log in to access the dashboard.</p>
          <a 
            href="/login" 
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <div className="flex items-center">
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full mr-4"
                />
              ) : (
                <div className="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 mr-4 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome, {user.name}!
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">Full Name</h4>
                  <p className="mt-1 text-gray-900">{user.name}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="text-sm font-medium text-gray-500">Email Address</h4>
                  <p className="mt-1 text-gray-900">{user.email}</p>
                </div>
                {user.phone && (
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-500">Phone Number</h4>
                    <p className="mt-1 text-gray-900">{user.phone}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => {
                  localStorage.removeItem('authToken');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}