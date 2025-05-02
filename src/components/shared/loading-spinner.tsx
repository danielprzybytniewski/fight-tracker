export default function LoadingSpinner() {
  return (
    <div
      role="status"
      className="mb-6 h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-gray-400 dark:border-gray-600"
      aria-label="Loading..."
    ></div>
  );
}
