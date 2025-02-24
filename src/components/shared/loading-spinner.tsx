export default function LoadingSpinner() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6"
    ></div>
  );
}
