import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl text-gray-800 dark:text-gray-100">
          Add details information regarding course
        </h1>
        <Link to="lecture">
          <Button
            className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            variant="link"
          >
            Go to lecture page
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div>
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
