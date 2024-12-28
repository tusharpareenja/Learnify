import { Book, BarChart, Clock, Video } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';

export default function CourseCard({ course }) {
  return (
    <div className="max-w-5xl mx-auto p-6 mt-28">
      <h1 className="text-2xl font-bold mb-6">Course Layout</h1> {/* Corrected access */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-6">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">{course?.courseOutput?.courseName}</h2> {/* Corrected access */}
              <p className="text-muted-foreground">{course?.courseOutput?.description}</p> {/* Corrected access */}
              <Badge variant="secondary" className="bg-purple-100 text-purple-600 hover:bg-purple-100">
                {course?.courseOutput?.category} {/* Corrected access */}
              </Badge>
              <Link href={'/course/'+course?.courseId+'/start'}>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start
              </Button>
              </Link>
              
            </div>
          </CardContent>
          <div className="bg-blue-50 flex items-center justify-center p-6">
            <Book className="w-16 h-16 text-blue-300" />
          </div>
        </div>
        <CardFooter className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-6">
          <div className="flex items-center gap-2 text-sm">
            <BarChart className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-muted-foreground">Skill Level</div>
              <div className="font-medium">{course?.courseOutput?.level}</div> {/* Corrected access */}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-muted-foreground">Duration</div>
              <div className="font-medium">{course?.courseOutput?.totalDuration}</div> {/* Corrected access */}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Book className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-muted-foreground">No Of Chapters</div>
              <div className="font-medium">{course?.courseOutput?.noOfChapters}</div> {/* Corrected access */}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Video className="w-5 h-5 text-purple-600" />
            <div>
              <div className="text-muted-foreground">Video Included?</div>
              <div className="font-medium">{course?.courseOutput?.chapters?.length > 0 ? "Yes" : "No"}</div> {/* Corrected access */}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
