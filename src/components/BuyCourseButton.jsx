import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { useCreateCheckoutSessionMutation } from "@/features/api/purchaseApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [
    createCheckoutSession,
    { data, isLoading, isSuccess, isError, error },
  ] = useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession({ courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Invalid response from server");
      }
    }

    if (isError) {
      toast.error(error?.data.message || "Faild to create checkout");
    }
  }, [data, isSuccess, isError, error]);
  return (
    <Button
      disabled={isLoading}
      onClick={purchaseCourseHandler}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold py-2 rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md"
    >
      {isLoading ? (
        <>
          <Loader2 className="mt-1 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        " Enroll Now"
      )}
    </Button>
  );
};

export default BuyCourseButton;
