// import RichTextEditer from "@/components/RichTextEditer";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditCourseMutation,
  useGetCourseByIdQuery,
  usePublishCourseMutation,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const CourseTab = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const {
    data: courseByIdData,
    isLoading: courseByIdLoading,
    refetch,
  } = useGetCourseByIdQuery(courseId);

  const [publishCourse] = usePublishCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput((prev) => ({
        ...prev,
        courseThumbnail: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setInput((prev) => ({
      ...prev,
      courseThumbnail: "",
    }));
    setThumbnailPreview(null);
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    if (typeof input.courseThumbnail === "object") {
      formData.append("courseThumbnail", input.courseThumbnail);
    }
    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course?.courseTitle,
        subTitle: course?.subTitle,
        description: course?.description,
        category: course?.category,
        courseLevel: course?.courseLevel,
        coursePrice: course?.coursePrice,
        courseThumbnail: "",
      });
      setThumbnailPreview(course?.courseThumbnail);
    }
  }, [courseByIdData?.course]);

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course updated.");
      // navigate("/admin/course");
      refetch();
    }
    if (error) {
      const errorMessage = error?.data?.message || "Failed to update course";
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) {
    return <h1>Lodaing...</h1>;
  }

  const publishStateHandler = async (action) => {
    try {
      const response = await publishCourse({ courseId, query: action });
      if (response.data) {
        toast.success(response.data.message);
        refetch();
      }
    } catch (error) {
      toast.error(error.message || "Failed to publish or unpublish course");
    }
  };
  return (
    <Card className="shadow-md rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="font-bold text-3xl text-purple-800 dark:text-purple-400 mb-2">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
            Make changes to your course here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="space-x-2 space-y-2">
          <Button
            disabled={courseByIdData?.course?.lectures.length === 0}
            variant="outline"
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() =>
              publishStateHandler(
                courseByIdData?.course?.isPublished ? "false" : "true"
              )
            }
          >
            {courseByIdData?.course?.isPublished ? "Publish" : "UnPublish"}
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-700 px-6 py-2 rounded">
            Remove
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Title
            </Label>
            <Input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack Developer"
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SubTitle
            </Label>
            <Input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Learn Fullstack in 2 months"
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </Label>
            <Textarea
              name="description"
              value={input.description}
              onChange={changeEventHandler}
              placeholder="Write a detailed description of the course..."
              rows={6}
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category */}
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </Label>
              <Select
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, category: value }))
                }
                value={input.category}
              >
                <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:text-white">
                  <SelectGroup>
                    <SelectLabel className="dark:text-gray-300">
                      Programming Courses
                    </SelectLabel>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="react">React.js</SelectItem>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="html">Html</SelectItem>
                    <SelectItem value="docker">Docker</SelectItem>
                    <SelectItem value="fultter">Flutter</SelectItem>
                    <SelectItem value="dart">Dart</SelectItem>
                    <SelectItem value="js">Js</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="ai">Ai</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel className="dark:text-gray-300">
                      Marketing Courses
                    </SelectLabel>
                    <SelectItem value="digital-marketing">
                      Digital Marketing
                    </SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="social-media">
                      Social Media Marketing
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Level */}
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Level
              </Label>
              <Select
                onValueChange={(value) =>
                  setInput((prev) => ({ ...prev, courseLevel: value }))
                }
                value={input.courseLevel}
              >
                <SelectTrigger className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:text-white">
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="flex-1">
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (EGP)
              </Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                min="0"
                className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Thumbnail
            </Label>
            <Input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg"
            />
            {thumbnailPreview && (
              <div className="relative mt-3 w-50 h-50">
                <img
                  src={thumbnailPreview}
                  alt="Course thumbnail"
                  className="w-full h-full object-cover rounded-lg border dark:border-gray-600"
                />
                <button
                  onClick={removeThumbnail}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end">
            <Button
              onClick={() => navigate("/admin/course")}
              variant="outline"
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded"
              onClick={updateCourseHandler}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-1" /> Please wait
                </>
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;
