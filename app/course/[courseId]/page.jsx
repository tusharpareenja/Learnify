'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { db } from '@/config/db'
import { CourseList } from '@/schema/schema'
import { eq } from 'drizzle-orm'
import { useSession } from 'next-auth/react'
import CourseCreator from '@/app/create_course/page'
import CourseCard from '@/app/create_course/[courseId]/components/courseCard'
import ChapterList from '@/app/create_course/[courseId]/components/chapterList'

function CourseViewPage({params}) {
  const [course, setCourse] = useState(null)
  const { data: session } = useSession() // Access session data



  useEffect(() => {
    params&&getCourse();
  }, [params])

  const getCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId))
    
    if (result.length > 0) {
      setCourse(result[0])
    }
    console.log(result);
  }

  if (!course) {
    return <div>Loading...</div> // Show loading state until course data is fetched
  }

  return (
    <div className="mb-8">
      <CourseCard course={course} refreshData={() => console.log('Refresh data')} />
      <ChapterList course={course} />
    </div>
  )
}

export default CourseViewPage
