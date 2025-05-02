export default function NewsLoading() {
  return (
    <div aria-label="loading-container">
      <h1 className="mb-8 mt-3 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-gray-200 dark:to-gray-400 sm:text-4xl">
        News
      </h1>
      <div className="mt-3 grid grid-cols-1 gap-7 px-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="h-60 rounded-xl bg-gray-300 dark:bg-gray-700 sm:h-64 md:h-72 lg:h-80"></div>
            <div className="p-4">
              <div className="mb-2 h-6 w-full rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
