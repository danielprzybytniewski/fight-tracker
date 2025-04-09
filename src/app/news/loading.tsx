export default function NewsLoading() {
  return (
    <div aria-label="loading-container">
      <h1 className="mb-8 mt-3 text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r bg-clip-text text-transparent from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
        News
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-3 px-4">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900 animate-pulse"
          >
            <div className="h-60 sm:h-64 md:h-72 lg:h-80 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
            <div className="p-4">
              <div className="h-6 w-3/4 mx-auto mb-2 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="flex items-center justify-between p-4 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <div className="h-4 w-4 mr-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 mr-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
