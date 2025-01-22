export default function RankingsLoading() {
  return (
    <div
      className="container mx-auto p-4 py-8 dark:bg-gray-900 rounded-lg"
      aria-label="loading-container"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold mb-2 pb-3 text-center text-gray-800 dark:text-gray-200 animate-pulse">
        UFC Rankings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-64 sm:h-72 rounded-lg mb-2" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
