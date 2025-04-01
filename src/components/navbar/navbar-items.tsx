import Link from "next/link";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import ModeToggler from "@/components/navbar/mode-toggler";

export default function NavbarItems() {
  return (
    <>
      <Link
        href="/fighters"
        className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 
        transition-colors duration-200"
      >
        UFC Fighters
      </Link>
      <Link
        href="/rankings"
        className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 
        transition-colors duration-200"
      >
        UFC Rankings
      </Link>
      <Link
        href="/news"
        className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 
        transition-colors duration-200"
      >
        News
      </Link>
      <FavoritesCounter />
      <ModeToggler />
    </>
  );
}
