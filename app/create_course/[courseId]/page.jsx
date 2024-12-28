"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/config/db'
import { Chapters, CourseList } from '@/schema/schema'
import { useSession } from 'next-auth/react'
import { and, eq } from 'drizzle-orm'
import CourseCard from './components/courseCard'
import ChapterList from './components/chapterList'
import { Button } from '@/components/ui/button'
import { GenerateCourseLayout_AI } from '@/config/AiModel'
import LoadingOverlay from '../components/LoadingDialog'
import service from '@/config/service'
import { useRouter } from 'next/navigation';

function CourseLayout({ params }) {
    const { data: session } = useSession()
    const [course, setCourse] = useState([])
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    
    useEffect(() => {
        // Unwrap params using React.use()
        const courseId = params?.courseId;

        if (courseId) {
            GetCourse(courseId);
        }
    }, [params, session])

    const GetCourse = async (courseId) => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList.courseId, courseId), eq(CourseList.createdBy, session.user.email)));

        setCourse(result[0]);
        console.log(result);
    }

    const generatechaptercontent = async () => {
        setLoading(true);
        const chapters = course?.courseOutput?.chapters || [];
        for (const [index, chapter] of chapters.entries()) {
            try {
                const PROMPT = `Explain the concept in detail on topic: ${course.name}, chapter: ${chapter?.chapterName}, in JSON format with a list of arrays with fields as Title, description, code Example (code field in <precode> format) if applicable`;
                console.log(PROMPT);
    
                const result = await GenerateCourseLayout_AI.sendMessage(PROMPT);
                const content = JSON.parse(result?.response?.text());
    
                // Extracting only the necessary data (title, description, codeExample)
                const extractedContent = content?.concepts?.map((concept) => ({
                    title: concept.title,
                    description: concept.description,
                    codeExample: concept.codeExample || null, // Handling null codeExample
                }));
    
                let videoId = '';
                const res = await service.getVideos(`${course?.name}:${chapter?.name}`);
                if (res?.length) {
                    videoId = res[0]?.id?.videoId || '';
                }
    
                // Store the extracted content in the database
                await db.insert(Chapters).values({
                    chapterId: index,
                    courseId: course?.courseId,
                    content: extractedContent, // Store only the extracted content
                    videoId: videoId,
                });
            } catch (e) {
                console.error(e);
            }
        }
        setLoading(false);
        router.replace('/create_course/' + course?.courseId + "/finish");
    };
    
    

    return (
        <div>
            <LoadingOverlay isOpen={loading}/>
            <CourseCard course={course} />
            <ChapterList course={course} />
            <Button onClick={generatechaptercontent} className="bg-purple-600 hover:bg-purple-800">Generate Course Content</Button>
        </div>
    )
}

export default CourseLayout;
