"use client";

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {signInAnonymously, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import GoogleIcon from '@/components/icons/GoogleIcon';
import {Kanban, LogIn} from "lucide-react";

const LoginPage: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      // Optional: You can set custom OAuth parameters if needed
      // provider.addScope('https://www.googleapis.com/auth/calendar.events');

      const result = await signInWithPopup(auth, provider);
      // The signed-in user info.
      const user = result.user;

      router.push('/app/board');

    } catch (err: { code: string; message: string } | any) {
      const errorCode = err.code;
      const errorMessage = err.message;
      console.error("Google Sign-In Error:", errorCode, errorMessage);
      // Handle specific errors like 'auth/popup-closed-by-user'
      if (errorCode !== 'auth/popup-closed-by-user') {
        setError(`Sign-In failed: ${errorCode}. Check console for details.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInAnonymously(auth);
      router.push('/app/board');
    } catch (error) {
      console.error(error);
      setError('Failed to sign in as guest. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100" style={{
      backgroundImage: "url('/bottom-image.png')",
      backgroundSize: '950px',
      backgroundPosition: 'right bottom',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center text-indigo-600 mb-2">
            <Kanban className='mr-3 text-blue-900'/>
            <h1 className="text-3xl font-extrabold tracking-tight text-blue-900">Minitrello</h1>
          </div>
          <p className="text-gray-500">The simple way to manage your work.</p>
        </div>

        {/* --- Login Card --- */}
        <div className="bg-white shadow-2xl rounded-xl p-8 border border-gray-200/50 transform transition duration-500 hover:shadow-3xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Log in to continue
          </h2>

          {/* Error Message */}
          {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
          )}

          <div className="space-y-4">
            {/* Google Sign In Button */}
            <button
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className="w-full flex cursor-pointer justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
            >
              {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-indigo-500 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  <>
                    {/* Google Icon SVG */}
                    <GoogleIcon className="mr-2" />
                    Sign in with Google
                  </>
              )}
            </button>

            {/* Separator */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or
                </span>
              </div>
            </div>

            {/* Guest Login Button */}
            <button
                onClick={handleGuestLogin}
                disabled={isLoading}
                className="w-full flex justify-center cursor-pointer items-center px-4 py-3 border border-indigo-400 rounded-lg shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 disabled:opacity-50"
            >
              {isLoading ? (
                  <svg className="animate-spin h-5 w-5 text-indigo-50 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-3"/>
                    Continue as Guest
                  </>
              )}
            </button>
          </div>
        </div>
    </div>
    </div>
  );
};

export default LoginPage;
