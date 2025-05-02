"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ChangeLogo from "@/components/navbar/change-logo";
import MobileNavbarItems from "@/components/navbar/mobile-navbar-items";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routesConfig } from "@/config/routes-config";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="flex items-center lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-8 w-8 text-gray-800 dark:text-gray-200" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 p-6 shadow-2xl dark:from-gray-800 dark:via-gray-900 dark:to-black [&>button:first-child]:hidden"
      >
        <SheetTitle className="mb-4 flex flex-row items-center justify-center space-x-3">
          <ChangeLogo />
          <SheetClose asChild>
            <Link
              href={routesConfig.root}
              className="text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-3xl"
              onClick={handleClose}
            >
              Fight Tracker
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <button
              className="absolute right-0 top-0 rounded-full p-1 transition-colors duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Close mobile menu"
            >
              <X className="h-7 w-7 text-gray-600 dark:text-gray-300" />
            </button>
          </SheetClose>
        </SheetTitle>
        <SheetDescription className="my-4 border-b border-gray-400 pb-3 text-center text-xl font-medium text-gray-700 dark:border-gray-600 dark:text-gray-400">
          Menu
        </SheetDescription>
        <MobileNavbarItems onItemClick={handleClose} />
      </SheetContent>
    </Sheet>
  );
}
