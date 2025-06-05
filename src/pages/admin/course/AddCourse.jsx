import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "@/features/api/courseApi";
import { toast } from "sonner";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [creatCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();
  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };
  const createCourseHandler = async () => {
    await creatCourse({ courseTitle, category });
  };

  // for display toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  return (
  <div className="flex-1 mx-10 my-10">
  {/* Header */}
  <div className="mb-6 mt-20 md:mt-0">
    <h1 className="font-bold text-3xl text-purple-800 dark:text-purple-400 mb-2">
      Add a New Course
    </h1>
    <p className="text-base text-gray-600 dark:text-gray-300">
      Fill in the details below to create a new course for your educational platform.
    </p>
  </div>

  {/* Form container */}
  <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 space-y-6 max-w-2xl">
    {/* Course Title */}
    <div>
      <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Course Title
      </Label>
      <Input
        value={courseTitle}
        onChange={(e) => setCourseTitle(e.target.value)}
        type="text"
        name="courseTitle"
        placeholder="Enter course name"
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md p-3 focus:outline-none focus:!ring-2"
      />
    </div>

    {/* Category */}
    <div>
      <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Category
      </Label>
      <Select onValueChange={getSelectedCategory}>
        <SelectTrigger className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md p-3 focus:outline-none focus:!ring-2">
          <SelectValue placeholder="Select a course" />
        </SelectTrigger>
        <SelectContent className="dark:bg-gray-900 dark:text-white">
          <SelectGroup>
            <SelectLabel className="dark:text-gray-300">Programming Courses</SelectLabel>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="react">React.js</SelectItem>
            <SelectItem value="next">Next.js</SelectItem>
            <SelectItem value="html">Html</SelectItem>
            <SelectItem value="docker">Docker</SelectItem>
            <SelectItem value="fultter">Flutter</SelectItem>
            <SelectItem value="dart">Dart</SelectItem>
            <SelectItem value="js">Js</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="ai">Ai</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectLabel className="dark:text-gray-300">Marketing Courses</SelectLabel>
            <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
            <SelectItem value="seo">SEO</SelectItem>
            <SelectItem value="social-media">Social Media Marketing</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    {/* Buttons */}
    <div className="flex items-center gap-4 mt-4">
      <Button
        onClick={() => navigate("/admin/course")}
        variant="outline"
        className="border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 rounded-md"
      >
        Back
      </Button>
      <Button
        disabled={isLoading}
        onClick={createCourseHandler}
        className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-md"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            please wait
          </>
        ) : (
          "Create Course"
        )}
      </Button>
    </div>
  </div>
</div>

  );
};

export default AddCourse;
