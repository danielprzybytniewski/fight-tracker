export default function NewsDetailLoading() {
  return (
    <div
      className="container mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8"
      aria-label="loading-container"
    >
      <div className="mb-5">
        <div className="h-7 w-7 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <article className="animate-pulse overflow-hidden rounded-xl bg-gray-50 shadow-lg dark:bg-gray-900">
        <div className="p-4 md:p-6">
          <div className="mx-auto h-8 w-3/4 rounded bg-gray-300 dark:bg-gray-700 md:h-10"></div>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-gray-700 dark:text-gray-300 md:text-sm">
            <div className="flex items-center">
              <div className="mr-1 h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <div className="h-40 rounded-xl bg-gray-300 dark:bg-gray-700 md:h-60 lg:h-80"></div>
            <div className="mt-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="mb-2 h-6 w-full rounded bg-gray-300 dark:bg-gray-700"
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
