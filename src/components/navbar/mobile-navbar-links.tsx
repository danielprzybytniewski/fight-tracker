import Link from "next/link";
import { motion } from "framer-motion";
import { useActiveLink } from "@/hooks/use-active-link";
import { navbarItemVariants } from "@/lib/framer-motion-variants";
import { cn } from "@/lib/utils";

type MobileNavbarLinksProps = {
  href: string;
  label: string;
  onItemClick: () => void;
};

export default function MobileNavbarLinks({
  href,
  label,
  onItemClick,
}: MobileNavbarLinksProps) {
  const isActive = useActiveLink(href);

  return (
    <motion.div variants={navbarItemVariants}>
      <Link
        href={href}
        className={cn(
          `text-lg text-gray-900 transition-colors duration-200 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400 md:text-xl`,
          isActive && "font-bold",
        )}
        onClick={onItemClick}
      >
        {label}
      </Link>
    </motion.div>
  );
}
