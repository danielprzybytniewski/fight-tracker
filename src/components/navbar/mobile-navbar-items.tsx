import { motion } from "framer-motion";
import Link from "next/link";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import ModeToggler from "@/components/navbar/mode-toggler";

type MobileNavbarItemsProps = {
  onItemClick: () => void;
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const links = [
  { href: "/fighters", label: "UFC Fighters" },
  { href: "/rankings", label: "UFC Rankings" },
  { href: "/news", label: "News" },
];

export default function MobileNavbarItems({
  onItemClick,
}: MobileNavbarItemsProps) {
  return (
    <motion.div
      className="flex flex-col items-center space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      {links.map(({ href, label }) => (
        <motion.div variants={itemVariants} key={href}>
          <Link
            href={href}
            className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
            onClick={onItemClick}
          >
            {label}
          </Link>
        </motion.div>
      ))}
      <motion.div variants={itemVariants} onClick={onItemClick}>
        <FavoritesCounter />
      </motion.div>
      <motion.div variants={itemVariants} onClick={onItemClick}>
        <ModeToggler />
      </motion.div>
    </motion.div>
  );
}
