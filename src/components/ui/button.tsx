import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn-primary",
      primary: "btn-primary",
      destructive: "btn-danger",
      danger: "btn-danger",
      outline: "btn-secondary",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-ghost",
    },
    size: {
      default: "btn-md",
      md: "btn-md",
      sm: "btn-sm",
      lg: "btn-md",
      icon: "btn-icon",
      "icon-sm": "btn-icon",
      "icon-lg": "btn-icon",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});
Button.displayName = "Button";