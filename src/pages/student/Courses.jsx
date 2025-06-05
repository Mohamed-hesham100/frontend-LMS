import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError, error } = useGetPublishedCourseQuery();
  console.log(data);

  if (isError) {
    return (
      <div className="text-center mt-5">
        <h1>Oops! Something went wrong while fetching courses...</h1>
        <p>{error?.message || "Unexpected error"}</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 dark:bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center mb-4">
          Explore Our
          <span className="text-purple-600"> Courses</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          Choose from a variety of carefully curated courses to enhance your
          skills and achieve your goals. Learn from the best instructors at your
          own pace.
        </p>

        <div className="border-b-2 border-purple-300 w-24 mx-auto mb-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data?.courses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-36 bg-gray-200 dark:bg-gray-700"></div>

      <div className="px-5 py-4 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
};
