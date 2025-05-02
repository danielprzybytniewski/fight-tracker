export default function FightersLoading() {
  return (
    <div
      className="container mx-auto min-h-screen bg-gray-50 px-4 py-8 dark:bg-gray-900"
      aria-label="loading-container"
    >
      <h1 className="mb-8 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-center text-3xl font-bold text-transparent dark:from-gray-200 dark:to-gray-400 sm:text-4xl">
        UFC Fighters
      </h1>
      <div className="mb-8 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
        <div className="flex w-full justify-center sm:mx-auto sm:max-w-sm md:mx-0 md:max-w-md md:justify-start">
          <div className="mb-2 h-10 w-full animate-pulse rounded bg-gray-300 dark:bg-gray-700 sm:w-64 md:w-80"></div>
        </div>
        <div className="flex w-full justify-center sm:mx-auto sm:max-w-sm md:mx-0 md:max-w-md md:justify-end">
          <div className="mb-2 h-10 w-32 animate-pulse rounded bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="mb-4 h-60 rounded-xl bg-gray-300 dark:bg-gray-700 sm:h-64 md:h-72 lg:h-80"></div>
            <div className="mx-auto mb-2 h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="mx-auto mb-4 h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700"></div>
            <div className="h-10 rounded bg-gray-300 dark:bg-gray-700"></div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center sm:mt-6">
        <div className="flex gap-1 sm:gap-2">
          <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
          <div className="mr-2 h-8 w-8 animate-pulse rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}
