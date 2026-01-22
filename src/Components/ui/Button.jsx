
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

const Button = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : props.href ? "a" : "button";

    return (
      <Comp
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            /* Primary */
            "bg-blue-500 text-white hover:bg-blue-600 focus-visible:ring-blue-500":
              variant === "primary",

            /* Secondary */
            "bg-yellow-500 text-black hover:bg-yellow-400 focus-visible:ring-yellow-500":
              variant === "secondary",

            /* Outline */
            "border border-gray-300 text-gray-800 hover:bg-gray-100 focus-visible:ring-gray-400":
              variant === "outline",


/* Call / Meeting (Cal.com style) */
"bg-black text-white hover:bg-white hover:text-black border border-black focus-visible:ring-black":
  variant === "call",

            /* Success */
            "bg-green-500 text-white hover:bg-green-600 focus-visible:ring-green-500":
              variant === "success",

            /* Danger */
            "bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500":
              variant === "danger",

            /* Dark */
            "bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-gray-900":
              variant === "dark",

            /* Gradient (Call to action) */
            "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 focus-visible:ring-purple-500":
              variant === "gradient",
          },
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
