'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Layers, Shield, LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Layers, label: 'Explore', href: '/explore' },
    { icon: Shield, label: 'Upgrade', href: '/upgrade' },
    { icon: LogOut, label: 'Logout', href: '/logout' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* Sidebar Trigger for Small Screens */}
      <div
        className="fixed top-4 left-4 z-50 block md:hidden p-2 bg-gray-200 rounded-full cursor-pointer"
        onClick={toggleSidebar}
      >
        <SidebarTrigger />
      </div>

      {/* Sidebar */}
      <Sidebar
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white shadow-lg transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <SidebarHeader className="border-b p-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
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
              <span className="text-xl font-bold">Learnify</span>
            </Link>
            <div
              className="md:hidden text-gray-700 cursor-pointer"
              onClick={toggleSidebar}
            >
              ✕
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-lg font-bold">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
