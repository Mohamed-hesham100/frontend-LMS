import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Course = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link to={`course-details/${course?._id}`}>
        <Card className="overflow-hidden py-0 rounded-xl bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-transform hover:scale-[1.01] duration-300">
          <CardContent className="p-4 space-y-3">
            {/* Course Thumbnail */}
            <div className="rounded-md overflow-hidden">
              <img
                src={course.courseThumbnail}
                alt="Course"
                className="w-full h-40 object-cover"
              />
            </div>
            <div className="flex items-center justify-between">
              {/* Course Title */}
              <h2 className="text-lg font-semibold line-clamp-2 hover:underline">
                {course.courseTitle}
              </h2>
              {/* Course Price */}
              <div className="text-base font-bold text-purple-500 dark:text-purple-400 text-right">
                ${course.coursePrice}
              </div>
            </div>

            {/* Instructor Info + Level */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Avatar className="w-7 h-7">
                  <AvatarImage
                    src={
                      course.creater?.photoUrl ||
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60"
                    }
                    alt="Instructor"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{course.creater?.name || "Instructor"}</span>
              </div>
              <Badge className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                {course.courseLevel}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default Course;
