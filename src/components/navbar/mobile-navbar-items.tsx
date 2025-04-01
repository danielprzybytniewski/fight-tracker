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
      <motion.div variants={itemVariants}>
        <Link
          href="/fighters"
          className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
          onClick={onItemClick}
        >
          UFC Fighters
        </Link>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link
          href="/rankings"
          className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
          onClick={onItemClick}
        >
          UFC Rankings
        </Link>
      </motion.div>
      <motion.div variants={itemVariants}>
        <Link
          href="/news"
          className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
          onClick={onItemClick}
        >
          News
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} onClick={onItemClick}>
        <FavoritesCounter />
      </motion.div>
      <motion.div variants={itemVariants} onClick={onItemClick}>
        <ModeToggler />
      </motion.div>
    </motion.div>
  );
}
