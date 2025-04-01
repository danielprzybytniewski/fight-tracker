import Link from "next/link";
import FavoritesCounter from "@/components/favorites/favorites-counter";
import ModeToggler from "@/components/navbar/mode-toggler";

const links = [
  { href: "/fighters", label: "UFC Fighters" },
  { href: "/rankings", label: "UFC Rankings" },
  { href: "/news", label: "News" },
];

export default function NavbarItems() {
  return (
    <>
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className="text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
        >
          {label}
        </Link>
      ))}
      <FavoritesCounter />
      <ModeToggler />
    </>
  );
}
