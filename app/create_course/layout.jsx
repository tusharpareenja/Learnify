'use client';
import React, { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar'; // Adjust the path as needed
import { AppSidebar } from '../components/Sidebar'; // Adjust the path as needed
import Header from '../components/Header';
import { UserInputContext } from '../context/UserInputContext';
import { SessionProvider } from 'next-auth/react';

// Layout component for the dashboard
const DashboardLayout = ({ children }) => {
  const [userCourseInput, setUserCourseInput] = useState([]);

  return (
    <SessionProvider>
            <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
      <SidebarProvider className=''>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row justify-center w-full">
          {/* Header */}
          <Header />
          <main className="flex-1 p-4 justify-center">{children}</main>
        </div>
      </SidebarProvider>
    </UserInputContext.Provider>
    </SessionProvider>

  );
};

export default DashboardLayout;
