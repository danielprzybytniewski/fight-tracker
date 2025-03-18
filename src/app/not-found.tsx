import Link from "next/link";
import notFoundImg from "@/public/images/not-found.png";
import Image from "next/image";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-2 text-center bg-gray-100 dark:bg-gray-900 
      text-red-500"
    >
      <Image
        src={notFoundImg}
        alt="not found"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-center mb-6">
        Sorry, we could not find the page you are looking for.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 text-white rounded-md"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
