export default function Loading() {
  return (
    <div className="container mx-auto p-4 py-8 dark:bg-gray-900 rounded-lg">
      <div className="animate-pulse mb-8">
        <div className="bg-gray-300 dark:bg-gray-700 h-64 sm:h-72 rounded-lg mb-4" />
        <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 h-48 sm:h-56 rounded-lg mb-2" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
