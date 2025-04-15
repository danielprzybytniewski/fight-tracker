import { useActiveLink } from "@/hooks/use-active-link";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
        `text-lg md:text-xl text-gray-900 dark:text-gray-100 hover:text-gray-500 dark:hover:text-gray-400 transition-colors 
        duration-200`,
        isActive && "font-bold"
      )}
    >
      {label}
    </Link>
  );
}
