import { motion } from "framer-motion";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import MobileNavbarLinks from "@/components/navbar/mobile-navbar-links";
import ModeToggler from "@/components/navbar/mode-toggler";
import { linksConfig } from "@/config/routes-config";
import { navbarItemVariants } from "@/lib/framer-motion-variants";

type MobileNavbarItemsProps = {
  onItemClick: () => void;
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
      {linksConfig.map(({ href, label }) => (
        <MobileNavbarLinks
          key={href}
          href={href}
          label={label}
          onItemClick={onItemClick}
        />
      ))}
      <motion.div variants={navbarItemVariants} onClick={onItemClick}>
        <FavoritesCounter />
      </motion.div>
      <motion.div variants={navbarItemVariants} onClick={onItemClick}>
        <ModeToggler />
      </motion.div>
    </motion.div>
  );
}
