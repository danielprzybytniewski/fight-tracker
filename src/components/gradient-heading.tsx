import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const gradientHeadingVariants = cva(
  "font-bold text-center bg-gradient-to-r bg-clip-text text-transparent from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400",
  {
    variants: {
      size: {
        default: "text-2xl sm:text-4xl",
        large: "text-3xl sm:text-4xl",
      },
      spacing: {
        default: "pb-3 mb-2",
        large: "pb-3 my-2 sm:my-4",
      },
    },
    defaultVariants: {
      size: "default",
      spacing: "default",
    },
  }
);

const GradientHeading = ({
  children,
  size,
  spacing,
  className,
  component: Wrapper = "h1",
}: {
  children: React.ReactNode;
  className?: string;
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
} & VariantProps<typeof gradientHeadingVariants>) => (
  <Wrapper
    className={cn(gradientHeadingVariants({ size, spacing, className }))}
  >
    {children}
  </Wrapper>
);

export default GradientHeading;
