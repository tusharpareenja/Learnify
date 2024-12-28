'use client'

import { db } from '@/config/db'
import { CourseList } from '@/schema/schema'
import { and, eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import { Copy } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CourseCard from '../components/courseCard'

export default function Final({ params }) {
  const { data: session } = useSession()
  const [course, setCourse] = useState([])

  useEffect(() => {
    const courseId = params?.courseId
    if (courseId) {
      GetCourse(courseId)
    }
  }, [params, session])

  const GetCourse = async (courseId) => {
    const result = await db.select().from(CourseList)
      .where(and(
        eq(CourseList.courseId, courseId),
        eq(CourseList.createdBy, session.user.email)
      ))
    setCourse(result[0])
    console.log(result)
  }

  const copyUrl = () => {
    const url = `${process.env.HOST_NAME}/course/view/${course?.courseId}`
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-12">
          Congrats! Your course is Ready
        </h1>
        
        <div className="mb-8">
          <CourseCard course={course} refreshData={() => console.log()} />
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700">Course URL:</div>
          <div className="flex gap-2">
            <code className="flex-1 p-3 bg-white rounded-lg border text-sm text-gray-600">
              {`${process.env.HOST_NAME}/course/view/${course?.courseId}`}
            </code>
            <button
              onClick={copyUrl}
              className="p-3 border rounded-lg hover:bg-gray-50"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

