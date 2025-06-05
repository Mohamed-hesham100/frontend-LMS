import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import Sidebar from "../pages/admin/Sidebar";

// Pages - Student
import HeroSection from "../pages/student/HeroSection";
import Courses from "../pages/student/Courses";
import MyLearning from "../pages/student/MyLearning";
import Profile from "../pages/student/Profile";
import CourseDetails from "../pages/student/CourseDetails";
import CourseProgress from "../pages/student/CourseProgress";
import SearchPage from "../pages/student/SearchPage";

// Pages - Admin
import Dashboard from "../pages/admin/Dashboard";
import CourseTable from "../pages/admin/course/CourseTable";
import AddCourse from "../pages/admin/course/AddCourse";
import EditCourse from "../pages/admin/course/EditCourse";
import CreateLecture from "../pages/admin/lecture/createLecture";
import EditLecture from "../pages/admin/lecture/EditLecture";
import InstructorSettings from "../pages/admin/Settings";

// Authentication
import Login from "../pages/Login";

// Private Routes
import { ProtectedRoute, AdminRoute } from "../components/PrivateRoute";
import PurchaseCourseProtectedRoute from "../components/PurchaseCourseProtectedRoute";
import FeaturesSection from "@/components/FeaturesSection";
import AdminLayout from "@/layouts/AdminLayout";

const HomeElement = (
  <>
    <HeroSection />
    <div className="!dark:bg-[#0A0A0A]">
      <Courses />
    </div>

    <FeaturesSection />
  </>
);

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, //  Student Layout
    children: [
      {
        path: "/",
        element: HomeElement,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-details/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/course-details/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-learning/course-details/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
              <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },

  //  Admin Layout
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "course",
        element: <CourseTable />,
      },
      {
        path: "course/create",
        element: <AddCourse />,
      },
      {
        path: "course/:courseId",
        element: <EditCourse />,
      },
      {
        path: "course/:courseId/lecture",
        element: <CreateLecture />,
      },
      {
        path: "course/:courseId/lecture/:lectureId",
        element: <EditLecture />,
      },
      {
        path: "settings",
        element: <InstructorSettings />,
      },
    ],
  },

  // Not Found
  {
    path: "*",
    element: (
      <h1 className="mt-40 text-center font-bold text-lg">
        404 - Page Not Found
      </h1>
    ),
  },
]);
