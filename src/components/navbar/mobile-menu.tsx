"use client";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import ChangeLogo from "@/components/navbar/change-logo";
import Link from "next/link";
import MobileNavbarItems from "@/components/navbar/mobile-navbar-items";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="sm:hidden flex items-center"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-8 h-8 text-gray-800 dark:text-gray-200" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="[&>button:first-child]:hidden p-6 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 
        dark:from-gray-800 dark:via-gray-900 dark:to-black shadow-2xl"
      >
        <SheetTitle className="flex flex-row items-center space-x-3 mb-4">
          <ChangeLogo />
          <SheetClose asChild>
            <Link
              href="/"
              className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100"
              onClick={handleClose}
            >
              Fight Tracker
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <button
              className="absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              aria-label="Close mobile menu"
            >
              <X className="w-7 h-7 text-gray-600 dark:text-gray-300" />
            </button>
          </SheetClose>
        </SheetTitle>
        <SheetDescription className="text-center text-xl font-medium my-4 border-b border-gray-400 dark:border-gray-600 pb-3 text-gray-700 dark:text-gray-400">
          Menu
        </SheetDescription>
        <div className="flex flex-col items-center space-y-5 mt-6">
          <MobileNavbarItems onItemClick={handleClose} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
