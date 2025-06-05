import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { BookOpen, ShoppingCart, Wallet, Users } from "lucide-react";
import { useGetPurchasedCourseDashBoardQuery } from "@/features/api/purchaseApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const {
    data: dataCoursePurches,
    isSuccess,
    isError,
    isLoading,
    refetch,
  } = useGetPurchasedCourseDashBoardQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <h1 className="text-gray-600 dark:text-gray-300 font-semibold">Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 className="text-red-500 font-semibold">
        Failed to get purchased courses
      </h1>
    );
  }

  const {
    totalCourses,
    totalStudents,
    totalRevenue,
    purchasedCourse,
    dailyRevenue,
    soldCourses,
  } = dataCoursePurches;

  const chartData = dailyRevenue?.map((item) => ({
    name: item.date,
    value: item.value,
  }));

  const totalSales = purchasedCourse.length;

  const courseSalesMap = {};
  purchasedCourse.forEach((purchase) => {
    const id = purchase.courseId._id;
    courseSalesMap[id] = (courseSalesMap[id] || 0) + 1;
  });

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-zinc-900 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex items-center gap-2">
            <ShoppingCart className="text-purple-600" />
            <CardTitle className="text-zinc-900 dark:text-white">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              $ {totalSales}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Users className="text-purple-600" />
            <CardTitle className="text-zinc-900 dark:text-white">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {totalStudents}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <BookOpen className="text-purple-600" />
            <CardTitle className="text-zinc-900 dark:text-white">Total Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              {totalCourses}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center gap-2">
            <Wallet className="text-purple-600 w-5 h-5" />
            <CardTitle className="text-zinc-900 dark:text-white">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-white">
              $ {totalRevenue}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">This month</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <Card>
        <CardHeader>
          <CardTitle className="text-zinc-900 dark:text-white">Sales This Week</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7c3aed"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="mt-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-zinc-900 dark:text-white">Purchased Courses</CardTitle>
            <Button variant="outline" asChild>
              <Link to="/dashboard/courses">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {soldCourses?.length > 0 ? (
                soldCourses.map((course, index) => (
                  <React.Fragment key={course._id}>
                    <li className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-zinc-900 dark:text-white">
                          {course.courseTitle}
                        </span>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          {courseSalesMap[course._id] || 0} students
                        </p>
                      </div>
                      <Link
                        to={`/admin/course/${course._id}`}
                        className="text-sm text-purple-600 hover:underline"
                      >
                        View Course
                      </Link>
                    </li>
                    {index !== soldCourses.length - 1 && <Separator />}
                  </React.Fragment>
                ))
              ) : (
                <li className="text-zinc-600 dark:text-zinc-400">
                  No Purchased courses available.
                </li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
