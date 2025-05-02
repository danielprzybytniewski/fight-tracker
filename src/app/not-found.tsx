import Image from "next/image";
import Link from "next/link";
import { routesConfig } from "@/config/routes-config";
import notFoundImg from "@/public/images/not-found.png";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-2 text-center text-red-500 dark:bg-gray-900">
      <Image
        src={notFoundImg}
        alt="not found"
        width={200}
        height={200}
        priority
      />
      <h1 className="mb-4 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-6 text-center text-lg">
        Sorry, we could not find the page you are looking for.
      </p>
      <Link
        href={routesConfig.root}
        className="rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
