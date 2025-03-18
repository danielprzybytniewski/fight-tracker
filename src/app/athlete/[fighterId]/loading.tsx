export default function AthleteLoading() {
  return (
    <div
      className="container mx-auto p-4 max-w-6xl bg-white dark:bg-gray-900 rounded-lg"
      aria-label="loading-container"
    >
      <div className="flex items-center space-x-2 w-fit animate-pulse">
        <div className="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <div className="animate-pulse text-center">
        <div className="grid grid-cols-1 gap-8 p-6">
          <div>
            <div className="relative h-72 sm:h-96 w-3/4 mx-auto bg-gray-300 dark:bg-gray-700 rounded-lg" />
            <div className="h-10 w-full sm:w-1/2 mx-auto mb-4 mt-8 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-10 w-full sm:w-1/2 mx-auto mb-4 mt-6 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-6 w-full sm:w-1/3 mx-auto mb-6 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
                >
                  <div className="h-6 mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-6">
              <div className="h-8 w-1/2 mx-auto bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between h-full p-4 bg-gray-50 dark:bg-gray-800/80 shadow-md rounded-2xl"
                  >
                    <div className="h-6 mb-4 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
                      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
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
