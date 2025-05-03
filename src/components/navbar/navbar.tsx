import Link from "next/link";
import ChangeLogo from "@/components/navbar/change-logo";
import MobileMenu from "@/components/navbar/mobile-menu";
import NavbarItems from "@/components/navbar/navbar-items";
import { routesConfig } from "@/config/routes-config";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 w-full bg-gray-300 p-4 text-gray-800 shadow-md dark:bg-gray-700 dark:text-gray-200">
      <div className="flex items-center justify-between">
        <ul className="flex items-center space-x-2 lg:space-x-3">
          <li>
            <ChangeLogo />
          </li>
          <li>
            <Link
              href={routesConfig.root}
              className="text-3xl font-bold lg:text-4xl"
            >
              Fight Tracker
            </Link>
          </li>
        </ul>
        <div className="hidden items-center space-x-2 lg:flex lg:space-x-4">
          <NavbarItems />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
