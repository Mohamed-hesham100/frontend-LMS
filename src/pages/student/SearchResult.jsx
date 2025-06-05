import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 dark:border-gray-700 gap-4 py-4 px-4 dark:bg-gray-800 dark:rounded-lg">
      <Link
        to={`/course-details/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full"
      >
        <img
          src={course?.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl text-gray-900 dark:text-gray-100">
            {course.courseTitle}
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {course?.subTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Instructor: {course?.creator.name}
          </p>
          <Badge className="w-fit mt-2 md:mt-0 bg-purple-500 hover:bg-purple-600 text-white">
            {course?.courseLevel}
          </Badge>
        </div>
      </Link>
      <div className="mt-2 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-purple-500 dark:text-purple-400">
          ${course?.coursePrice}
        </h1>
      </div>
    </div>
  );
};

export default SearchResult;
