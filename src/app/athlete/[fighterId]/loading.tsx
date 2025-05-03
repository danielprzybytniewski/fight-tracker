export default function AthleteLoading() {
  return (
    <div
      className="container mx-auto max-w-6xl rounded-lg bg-gray-50 p-4 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <div className="flex w-fit animate-pulse items-center space-x-2">
        <div className="h-7 w-7 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <div className="animate-pulse text-center">
        <div className="grid grid-cols-1 gap-8 p-6">
          <div>
            <div className="relative mx-auto h-72 w-3/4 rounded-lg bg-gray-300 dark:bg-gray-700 sm:h-96" />
            <div className="mx-auto mb-4 mt-8 h-10 w-full rounded bg-gray-300 dark:bg-gray-700 sm:w-1/2" />
            <div className="mx-auto mb-4 mt-6 h-10 w-full rounded bg-gray-300 dark:bg-gray-700 sm:w-1/2" />
            <div className="mx-auto mb-6 h-6 w-full rounded bg-gray-300 dark:bg-gray-700 sm:w-1/3" />
            <div className="grid grid-cols-2 gap-5">
              {Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-100 p-4 shadow-md dark:bg-gray-800"
                >
                  <div className="mb-2 h-6 rounded bg-gray-300 dark:bg-gray-700" />
                  <div className="h-4 rounded bg-gray-300 dark:bg-gray-700" />
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-6">
              <div className="mx-auto h-8 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex h-full flex-col justify-between rounded-2xl bg-gray-50 p-4 shadow-md dark:bg-gray-800/80"
                  >
                    <div className="mb-4 h-6 rounded bg-gray-300 dark:bg-gray-700" />
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
