"use client";

import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase";

const HomePage: NextPage = () => {
  const [user, authLoading, authError] = useAuthState(auth);
  const router = useRouter();

  const handleGetStarted = () => {
    if (user && !authLoading && !authError) {
        router.push('/app/board');
        return;
    }
    router.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white text-center py-20 px-20  bg-hero-pattern bg-cover bg-center shadow-xl" style={{backgroundImage: "url('/2.png')"}}>
          <h1 className="text-5xl font-bold mb-4 text-blue-900">Organize Your Life with Minitrello</h1>
          <p className="text-xl mb-8 text-blue-900">A simple, colorful, and practical Kanban board for your tasks.</p>
          <button
            onClick={handleGetStarted}
            className="text-white bg-blue-900 font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition duration-300 cursor-pointer"
          >
            Get Started
          </button>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-18 mb-18">
              <div className="w-full rounded-lg flex items-center justify-center">
                <img src='/3.png'/>
              </div>
              <div className='flex flex-col justify-center gap-5'>
                <h1 className="text-4xl font-bold mb-2">Minitrello</h1>
                <p>Organize your chaos and visualize your progress with <span className='bg-orange-600 text-white p-1 rounded-sm'>Minitrello</span>. It's the simple, elegant Kanban board designed for personal projects and small teams. Ditch the complexity and streamline your workflow to stay focused and get things done.</p>
                <p>Turn your ideas into action with <span className='bg-yellow-600 text-white p-1 rounded-sm'>Minitrello</span>. This beautifully simple Kanban board helps you organize tasks, track progress, and achieve momentum on any project. Stop feeling overwhelmed and start moving your goals forward, one card at a time.</p>
                <p>Stop fighting with bloated software and start working smarter. Our simple <span className='bg-green-600 text-white p-1 rounded-sm'>Minitrello</span> Kanban board helps you map out your tasks, prioritize with clarity, and effortlessly track your progress. It's everything you need to stay organized and nothing you don't.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
      </main>

      {/* Footer */}
      <footer className="text-centerbg-gray-800">
        <section className="bg-gray-800 text-white text-center py-20">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Organized?</h2>
          <button
              onClick={handleGetStarted}
              className="bg-blue-900 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Get Started
          </button>
        </section>
        <p className=' py-4 bg-gray-900 text-center text-gray-400'>&copy; {new Date().getFullYear()} Minitrello. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;