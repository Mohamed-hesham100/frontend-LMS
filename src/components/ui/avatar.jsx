import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      ref={ref} // تمرير الـ ref هنا
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

const AvatarImage = ({ className, ...props }) => (
  <AvatarPrimitive.Image
    data-slot="avatar-image"
    className={cn("aspect-square size-full", className)}
    {...props}
  />
);

const AvatarFallback = ({ className, ...props }) => (
  <AvatarPrimitive.Fallback
    data-slot="avatar-fallback"
    className={cn("bg-muted flex size-full items-center justify-center rounded-full", className)}
    {...props}
  />
);

export { Avatar, AvatarImage, AvatarFallback };
