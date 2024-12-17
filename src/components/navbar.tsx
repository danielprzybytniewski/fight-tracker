import { ModeToggler } from "@/components/mode-toggler";
import ChangeLogo from "@/components/change-logo";
import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between bg-zinc-300 dark:bg-gray-600 p-4 z-50">
      <ul className="flex items-center space-x-4">
        <ChangeLogo />
        <li>
          <Link href="/">
            <h1 className="text-2xl font-bold cursor-pointer">Fight Tracker</h1>
          </Link>
        </li>
      </ul>
      <ModeToggler />
    </nav>
  );
}
