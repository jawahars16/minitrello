"use client";

import { useState } from 'react';
import "../globals.css";
import {LayoutDashboard, Settings, SquareKanban} from "lucide-react";
import { CreateBoardProvider } from "@/context/CreateBoardContext";
import CreateBoardDialog from "@/components/dialogs/CreateBoardDialog";
import { CardDetailProvider } from "@/context/CardDetailContext";
import CardDetailDialog from "@/components/dialogs/CardDetailDialog";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/lib/firebase";
import ProfileAvatar from "@/components/auth/ProfileAvatar";
import Link from "next/link";
import NavLink from "@/components/ui/NavLink";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, authLoading, authError] = useAuthState(auth);

  return (
    <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white ${
          isSidebarOpen ? 'w-64' : 'w-18'
        } flex-shrink-0 transition-all duration-300`}
      >
        <div className="p-4">
          <Link href="/app/board" className="font-bold">
            <h1 className={`text-2xl font-bold ${isSidebarOpen ? '' : 'hidden'}`}>Minitrello</h1>
            <h1 className={`text-2xl font-bold ${isSidebarOpen ? 'hidden' : ''}`}>MT</h1>
          </Link>
        </div>
        <nav className="mt-10">
          <NavLink href="/app/board">
            <LayoutDashboard className="h-6 w-6 ml-1 mr-3" />
            <span className={isSidebarOpen ? '' : 'hidden'}>Boards</span>
          </NavLink>
          <NavLink href="/app/templates">
            <SquareKanban className="h-6 w-6 ml-1 mr-3" />
            <span className={isSidebarOpen ? '' : 'hidden'}>Templates</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-white shadow-md z-10">
          <div className="flex items-center justify-between p-4">
            {/* Left-aligned menu button */}
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className='hover:bg-gray-200 p-2 rounded-md'>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    stroke="gray"
                    d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <div className="flex-grow ml-4 text-2xl text-gray-900">
              <Link href="/app/board" className="font-bold">
                {!isSidebarOpen && 'Minitrello'}
              </Link>
            </div>

            {/* Right-aligned profile avatar */}
            <div className="flex items-center">
              {authLoading ? (
                  <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
              ) : user ? (
                  <ProfileAvatar user={user} />
              ) : null}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <CreateBoardProvider>
            <CardDetailProvider>
              {children}
              <CreateBoardDialog />
              <CardDetailDialog />
            </CardDetailProvider>
          </CreateBoardProvider>
        </main>
      </div>
    </div>
  );
}
