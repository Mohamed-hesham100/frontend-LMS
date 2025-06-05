import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative py-20 px-4 text-center mt-16 bg-gradient-to-r from-purple-500 to-purple-700 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-extrabold leading-tight mb-4">
          Unlock Your Potential with the Best Courses
        </h1>
        <p className="text-purple-100 dark:text-gray-400 mb-8 leading-relaxed">
          Discover a wide range of online courses and start your journey today.
          Expert-led tutorials and flexible learning paths to help you grow at
          your own pace.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses..."
            type="text"
            className="flex-grow border-none focus-visible:ring-0 px-5 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button
            type="submit"
            className="bg-purple-600 dark:bg-purple-700 text-white !px-6 !py-6 rounded-r-full hover:bg-purple-700 dark:hover:bg-purple-600 cursor-pointer transition-all duration-200"
          >
            Search
          </Button>
        </form>

        <Button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-purple-600 rounded-full hover:bg-purple-100 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 font-semibold px-6 py-3"
        >
          Explore Courses
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
