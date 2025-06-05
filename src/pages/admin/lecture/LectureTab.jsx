import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useEditLectureMutation,
  useGetLecturByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
const MEDIA_API = "https://backend-lms-production-46de.up.railway.app/api/v1/media";

const LectureTab = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(false);
  const [showModal, setShowModal] = useState(false); //  حالة المودال
  const { courseId, lectureId } = useParams();
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    {
      data: removeData,
      isLoading: removeLoading,
      isSuccess: removeSuccess,
      error: removeError,
    },
  ] = useRemoveLectureMutation(lectureId);

  const { data: lectureData } = useGetLecturByIdQuery(lectureId);
  const lecture = lectureData?.lecture;
  console.log(lecture);
  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo({
        videoUrl: lecture.videoUrl,
        publicId: lecture.publicId,
      });
    }
  }, [lecture]);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setBtnDisable(true);
      const formData = new FormData();
      formData.append("file", file);
      setShowModal(true); 
      setMediaProgress(true);

      const token = localStorage.getItem("token");

      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          },
          onUploadProgress: ({ loaded, total }) =>
            setUploadProgress(Math.round((loaded * 100) / total)),
        });

        if (res.data?.success) {
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          toast.success(res.data.message);
        }
      } catch (err) {
        console.error("Upload error:", err);
        toast.error(err.response?.data?.message || "Video upload failed");
      } finally {
        setMediaProgress(false);
        setShowModal(false); 
        setBtnDisable(false);
      }
    }
  };

  const editLectureHandler = async () => {
    setBtnDisable(true);
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      courseId,
      lectureId,
      isPreviewFree: isFree,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      setBtnDisable(false);
    }
    if (error) {
      toast.error(error.data?.message);
      setBtnDisable(false);
    }
  }, [data, isSuccess, error]);

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData?.message);
      // navigate(`/admin/course/${courseId}/lecture`);
      navigate(-1);
    }
    if (removeError) {
      toast.error(removeError?.data.message);
    }
  }, [removeSuccess, removeLoading]);

  return (
    <>
      {/* Modal Uploading Video */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80 text-center space-y-4">
            <img
              src="/images/Loading.gif"
              alt="Loading animation"
              className="w-24 h-24 mx-auto"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Please wait while uploading...
            </p>
          </div>
        </div>
      )}

      {/* Modal Confirm Delete */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[300px] text-center"
            >
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Confirm Delete
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Are you sure you want to delete this lecture?
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 rounded-md transition"
                >
                  Cancel
                </button>
                <button
                  onClick={removeLectureHandler}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
                >
                  {removeLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="mt-1 h-4 w-4 animate-spin" />
                      Please wait...
                    </div>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <Card className="p-4 shadow-md space-y-6 bg-white dark:bg-gray-900">
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="font-bold text-3xl text-purple-800 dark:text-purple-400 mb-2">
              Edit Lecture
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300">
              Update the details of your lecture below.
            </CardDescription>
          </div>
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={() => setShowConfirm(true)}
            className="rounded-md px-4 py-2 bg-red-500 dark:bg-red-500 dark:hover:bg-red-600 hover:bg-red-800 text-white transition-all duration-200"
          >
            Remove Lecture
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Lecture Title */}
          <div className="space-y-2">
            <Label
              htmlFor="lecture-title"
              className="font-semibold text-gray-900 dark:text-gray-200"
            >
              Title
            </Label>
            <Input
              id="lecture-title"
              placeholder="Ex. Introduction to JavaScript"
              value={lectureTitle}
              onChange={(e) => setLectureTitle(e.target.value)}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* Video Upload */}
          <div className="space-y-2">
            <Label
              htmlFor="lecture-video"
              className="font-semibold text-gray-900 dark:text-gray-200"
            >
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              id="lecture-video"
              type="file"
              accept="video/*"
              onChange={fileChangeHandler}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* Free Switch */}
          <div className="flex items-center gap-2">
            <Switch id="is-free" checked={isFree} onCheckedChange={setIsFree} />
            <Label
              htmlFor="is-free"
              className="text-gray-900 dark:text-gray-200"
            >
              Is this video FREE
            </Label>
          </div>

          {/* Uploaded Video Preview */}
          {uploadVideoInfo?.videoUrl && (
            <div className="space-y-2">
              <Label className="font-semibold text-gray-900 dark:text-gray-200">
                Uploaded Video Preview
              </Label>
              <ReactPlayer
                url={uploadVideoInfo.videoUrl}
                width="100%"
                height="100%"
                controls={true}
                className="w-full max-w-md rounded-md shadow-md"
              />
            </div>
          )}

          {/* Update Button */}
          <div>
            <Button
              onClick={editLectureHandler}
              disabled={btnDisable}
              className="bg-purple-600 hover:bg-purple-700 text-white dark:bg-purple-700 dark:hover:bg-purple-800 rounded-md py-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mt-1 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Update Lecture"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LectureTab;
