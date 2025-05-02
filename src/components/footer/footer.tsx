import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-300 p-4 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
      <div className="container mx-auto text-center">
        <p>
          <span className="mr-1">Created with 💖 by</span>
          <Link
            href={"https://github.com/danielprzybytniewski/fight-tracker"}
            className="font-bold underline transition-colors duration-200 hover:text-gray-500 dark:hover:text-gray-400"
            target="_blank"
            rel="noopener noreferrer"
          >
            Daniel Przybytniewski
          </Link>
        </p>
        <p className="text-sm">Copyright © 2025 - All rights reserved</p>
      </div>
    </footer>
  );
}
