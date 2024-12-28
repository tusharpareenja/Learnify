'use client'

import { db } from '@/config/db'
import { CourseList } from '@/schema/schema'
import { eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

function UserCourseList() {
  const { data: session } = useSession()
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchUserCourses()
    }
  }, [session])

  const fetchUserCourses = async () => {
    try {
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.createdBy, session?.user?.email))

      setCourseList(result)
    } catch (error) {
      console.error("Failed to fetch courses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">My AI Courses</h2>

      {courseList.length === 0 ? (
        <p className="text-center text-gray-500">You haven't created any courses yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map((course, index) => (
            <div key={index} className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-full h-48 bg-blue-50/50 flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 line-clamp-1">{course?.courseOutput?.courseName}</h3>
                <p className="text-sm text-muted-foreground mb-2">{course.category}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                    {course.level}
                  </span>
                  <Link href={`/course/${course?.courseId}`}>
                    <button className="text-sm text-primary hover:underline">
                      View Course
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserCourseList
