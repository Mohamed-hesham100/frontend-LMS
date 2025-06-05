import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useIncompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ReactPlayer from "react-player";
// import { Progress } from "@/components/ui/progress";

const CourseProgress = () => {
  const { courseId } = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);

  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    completeInCourse,
    { data: markInCompleteData, isSuccess: IncompletedSuccess },
  ] = useIncompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      toast.success(markCompleteData?.message);
      refetch();
    }
    if (IncompletedSuccess) {
      toast.error(markInCompleteData?.message);
      refetch();
    }
  }, [completedSuccess, IncompletedSuccess]);

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (isError)
    return (
      <p className="text-center text-red-600">Failed to load course details</p>
    );

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;
  const lectures = courseDetails.lectures || [];

  const initialLecture = currentLecture || lectures[0];

  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgess(lecture._id);
  };

  const handleLectureProgess = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await completeInCourse(courseId);
  };

  // const completedCount = progress.filter((p) => p.viewed).length;
  // const totalLectures = lectures.length;
  // const progressPercent = (completedCount / totalLectures) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {courseTitle}
        </h1>
        <Button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          className={`text-base font-semibold rounded-lg px-4 py-2 transition duration-300 ${
            completed
              ? "bg-green-600 hover:bg-green-700"
              : "bg-purple-600 hover:bg-purple-700"
          } text-white`}
        >
          {completed ? (
            <div className="flex items-center gap-2">
              <CheckCircle /> <span>Completed</span>
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      {/* Progress Bar
      <Progress value={progressPercent} className="h-3 rounded-full" /> */}

      {/* Content Section */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Video Section */}

        <div className="flex-1 md:w-3/5 rounded-xl shadow-md bg-white dark:bg-gray-900 p-4 mb-10">
          <div className="aspect-video overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 shadow-sm relative">
            <ReactPlayer
              url={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              width="100%"
              height="100%"
              onPlay={() =>
                handleLectureProgess(currentLecture?._id || initialLecture._id)
              }
              style={{ position: "absolute", top: 0, left: 0 }}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {`Lecture ${
                lectures.findIndex(
                  (lec) =>
                    lec._id === (currentLecture?._id || initialLecture?._id)
                ) + 1
              }: `}
              {currentLecture?.lectureTitle || initialLecture?.lectureTitle}
            </h3>
          </div>
        </div>

        {/* Lecture Sidebar */}
        <div className="w-full md:w-2/5 md:pl-6 pt-4 md:pt-0 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Course Lectures
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {lectures.map((lecture) => {
              const isCurrent =
                lecture._id === (currentLecture?._id || initialLecture._id);
              return (
                <Card
                  onClick={() => handleSelectLecture(lecture)}
                  key={lecture._id}
                  className={`hover:cursor-pointer transition-shadow ${
                    isCurrent ? "bg-purple-50 dark:bg-purple-900" : ""
                  }`}
                >
                  <CardContent className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-3">
                      {isLectureCompleted(lecture._id) ? (
                        <CheckCircle2 size={24} className="text-green-500" />
                      ) : (
                        <CirclePlay size={24} className="text-purple-500" />
                      )}
                      <CardTitle className="text-base font-medium text-gray-800 dark:text-white">
                        {lecture?.lectureTitle}
                      </CardTitle>
                    </div>

                    {isLectureCompleted(lecture._id) && (
                      <Badge
                        variant="secondary"
                        className="bg-green-600 text-white border-none rounded-full px-3 py-1 text-xs"
                      >
                        Completed
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
