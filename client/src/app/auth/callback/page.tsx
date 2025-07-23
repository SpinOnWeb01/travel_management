"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from '@/app/services/userService';
import useAuthStore from '../../../store/authStore'; // OR '@/store/authStore' if alias works


export default function AuthCallbackPage() {
  const router = useRouter();
  const [message, setMessage] = useState('Authenticating...');
  const [error, setError] = useState('');

  const login = useAuthStore((state) => state.login); // zustand login action

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token') || window.location.hash.split('=')[1];

        if (!token) {
          throw new Error('Authentication token not found');
        }

        
        const user = await fetchUserProfile(token);

        
        login(user, token);

        // ✅ Redirect
        router.push('/dashboard');
      } catch (err) {
        console.error('Authentication error:', err);
        setError('Authentication failed. Please try again.');
        setMessage('');

        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
    };

    authenticateUser();
  }, [router, login]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">
              <i className="bi bi-x-circle-fill text-3xl"></i>
              <p className="mt-2">{error}</p>
            </div>
            <p className="text-gray-600">Redirecting to login page...</p>
          </>
        ) : (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg font-medium text-gray-700">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
