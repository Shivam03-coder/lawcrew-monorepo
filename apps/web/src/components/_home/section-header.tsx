import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classNames

interface SectionHeaderProps {
  title: string;
  description?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  titleClassName?: string;
  descriptionClassName?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  subtitle,
  align = "center",
  titleClassName,
  descriptionClassName,
  className,
}) => {
  return (
<header
  className={cn(
    "mx-auto flex flex-col gap-2",
    align === "center" && "items-center text-center",
    align === "left" && "items-start text-left",
    align === "right" && "items-end text-right",
    className
  )}
>
  {subtitle && (
    <p className="text-sm text-muted-foreground dark:text-gray-400">
      {subtitle}
    </p>
  )}
  <h3
    className={cn(
      "text-3xl bg-gradient-to-r from-blue-600 via-black to-blue-600 bg-clip-text font-normal font-lexend dark:from-blue-400 dark:via-gray-200 dark:to-blue-400",
      titleClassName
    )}
  >
    {title}
  </h3>
  {description && (
    <p
      className={cn(
        "text-gray-600 opacity-80 hidden lg:block dark:text-gray-300",
        descriptionClassName
      )}
    >
      {description}
    </p>
  )}
</header>

  );
};

export default SectionHeader;
