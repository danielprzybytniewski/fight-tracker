export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="mb-6 h-16 w-16 rounded-full border-solid border-t-4 border-gray-400 dark:border-gray-600 animate-spin"
    ></div>
  );
}
