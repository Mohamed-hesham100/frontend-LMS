import React, { useEffect, useState } from "react";
import { Menu, School } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DarkMode from "@/pages/DarkMode";
import { Separator } from "@/components/ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { useSelector } from "react-redux";
// import { userLoggedOut } from "@/features/authSlice";

const Navbar = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
      // dispatch(userLoggedOut()); // مش لازم هنا، لأنه هيتعامل معاه داخل onQueryStarted
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 z-50 w-full duration-300">
      {/* Desktop */}
      <div className="hidden max-w-7xl mx-auto md:flex items-center justify-between gap-10 h-full">
        {/* Logo */}
        <Link to="/">
          {" "}
          <div className="flex items-center gap-3">
            <School size={30} className="text-purple-500" />
            <h1 className="font-extrabold text-2xl">EduGate-Learnify</h1>
          </div>
        </Link>
        {/* User controls */}
        <div className="flex items-center  gap-5">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={
                      user?.photoUrl 
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="my-learning">My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <DropdownMenuItem
                    onClick={() => navigate("/admin/dashboard")}
                    className="p-2 mt-2 w-full bg-purple-500 text-white shadow-md hover:bg-purple-700 hover:border-purple-600 transition duration-300 cursor-pointer"
                  >
                    Dashboard
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                onClick={() => navigate("/login")}
                className="mt-4 md:mt-0 bg-purple-600 text-white shadow-md hover:bg-purple-700 hover:border-purple-600 transition duration-300"
              >
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>
      {/* Mobile  */}
      <div className="md:hidden flex items-center justify-between px-4 h-full ">
        <h1 className="font-extrabold text-2xl">EduGate-Learnify</h1>
        <MobileNavbar />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="!rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 duration-200 cursor-pointer"
          variant="outline"
        >
          <Menu className="text-black dark:text-white" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex flex-col p-3 bg-white dark:bg-[#0A0A0A] text-black dark:text-white"
      >
        {/* Header */}
        <SheetHeader className="flex flex-row items-center justify-between mt-4">
          <SheetTitle className="text-lg font-bold">EduGate-Learnify</SheetTitle>
          <DarkMode />
        </SheetHeader>

        <Separator className="my-4 dark:bg-gray-700" />

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 mt-4">
          {user ? (
            <>
              <SheetClose asChild>
                <Link
                  to="/my-learning"
                  className="text-left w-full px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  My Learning
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link
                  to="/profile"
                  className="text-left w-full px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Edit Profile
                </Link>
              </SheetClose>

              <Button
                onClick={logoutHandler}
                variant="ghost"
                className="justify-start text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Log out
              </Button>

              {user.role === "instructor" && (
                <SheetFooter className="mt-4">
                  <SheetClose asChild>
                    <Link to="/admin/dashboard" className="w-full">
                      <Button className="p-2 mt-2 w-full bg-purple-600 text-white hover:bg-purple-700 transition">
                        Dashboard
                      </Button>
                    </Link>
                  </SheetClose>
                </SheetFooter>
              )}
            </>
          ) : (
            <>
              <SheetClose asChild>
                <Button
                  asChild
                  variant="outline"
                  className="w-full justify-start px-4 py-2 text-left dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
                >
                  <Link to="/login">Login</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full justify-start bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  <Link to="/login">Signup</Link>
                </Button>
              </SheetClose>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

