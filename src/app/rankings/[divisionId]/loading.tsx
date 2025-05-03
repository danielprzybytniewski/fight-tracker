export default function RankingsDivisionLoading() {
  return (
    <div
      className="container mx-auto rounded-lg p-4 py-8 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <div className="flex w-fit animate-pulse items-center space-x-2">
        <div className="h-7 w-7 rounded bg-gray-300 dark:bg-gray-700"></div>
      </div>
      <h1 className="mb-2 mt-2 pb-3 text-center text-2xl font-extrabold text-gray-800 dark:text-gray-200 sm:mt-0 md:text-4xl">
        UFC Divison
      </h1>
      <div className="mb-8 animate-pulse">
        <div className="mb-4 h-64 rounded-lg bg-gray-300 dark:bg-gray-700 sm:h-72" />
        <div className="mb-2 h-8 rounded bg-gray-300 dark:bg-gray-700" />
        <div className="mb-1 h-6 rounded bg-gray-300 dark:bg-gray-700" />
      </div>
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-gray-200 md:text-3xl">
        Rankings
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-2 h-48 rounded-lg bg-gray-300 dark:bg-gray-700 sm:h-56" />
            <div className="mb-2 h-6 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="mb-1 h-4 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
