import Link from "next/link";
import { useActiveLink } from "@/hooks/use-active-link";
import { cn } from "@/lib/utils";

type NavbarLinksProps = {
  href: string;
  label: string;
};

export default function NavbarLinks({ href, label }: NavbarLinksProps) {
  const isActive = useActiveLink(href);

  return (
    <Link
      href={href}
      className={cn(
        `text-lg text-gray-900 transition-colors duration-200 hover:text-gray-500 dark:text-gray-100 dark:hover:text-gray-400 md:text-xl`,
        isActive && "font-bold",
      )}
    >
      {label}
    </Link>
  );
}
