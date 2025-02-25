import Link from "next/link";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import ModeToggler from "@/components/navbar/mode-toggler";

type MobileNavbarItemsProps = {
  onItemClick: () => void;
};

export default function MobileNavbarItems({
  onItemClick,
}: MobileNavbarItemsProps) {
  return (
    <>
      <Link
        href="/rankings"
        className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
        onClick={onItemClick}
      >
        UFC Rankings
      </Link>
      <div onClick={onItemClick}>
        <FavoritesCounter />
      </div>
      <div onClick={onItemClick}>
        <ModeToggler />
      </div>
    </>
  );
}
