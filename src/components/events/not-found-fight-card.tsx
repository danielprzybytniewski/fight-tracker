import Image from "next/image";
import Link from "next/link";
import { routesConfig } from "@/config/routes-config";
import notFoundImg from "@/public/images/not-found.png";

export default function NotFoundFightCard() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 text-center text-red-500">
      <Image
        src={notFoundImg}
        alt="not found"
        width={200}
        height={200}
        priority
      />
      <p className="mb-3 text-3xl font-bold">Event Not Found!</p>
      <p className="text-xl font-semibold">
        The event you are looking for does not exist
      </p>
      <Link
        href={routesConfig.root}
        className="mt-4 rounded-md bg-gray-400 px-4 py-2 text-white hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
