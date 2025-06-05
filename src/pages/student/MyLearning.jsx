import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";
import { NoCoursesFound } from "./Profile";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearningCourses = data?.user?.enrolledCourse || [];

  return (
    <div className="max-w-5xl mx-auto my-20 px-4 md:px-0">
      <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center mb-4 text-gray-900 dark:text-gray-100">
        My <span className="text-purple-600 dark:text-purple-400">Learning</span>
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
        Here are the courses you are currently enrolled in. Keep learning and
        growing!
      </p>
      <div className="border-b-2 border-purple-300 dark:border-purple-500 w-24 mx-auto mb-10"></div>

      {isLoading ? (
        <MyLearningSkeleton />
      ) : myLearningCourses.length === 0 ? (
        <NoCoursesFound />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {myLearningCourses.map((course) => (
            <Course key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyLearning;

const MyLearningSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 shadow-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};
