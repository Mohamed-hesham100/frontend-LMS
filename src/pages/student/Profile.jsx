import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Profile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const onChangeHandlerFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
    }
  };

  const { data, isLoading, refetch } = useLoadUserQuery();
  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfilePhoto("");
    }
  }, [data, isLoading]);

  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setOpenDialog(false);
      toast.success(updateUserData.message || "Profile updated.");
    }
    if (isError)
      toast.error(
        error?.data?.message || error?.message || "Failed to update profile."
      );
  }, [error, updateUserData, isSuccess]);

  if (isLoading)
    return <h1 className="text-center text-3xl mt-20">Loading Profile...</h1>;

  const user = data?.user;

return (
  <div className="my-24 max-w-6xl mx-auto px-4">
    <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center mb-4 text-gray-900 dark:text-gray-100">
      Welcome to Your <span className="text-purple-600 dark:text-purple-400">Profile</span>
    </h1>
    <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
      Manage your personal information and track your progress.
    </p>
    <div className="border-b-2 border-purple-300 dark:border-purple-500 w-24 mx-auto mb-5"></div>

    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md">
      <Avatar className="w-36 h-36 md:w-48 md:h-48 border-4 border-purple-500 shadow-lg hover:scale-105 transition-transform duration-500">
        <AvatarImage
          src={
            user?.photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="Profile Picture"
        />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-4 mt-6 text-center md:text-left">
        <ProfileInfo label="Name" value={user?.name} />
        <ProfileInfo label="Email" value={user?.email} />
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-purple-600 text-white shadow-md">
          {user?.role?.toUpperCase()}
        </span>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="mt-4 md:mt-0 bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:border-purple-600 transition duration-300">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent className="dark:bg-gray-900">
          <DialogHeader>
            <DialogTitle className="dark:text-white">Edit Profile</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Update your information below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="dark:text-white">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new name"
                className="col-span-3 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="dark:text-white">Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={onChangeHandlerFile}
                className="col-span-3 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={updateUserIsLoading}
              onClick={updateUserHandler}
              className="mt-4 md:mt-0 bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:border-purple-600 transition duration-300"
            >
              {updateUserIsLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    {/* Courses Section */}
    <div className="mt-16">
      <h2 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-center mb-4 text-gray-900 dark:text-white">
        My Enrolled <span className="text-purple-600 dark:text-purple-400">Courses</span>
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
        Manage your personal information and track your progress.
      </p>
      <div className="border-b-2 border-purple-300 dark:border-purple-500 w-24 mx-auto mb-5"></div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-52 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md"
            ></div>
          ))}
        </div>
      ) : user?.enrolledCourse?.length === 0 ? (
        <NoCoursesFound />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {user.enrolledCourse.map((course) => (
            <motion.div
              key={course._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Course course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  </div>
);

};

const ProfileInfo = ({ label, value }) => (
  <div className="flex flex-col md:flex-row md:items-center md:gap-2">
    <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">{label}:</span>
    <span className="text-base text-gray-700 dark:text-gray-400">{value}</span>
  </div>
);

export const NoCoursesFound = () => (
  <div className="text-center py-10">
    <img
      src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
      alt="No Courses"
      className="w-24 mx-auto mb-4"
    />
    <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
      No courses yet!
    </h3>
    <p className="text-base text-gray-500 dark:text-gray-400">
      Explore courses to start your learning journey.
    </p>
  </div>
);


export default Profile;
