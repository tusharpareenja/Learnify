import { Clock } from 'lucide-react';

export default function ChapterList({ course }) {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Chapters</h2>
      <div className="space-y-4">
        {course?.courseOutput?.chapters.map((chapter, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {index + 1} {/* Use index + 1 to display chapter number */}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{chapter.chapterName}</h3> {/* Use chapterName */}
                <p className="text-muted-foreground">{chapter.about}</p> {/* Use about */}
                <div className="flex items-center text-sm text-purple-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {chapter.duration} {/* Use duration */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
