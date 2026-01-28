import type { HTMLAttributes, ReactNode } from "react";

type SurfaceCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function SurfaceCard({ className, children, ...props }: SurfaceCardProps) {
  return (
    <div
      {...props}
      className={[
        "group rounded-2xl border border-black/[.08] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/[.145] dark:bg-black dark:hover:bg-[#1a1a1a]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
