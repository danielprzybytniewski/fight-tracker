export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="animate-spin rounded-full h-16 w-16 border-t-4 border-solid mb-6 border-gray-400 dark:border-gray-600"
    ></div>
  );
}
