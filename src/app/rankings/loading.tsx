export default function RankingsLoading() {
  return (
    <div
      className="container mx-auto rounded-lg p-4 py-8 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <h1 className="mb-8 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-gray-200 dark:to-gray-400 sm:text-4xl">
        UFC Rankings
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-2 h-64 rounded-lg bg-gray-300 dark:bg-gray-700 sm:h-72" />
            <div className="mb-2 h-4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-6 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  );
}
