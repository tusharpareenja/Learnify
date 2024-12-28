'use client';
import { useContext, useEffect, useState } from 'react';
import { Code, Pencil, Settings } from 'lucide-react';
import { CategorySelection } from './components/course-category';
import { TopicDescription } from './components/topicDescription';
import { CourseOptions } from './components/course-option';
import { UserInputContext } from '../context/UserInputContext';
import { GenerateCourseLayout_AI } from '@/config/AiModel';
import LoadingOverlay from './components/LoadingDialog';
import { db } from '../../config/db';
import { CourseList } from '@/schema/schema';
import { uuid4 } from 'uuid4';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CourseCreator() {
  const [currentStep, setCurrentStep] = useState(1);
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false); // State to control LoadingOverlay visibility
  const { data: session } = useSession()
  const router = useRouter();


  // Sync courseData with userCourseInput
  const [courseData, setCourseData] = useState(userCourseInput);

  useEffect(() => {
    console.log('userCourseInput:', userCourseInput); // Log the context value
    setCourseData(userCourseInput); // Update courseData whenever userCourseInput changes
  }, [userCourseInput]);

  const steps = [
    { id: 1, name: 'Category', icon: Code },
    { id: 2, name: 'Topic & Desc', icon: Pencil },
    { id: 3, name: 'Options', icon: Settings },
  ];

  const handleNext = () => {
    console.log('Current Step:', currentStep);
    console.log('Course Data on Next:', courseData); // Log courseData before advancing step
    setCurrentStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrevious = () => {
    console.log('Current Step:', currentStep);
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const GenerateCourseLayout = async () => {
    setLoading(true); // Show loading overlay
    try {
      const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: ';
      const USER_INPUT_PROMPT =
        'Category: ' +
        userCourseInput?.category +
        ' Topic: ' +
        userCourseInput?.topic +
        ', Level:' +
        userCourseInput?.level +
        ', Duration: ' +
        userCourseInput?.duration +
        ', NoOf Chapters:' +
        userCourseInput?.chapter +
        ' , in JSON format ';
      const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
      console.log(FINAL_PROMPT);

      const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
      const courseLayout = JSON.parse(result.response.text());
      console.log(courseLayout);
      savecourselayoutindb(courseLayout); // Save course layout to DB
    } catch (error) {
      console.error('Error generating course:', error);
    } finally {
      setLoading(false); // Hide loading overlay
    }
  };

  const savecourselayoutindb = async (courseLayout) => {
    const courseId = uuid4(); // Generate unique course ID
    setLoading(true);
    try {
     const result =  await db.insert(CourseList).values({
        courseId: courseId,  // Insert the UUID as a string
        name: userCourseInput.topic,
        category: userCourseInput.category,
        level: userCourseInput.level,
        courseOutput: JSON.stringify(courseLayout),
        createdBy: session.user.email,
        userName: session.user.username,
        userProfileImage: session.user.image,
      });
      console.log('Course saved to database:', result);
    } catch (error) {
      console.error('Error saving course to DB:', error);
    } finally {

      setLoading(false);
      router.replace('/create_course/'+courseId)
    }
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-center text-3xl font-semibold text-purple-600 mb-12">Create Course</h1>

      {/* Loading Overlay */}
      <LoadingOverlay isOpen={loading} />

      {/* Progress Steps */}
      <nav aria-label="Progress" className="mb-16">
        <ol role="list" className="flex items-center justify-center">
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="relative flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${currentStep >= step.id ? 'bg-purple-600' : 'bg-gray-200'}`}
              >
                <step.icon
                  className={`h-5 w-5 ${currentStep >= step.id ? 'text-white' : 'text-gray-500'}`}
                  aria-hidden="true"
                />
              </div>
              <p
                className={`absolute -bottom-6 w-max text-sm ${currentStep >= step.id ? 'text-purple-600' : 'text-gray-500'}`}
              >
                {step.name}
              </p>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={`h-0.5 w-24 md:w-32 ${currentStep > step.id ? 'bg-purple-600' : 'bg-gray-200'}`}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Content */}
      <div className="mb-16">
        {currentStep === 1 && (
          <CategorySelection
            selectedCategory={courseData.category}
            onSelectCategory={(category) => {
              console.log('Selected Category:', category); // Log selected category
              setCourseData((prev) => ({ ...prev, category }));
            }}
          />
        )}
        {currentStep === 2 && (
          <TopicDescription
            title={courseData.title}
            description={courseData.description}
            onUpdate={(data) => {
              console.log('TopicDescription Updated:', data); // Log data received from TopicDescription
              setCourseData((prev) => ({ ...prev, ...data }));
            }}
          />
        )}
        {currentStep === 3 && (
          <CourseOptions
            price={courseData.price}
            duration={courseData.duration}
            level={courseData.level}
            onUpdate={(data) => {
              console.log('CourseOptions Updated:', data); // Log data received from CourseOptions
              setCourseData((prev) => ({ ...prev, ...data }));
            }}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between max-w-4xl mx-auto">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className="px-6 py-2 text-sm font-medium text-gray-600 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={currentStep === 3 ? GenerateCourseLayout : handleNext}
          disabled={
            (currentStep === 1 && !courseData.category) ||
            (currentStep === 2 && !userCourseInput?.topic)
          }
          className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentStep === 3 ? 'Generate Course' : 'Next'}
        </button>
      </div>
    </div>
  );
}
