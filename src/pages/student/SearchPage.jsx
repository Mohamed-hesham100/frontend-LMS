import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Filter from "../../pages/student/Filter";
import SearchResult from "./SearchResult";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { useSearchParams } from "react-router-dom";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });
  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 mt-5">
      {/* Header Section */}
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-1 text-purple-800 dark:text-purple-400">
          {query}
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Showing results for:{" "}
          <span className="text-purple-800 dark:text-purple-400">{query}</span>
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Filter Sidebar */}
        <div className="h-130 overflow-y-auto border rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 p-4 custom-scroll">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Search Results */}
        <section className="space-y-4 h-130 overflow-y-auto custom-scroll">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            data.courses?.map((course) => (
              <SearchResult key={course._id} course={course} />
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_auto] gap-4 p-4 border rounded-md shadow-sm w-full dark:bg-gray-800 dark:border-gray-700">
      {/* Image Skeleton */}
      <div className="h-32 w-full">
        <Skeleton className="h-full w-full rounded-md" />
      </div>

      {/* Text Info Skeleton */}
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2 mt-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Right Side Skeleton */}
      <div className="flex flex-col items-end justify-between gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};

const CourseNotFound = () => {
  return (
    <div className="text-center text-gray-600 dark:text-gray-300 py-10">
      <h2 className="text-xl font-semibold mb-2">No Courses Found</h2>
      <p>We couldn't find any courses matching your search.</p>
    </div>
  );
};
