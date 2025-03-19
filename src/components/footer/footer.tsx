import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full p-4 text-gray-800 dark:text-gray-200 bg-gray-300 dark:bg-gray-700">
      <div className="container mx-auto text-center">
        <p>
          Created with 💖 by&nbsp;
          <Link
            href={"https://github.com/danielprzybytniewski/fight-tracker"}
            className="underline hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
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
