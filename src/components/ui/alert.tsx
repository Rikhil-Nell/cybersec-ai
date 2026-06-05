import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "warning" | "destructive" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-4 text-sm",
      variant === "warning" && "border-amber-200 bg-amber-50 text-amber-950",
      variant === "destructive" && "border-red-200 bg-red-50 text-red-950",
      variant === "default" && "border-[var(--color-border)] bg-white",
      className,
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

export { Alert };
