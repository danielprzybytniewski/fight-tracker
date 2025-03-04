import LoadingSpinner from "@/components/shared/loading-spinner";

export default function LoadingContainer({
  message = "Loading...",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <LoadingSpinner />
      <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        {message}
      </p>
    </div>
  );
}
