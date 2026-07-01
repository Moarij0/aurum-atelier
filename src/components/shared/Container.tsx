import { cn } from "@/lib/cn";

/** Max-width 1440px, responsive outer margin (Ch.3 Grid System). */
export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-20", className)}>
      {children}
    </div>
  );
}
