import { useActiveLink } from "@/hooks/use-active-link";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { navbarItemVariants } from "@/lib/framer-motion-variants";

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
          `text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors 
          duration-200
         `,
          isActive && "font-bold"
        )}
        onClick={onItemClick}
      >
        {label}
      </Link>
    </motion.div>
  );
}
