import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const { courseId } = useParams();


  const [createLecture, { data, isSuccess, isLoading, error }] =
    useCreateLectureMutation();

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  const {
    data: lectureData,
    isLoading: lectureIsLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data?.message);
      setLectureTitle("");
    }
    if (error) {
      toast.error(error?.data?.message || error?.message);
    }
  }, [isLoading, isSuccess]);

  return (
    <div className="flex-1 mx-5 my-10">
      {/* Header */}
      <div className="mb-6 mt-20 md:mt-0">
        <h1 className="font-bold text-3xl text-purple-800 dark:text-purple-400 mb-2">
          Add a New Lecture
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Fill in the details below to create a new lecture for the course.
        </p>
      </div>

      {/* Form container */}
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 space-y-6 max-w-2xl">
        {/* Lecture Title */}
        <div>
          <Label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Lecture Title
          </Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Enter lecture title"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-4">
          <Button
            onClick={() => navigate(`/admin/course/${courseId}`)}
            variant="outline"
            className="border-gray-400 text-gray-700 dark:text-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2 rounded-md"
          >
            Back to course
          </Button>
          <Button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create Lecture"
            )}
          </Button>
        </div>

        {/* Display Lectures */}
        <div className="mt-10">
          {lectureIsLoading ? (
            <p className="text-gray-600 dark:text-gray-300">Loading lecture...</p>
          ) : lectureError ? (
            <p className="text-red-500 dark:text-red-400">Failed to load lectures</p>
          ) : lectureData?.lecture?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No lectures available</p>
          ) : (
            lectureData?.lecture?.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                index={index}
                courseId={courseId}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
