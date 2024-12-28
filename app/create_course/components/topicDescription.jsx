"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContext } from "react";
import { UserInputContext } from "@/app/context/UserInputContext";

export function TopicDescription({ onUpdate }) {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    const updatedInput = {
      ...userCourseInput,
      [fieldName]: value,
    };
    setUserCourseInput(updatedInput);

    console.log(`Updated ${fieldName}:`, value); // Log the field update

    // Call onUpdate if provided
    if (onUpdate) {
      console.log('Calling onUpdate with:', updatedInput); // Log the data being passed to onUpdate
      onUpdate(updatedInput);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Course Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Course Title</Label>
            <Input
              id="title"
              placeholder="Enter course title"
              value={userCourseInput.topic || ""}
              onChange={(e) => handleInputChange("topic", e.target.value)}
            />
          </div>

          {/* Course Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Course Description</Label>
            <Textarea
              id="description"
              placeholder="Enter course description"
              className="min-h-[150px]"
              value={userCourseInput.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
