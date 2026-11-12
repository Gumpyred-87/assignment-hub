import * as React from "react";
import { cn } from "@/lib/utils";

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
}
CardFooter.displayName = "CardFooter";

export { CardFooter };