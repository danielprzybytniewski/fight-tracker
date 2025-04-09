export default function AthleteLoading() {
  return (
    <div
      className="container mx-auto p-4 max-w-6xl rounded-lg bg-gray-50 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <div className="flex items-center space-x-2 w-fit animate-pulse">
        <div className="w-7 h-7 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="animate-pulse text-center">
        <div className="grid grid-cols-1 gap-8 p-6">
          <div>
            <div className="relative h-72 sm:h-96 w-3/4 mx-auto rounded-lg bg-gray-300 dark:bg-gray-700" />
            <div className="h-10 w-full sm:w-1/2 mx-auto mb-4 mt-8 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-10 w-full sm:w-1/2 mx-auto mb-4 mt-6 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-6 w-full sm:w-1/3 mx-auto mb-6 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 shadow-md"
                >
                  <div className="h-6 mb-2 rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="h-4 rounded bg-gray-300 dark:bg-gray-700" />
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-6">
              <div className="h-8 w-1/2 mx-auto rounded bg-gray-300 dark:bg-gray-700" />
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between h-full p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/80 shadow-md"
                  >
                    <div className="h-6 mb-4 rounded bg-gray-300 dark:bg-gray-700" />
                    <div className="space-y-2">
                      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
                      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
                      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
                      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
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
