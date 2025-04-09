export default function FightersLoading() {
  return (
    <div
      className="container mx-auto min-h-screen px-4 py-8 bg-gray-50 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <h1 className="mb-8 text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r bg-clip-text text-transparent from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
        UFC Fighters
      </h1>
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <div className="flex justify-center md:justify-start w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md">
          <div className="w-full sm:w-64 md:w-80 h-10 mb-2  bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="flex justify-center md:justify-end w-full sm:mx-auto md:mx-0 sm:max-w-sm md:max-w-md">
          <div className="w-32 h-10 mb-2 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-60 sm:h-64 md:h-72 lg:h-80 mb-4 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-6 w-3/4 mb-2 mx-auto rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-4 w-1/2 mb-4 mx-auto rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 sm:mt-6">
        <div className="flex gap-1 sm:gap-2">
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="w-8 h-8 mr-2 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
