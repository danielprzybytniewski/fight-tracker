export default function Loading() {
  return (
    <div className="container mx-auto p-4 max-w-6xl bg-white dark:bg-gray-900 rounded-lg">
      <div className="animate-pulse text-center">
        <div className="grid grid-cols-1 gap-8 p-6">
          <div>
            <div className="relative h-64 bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-6 w-3/4" />
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md"
                >
                  <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
