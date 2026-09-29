import { cn } from "@/lib/utils";

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "blue" | "green" | "amber" | "red" | "indigo" }) {
  return <span className={cn("status-pill", `status-${tone}`)}>{children}</span>;
}