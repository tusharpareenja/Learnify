import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar'; // Adjust the path as needed
import { AppSidebar } from '../components/Sidebar'; // Adjust the path as needed
import Header from '../components/Header';
import { SessionProvider } from "next-auth/react"; // Import SessionProvider

// Layout component for the dashboard
const DashboardLayout = ({ children }) => {
  return (
    <SessionProvider>
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar can be fixed on the left */}
          <Header />
          <main className="flex-1 p-4">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  );
};

export default DashboardLayout;
