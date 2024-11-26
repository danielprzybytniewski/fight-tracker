import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-300 dark:bg-gray-600 p-4 ">
      <div className="container mx-auto text-center">
        <p>
          Created with 💖 by{" "}
          <Link
            href={"https://github.com/danielprzybytniewski"}
            className="underline"
          >
            Daniel Przybytniewski
          </Link>
        </p>
        <p className="text-sm">Copyright © 2024 - All rights reserved</p>
      </div>
    </footer>
  );
}
