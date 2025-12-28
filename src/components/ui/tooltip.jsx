import * as React from "react";
import { cn } from "@/lib/utils";

const TooltipProvider = ({ children, delayDuration = 200 }) => {
  return <>{children}</>;
};

const Tooltip = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative inline-block"
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { open })
      )}
    </div>
  );
};

const TooltipTrigger = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={cn("inline-block", className)} {...props}>
      {children}
    </div>
  );
});
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef(({ children, className, open, sideOffset = 4, ...props }, ref) => {
  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 px-3 py-1.5 text-sm text-white bg-gray-900 rounded-md shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "bottom-full left-1/2 -translate-x-1/2 mb-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
