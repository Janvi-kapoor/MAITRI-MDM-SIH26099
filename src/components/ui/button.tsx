import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger"; size?: "sm" | "md" | "icon" };

export function Button({ className, variant = "primary", size = "md", ...props }: Props) {
  return <button className={cn("btn", `btn-${variant}`, `btn-${size}`, className)} {...props} />;
}