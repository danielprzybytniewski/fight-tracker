import Link from "next/link";
import FavoritesCounter from "@/components/favorites-counter";
import ModeToggler from "@/components/mode-toggler";

type MobileNavbarItemsProps = {
  onItemClick: () => void;
};

export default function MobileNavbarItems({
  onItemClick,
}: MobileNavbarItemsProps) {
  return (
    <>
      <Link href="/rankings" onClick={onItemClick}>
        <p className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200">
          UFC Rankings
        </p>
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
