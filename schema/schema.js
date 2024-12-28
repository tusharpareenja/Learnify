import { pgTable, serial, varchar, integer, json, uuid } from "drizzle-orm/pg-core";

// CourseList Table
export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),  // UUID type for courseId
  name: varchar('name').notNull(),
  category: varchar('category').notNull(),
  level: varchar('level').notNull(),
  courseOutput: json('courseOutput').notNull(),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('username'), // Optional field
  userProfileImage: varchar('userProfileImage') // Optional field
});

// Chapters Table
export const Chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),  // Match type with CourseList.courseId
  chapterId: integer('chapterId').notNull(),
  content: json('content').notNull(),
  videoId: varchar('videoId').notNull()
});
