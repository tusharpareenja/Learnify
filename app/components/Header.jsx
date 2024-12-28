'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // Import useSession hook

const Header = () => {
  const { data: session } = useSession(); // Retrieve session data
  const userProfileImage = session?.user?.image; // Get the profile image from session

  return (
    <nav className="fixed top-0 left-auto md:left-60 right-0 bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 md:flex hidden items-center">
            <Link href="/" className="flex items-center">
              {/* Replace with your actual logo */}
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Profile Picture Circle */}
            <div className="relative">
              <img
                src={userProfileImage || '/default-profile.png'} // Default image if no user profile
                alt="User Profile"
                className="h-10 w-10 rounded-full border-2 border-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
