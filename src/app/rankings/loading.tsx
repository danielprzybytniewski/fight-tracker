export default function RankingsLoading() {
  return (
    <div
      className="container mx-auto p-4 py-8 rounded-lg dark:bg-gray-900"
      aria-label="loading-container"
    >
      <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r bg-clip-text text-transparent from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
        UFC Rankings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-64 sm:h-72 mb-2 rounded-lg bg-gray-300 dark:bg-gray-700" />
            <div className="h-4 mb-2 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-6 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
