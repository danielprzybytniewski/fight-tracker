export default function FightersLoading() {
  return (
    <div
      className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen"
      aria-label="loading-container"
    >
      <div className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100 text-center">
        UFC Fighters
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-60 bg-gray-300 dark:bg-gray-700 rounded-xl mb-4"></div>
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2 mx-auto"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4 mx-auto"></div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
