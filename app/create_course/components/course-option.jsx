import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContext } from "react";
import { UserInputContext } from "@/app/context/UserInputContext";

export function CourseOptions({ onUpdate }) {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    const updatedInput = {
      ...userCourseInput,
      [fieldName]: value,
    };
    setUserCourseInput(updatedInput); // Update context
  
    // Call onUpdate if provided
    if (onUpdate) {
      onUpdate(updatedInput); // Pass updated data to parent
    }
  
  
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Course Price */}
          <div className="space-y-2">
            <Label htmlFor="chapter">Number of chapter</Label>
            <Input
              id="chapter"
              type="number"
              placeholder="Enter number of chapter"
              value={userCourseInput.chapter || ""}
              onChange={(e) => handleInputChange("chapter", Number(e.target.value))}
            />
          </div>

          {/* Course Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Course Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 2 hour"
              value={userCourseInput.duration || ""}
              onChange={(e) => handleInputChange("duration", e.target.value)}
            />
          </div>

          {/* Course Level */}
          <div className="space-y-2">
            <Label htmlFor="level">Course Level</Label>
            <Select
              value={userCourseInput.level || ""}
              onValueChange={(value) => handleInputChange("level", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
