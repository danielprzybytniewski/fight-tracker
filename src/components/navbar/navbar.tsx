import ChangeLogo from "@/components/navbar/change-logo";
import Link from "next/link";
import NavbarItems from "@/components/navbar/navbar-items";
import MobileMenu from "@/components/navbar/mobile-menu";
import { routesConfig } from "@/config/routes-config";

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 z-50 w-full p-4 text-gray-800 dark:text-gray-200 bg-gray-300 dark:bg-gray-700 
    shadow-md"
    >
      <div className="flex justify-between items-center">
        <ul className="flex items-center space-x-2 lg:space-x-3">
          <li>
            <ChangeLogo />
          </li>
          <li>
            <Link
              href={routesConfig.root}
              className="text-3xl lg:text-4xl font-bold"
            >
              Fight Tracker
            </Link>
          </li>
        </ul>
        <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
          <NavbarItems />
        </div>
        <MobileMenu />
      </div>
    </nav>
  );
}
