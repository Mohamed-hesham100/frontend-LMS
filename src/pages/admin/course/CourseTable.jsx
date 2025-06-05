import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCoursesQuery } from "@/features/api/courseApi";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetCreatorCoursesQuery();

  if (isLoading)
    return <h1 className="text-center mt-10 text-purple-600 dark:text-purple-400">Loading...</h1>;
  if (error)
    return <h1 className="text-center mt-10 text-red-500 dark:text-red-400">Error: {error?.message}</h1>;

  const courses = data?.courses || [];

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md mt-15 md:mt-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-0">
          Your Courses
        </h2>
        <Button
          className="bg-purple-600 text-white hover:bg-purple-700 dark:hover:bg-purple-500 px-4 sm:px-6 py-2 rounded-md text-sm"
          onClick={() => navigate("create")}
        >
          Create New Course
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table className="w-full text-sm text-gray-800 dark:text-gray-200">
          <TableCaption className="text-base text-gray-500 dark:text-gray-400 mb-2">
            A list of your created courses.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-white">
              <TableHead className="w-[180px] font-medium">Title</TableHead>
              <TableHead className="font-medium">Category</TableHead>
              <TableHead className="font-medium">Level</TableHead>
              <TableHead className="font-medium">Price</TableHead>
              <TableHead className="font-medium">Status</TableHead>
              <TableHead className="text-right font-medium">Created At</TableHead>
              <TableHead className="text-center font-medium">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-gray-500 dark:text-gray-400">
                  No courses found.
                </TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course._id} className="hover:bg-purple-50 dark:hover:bg-gray-800 transition-colors">
                  <TableCell className="font-medium">{course.courseTitle}</TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.courseLevel || "N/A"}</TableCell>
                  <TableCell>
                    {course.coursePrice ? `$${course.coursePrice}` : "Free"}
                  </TableCell>
                  <TableCell>
                    {course.isPublished ? (
                      <span className="text-green-600 dark:text-green-400 font-semibold">Published</span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400 font-semibold">Unpublished</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        className="border-purple-400 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700 text-xs px-3 py-1"
                        onClick={() => navigate(`${course._id}`)}
                      >
                        Edit
                      </Button>
                      {/* <Button
                        variant="outline"
                        className="border-red-400 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700 text-xs px-3 py-1"
                      >
                        Delete
                      </Button> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>

          <TableFooter>
            <TableRow className="bg-purple-100 dark:bg-purple-800">
              <TableCell colSpan={7} className="text-right font-medium text-purple-700 dark:text-white py-3">
                Total: {courses.length} course{courses.length !== 1 ? "s" : ""}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default CourseTable;
