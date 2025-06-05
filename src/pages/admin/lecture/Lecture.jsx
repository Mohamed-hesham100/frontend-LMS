import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Lecture = ({ lecture, courseId, index, onDelete }) => {
  const navigate = useNavigate();
  const lectureId = lecture._id;
  const gotoUpdateLecture = () => {
    navigate(`${lectureId}`);
  };

  return (
    <>
      <div className="flex items-center justify-between bg-white dark:bg-[#1F1F1F] shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out px-6 py-4 rounded-lg my-3">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-lg font-semibold">
            Lecture {index + 1} :
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {lecture.lectureTitle}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={gotoUpdateLecture}
            className="flex items-center gap-2 text-sm text-purple-600 dark:text-blue-purple hover:text-purple-800 dark:hover:text-purple-300 transition-colors cursor-pointer"
          >
            <Edit size={20} />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Lecture;
