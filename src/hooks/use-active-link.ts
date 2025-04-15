"use client";
import { usePathname } from "next/navigation";

export const useActiveLink = (href: string): boolean => {
  const pathname = usePathname();

  const isActive = pathname === href || pathname?.startsWith(`${href}/`);
  return isActive;
};
