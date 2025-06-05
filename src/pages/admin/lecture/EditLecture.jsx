import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const { courseId } = useParams();
  return (
    <div className="md:space-y-4 mt-20 md:mt-0">
      {/* الجزء العلوي */}
      <div className="flex items-center gap-2 mb-5">
        <Link to={`/admin/course/${courseId}/lecture`}>
          <Button size="icon" variant="outline" className="rounded-full">
            <ArrowLeft size={16} />
          </Button>
        </Link>
        <h1 className="font-bold text-xl">Update Your Lecture</h1>
      </div>

      {/* جزء الكارد منفصل أسفل العنوان */}
      <LectureTab />
    </div>
  );
};

export default EditLecture;
