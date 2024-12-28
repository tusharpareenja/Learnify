'use client';

import { useEffect, useState, useCallback } from 'react';
import { db } from '@/config/db';
import { Chapters, CourseList } from '@/schema/schema';
import { and, eq } from 'drizzle-orm';
import CourseCurriculum from './components/ChapterCard';
import ChapterContent from './components/ChapterContent';

export default function Page({ params }) {
  const [course, setCourse] = useState(null);
  const [selected, setSelected] = useState(null);
  const [chapterContent, setChapterContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const courseId = params?.courseId;
        if (!courseId) return;

        const result = await db
          .select()
          .from(CourseList)
          .where(eq(CourseList.courseId, courseId));

        if (result.length > 0) {
          setCourse(result[0]);
          const firstChapter = result[0]?.courseOutput?.chapters?.[0];
          if (firstChapter) {
            getSelectedChapterContent(firstChapter.chapterId);
          }
        }
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to fetch course data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [params]);

  const getSelectedChapterContent = useCallback(async (chapterId) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await db
        .select()
        .from(Chapters)
        .where(
          and(
            eq(Chapters.chapterId, chapterId),
            eq(Chapters.courseId, course.courseId)
          )
        );

      setChapterContent(result[0] || null);
    } catch (err) {
      console.error('Error fetching chapter content:', err);
      setError('Failed to fetch chapter content.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChapterClick = (chapter) => {
    setSelected(chapter);
    getSelectedChapterContent(chapter.chapterId);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-60 h-screen border-r bg-white z-10 overflow-y-auto">
        <h2 className="font-semibold text-white bg-purple-500 p-3 text-lg sticky top-0">
          {isLoading ? 'Loading...' : course?.courseOutput?.courseName || 'No Course Found'}
        </h2>
        <nav>
          {course?.courseOutput?.chapters?.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 ${
                selected?.chapterName === chapter.chapterName ? 'bg-purple-100' : ''
              }`}
              onClick={() => handleChapterClick(chapter)}
            >
              <CourseCurriculum chapter={chapter} index={index} />
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-60 p-4">
        {isLoading && <p>Loading content...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && (
          <ChapterContent chapter={selected} content={chapterContent} />
        )}
      </main>
    </div>
  );
}
