import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlayCircle } from "lucide-react";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import ReactPlayer from "react-player";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const { data, isLoading, isError, refetch } =
    useGetCourseDetailWithStatusQuery(courseId);

  useEffect(() => {
    refetch();
  }, []);
  
  if (isLoading)
    return (
      <h1 className="text-center text-2xl font-semibold text-purple-600 dark:text-purple-400 mt-10">
        Loading...
      </h1>
    );
  if (isError)
    return (
      <h1 className="text-center text-2xl font-semibold text-red-600 dark:text-red-400 mt-10">
        Failed to load course details
      </h1>
    );

  const { course, purchased } = data;

  const handleContinueCourse = async () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12 mt-10">
        {/* Hero Section */}
        <section className="bg-white rounded-2xl py-12 px-6 border border-gray-300 flex flex-col md:flex-row md:items-center md:justify-between gap-6 dark:bg-gray-800">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-purple-600 dark:text-purple-400">
              {course?.courseTitle}
            </h1>
            <p className="text-lg mt-2 text-gray-800 dark:text-gray-300">
              {course?.subTitle}
            </p>
            <p className="mt-1 text-gray-700 dark:text-gray-400">
              By :{" "}
              <span className="underline italic">{course?.creator.name}</span>
            </p>
            <p className="text-sm mt-1 text-gray-600 dark:text-gray-500">
              Last updated : {course?.createdAt.split("T")[0]} •{" "}
              {course?.enrolledStudents.length} Students enrolled
            </p>
          </div>
          <div className="w-full md:h-50 md:w-50 bg-purple-100 rounded-lg shadow-inner overflow-hidden">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Course Description and Content */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-purple-700 dark:text-purple-400">
                  About This Course
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">{course?.description}</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="text-purple-700 dark:text-purple-400">
                  Course Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {course?.lectures.map((lecture, index) => (
                  <div
                    key={lecture._id}
                    className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <PlayCircle size={18} className="text-purple-500" />
                    <span>
                      Lecture {index + 1}: {lecture.lectureTitle}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Price and Button */}
          <div>
            <Card className="border-0 shadow-md dark:bg-gray-800">
              <CardContent className="space-y-4">
                {!purchased && (
                  <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400">
                    Course Price :{" "}
                    <span className="text-purple-500 dark:text-purple-300">
                      ${course?.coursePrice}
                    </span>
                  </h2>
                )}

                <div className="aspect-video w-full md:w-72 rounded-lg shadow-inner overflow-hidden">
                  {course?.lectures?.[0]?.videoUrl ? (
                    <ReactPlayer
                      url={course.lectures[0].videoUrl}
                      width="100%"
                      height="100%"
                      controls={true}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-purple-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                      No Video Available
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {purchased ? (
                  <Button
                    onClick={handleContinueCourse}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold py-2 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md"
                  >
                    Continue Course
                  </Button>
                ) : (
                  <BuyCourseButton courseId={courseId} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
