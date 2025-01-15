import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-red-500 
      text-center p-2"
    >
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-center mb-6">
        Sorry, we could not find the page you are looking for.
      </p>
      <Link
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
