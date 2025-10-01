"use client";

import { useState, useRef, useEffect } from 'react';
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { User } from "firebase/auth";
import {useRouter} from "next/navigation";

type ProfileAvatarProps = {
  user: User;
};

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    router.push("/login")
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center cursor-pointer">
        <img
          src={user.photoURL || '/default-avatar.png'}
          alt="Profile"
          className="h-8 w-8 rounded-full"
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-md shadow-lg py-1 z-20">
          <div className="px-4 py-2 text-sm text-gray-700">
            <div className="flex items-center">
              <img
                src={user.photoURL || '/default-avatar.png'}
                alt="Profile"
                className="h-10 w-10 rounded-full mr-2"
              />
              <div>
                <p className="font-semibold">{user.uid}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-300 cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
