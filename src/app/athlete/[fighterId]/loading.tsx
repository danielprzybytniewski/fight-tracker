export default function AthleteLoading() {
  return (
    <div
      className="container mx-auto p-4 max-w-6xl bg-white dark:bg-gray-900 rounded-lg"
      aria-label="loading-container"
    >
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
            <div className="mt-8 space-y-6">
              <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto" />
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800/80 shadow-md rounded-2xl h-full flex flex-col justify-between p-4"
                  >
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
