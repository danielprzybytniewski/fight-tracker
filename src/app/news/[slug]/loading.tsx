export default function NewsDetailLoading() {
  return (
    <div
      className="container max-w-5xl mx-auto py-6 px-4 md:py-8 md:px-6"
      aria-label="loading-container"
    >
      <div className="mb-5">
        <div className="w-7 h-7 rounded bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
      </div>
      <article className="overflow-hidden rounded-xl shadow-lg bg-gray-50 dark:bg-gray-900 animate-pulse">
        <div className="p-4 md:p-6">
          <div className="h-8 md:h-10 w-3/4 mx-auto rounded bg-gray-300 dark:bg-gray-700"></div>
          <div
            className="flex justify-center items-center flex-wrap mt-3 gap-x-6 gap-y-1 text-xs md:text-sm text-gray-700 
          dark:text-gray-300"
          >
            <div className="flex items-center">
              <div className="h-5 w-5 mr-1 rounded-full bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-4 w-20 rounded bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <div className="h-40 md:h-60 lg:h-80 rounded-xl bg-gray-300 dark:bg-gray-700"></div>
            <div className="mt-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="h-6 w-full mb-2 rounded bg-gray-300 dark:bg-gray-700"
                ></div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="h-6 w-16 rounded bg-gray-300 dark:bg-gray-700"
              ></div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
