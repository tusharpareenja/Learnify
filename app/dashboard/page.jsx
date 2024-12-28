'use client'
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import DashboardLayout from './layout'; // Adjust the path as needed
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from "@/auth";
import { useSession } from "next-auth/react"
import { CourseList } from '@/schema/schema';
import UserCourseList from '../components/userCourseList';

const Page = () => {


  const { data: session } = useSession()

  return (
    <DashboardLayout>
      <div className="flex  items-center justify-between mt-20 mb-8 p-6">
        <div className="mr-20">
          <h1 className="text-3xl font-bold mb-2">
            {`Hello, ${session?.user?.name || 'Guest'}`} {/* Use session to display username */}
          </h1>
          <p className="text-gray-500">
            Create new course with AI, Share with friends and Earn from it
          </p>
        </div>
        <Link href={'/create_course'}>
          <Button className="bg-purple-600 hover:bg-purple-700">
            + Create AI Course
          </Button>
        </Link>
        
      </div>
      <UserCourseList />
    </DashboardLayout>
  );
};

export default Page;
