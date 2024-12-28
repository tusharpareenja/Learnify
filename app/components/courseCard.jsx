import React from 'react'

function CourseCard({ course }) {
  return (
    <div className="card border p-4 rounded-md shadow-lg">
      <img
        src={course.image || '/placeholder.svg?height=200&width=300'}
        alt={course.courseOutput.courseName}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold">{course.courseOutput.description}</h3>
      <p className="text-sm text-gray-500">{course.category}</p>
      <div className="mt-2">
        <span className="text-sm font-medium">{course.level}</span>
      </div>
    </div>
  )
}

export default CourseCard
