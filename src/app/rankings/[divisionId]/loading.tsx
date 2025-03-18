export default function RankingsDivisionLoading() {
  return (
    <div
      className="container mx-auto p-4 py-8 dark:bg-gray-900 rounded-lg"
      aria-label="loading-container"
    >
      <div className="flex items-center space-x-2 w-fit animate-pulse">
        <div className="w-7 h-7 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
      <h1 className="mb-2 pb-3 mt-2 sm:mt-0 text-2xl md:text-4xl font-extrabold text-center text-gray-800 dark:text-gray-200">
        UFC Divison
      </h1>
      <div className="mb-8 animate-pulse">
        <div className="h-64 sm:h-72 mb-4 bg-gray-300 dark:bg-gray-700 rounded-lg" />
        <div className="h-8 mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-6 mb-1 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <h2 className="mb-8 text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        Rankings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-48 sm:h-56 bg-gray-300 mb-2 dark:bg-gray-700 rounded-lg" />
            <div className="h-6 mb-2 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 mb-1 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
