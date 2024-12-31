import { ModeToggler } from "@/components/mode-toggler";
import ChangeLogo from "@/components/change-logo";
import Link from "next/link";
import FavoritesCounter from "@/components/favorites-counter";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between bg-zinc-300 dark:bg-gray-600 p-4 z-50">
      <ul className="flex items-center space-x-2 sm:space-x-3">
        <ChangeLogo />
        <li>
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">Fight Tracker</h1>
          </Link>
        </li>
      </ul>
      <div className="flex items-center space-x-2 sm:space-x-3">
        <FavoritesCounter />
        <ModeToggler />
      </div>
    </nav>
  );
}
