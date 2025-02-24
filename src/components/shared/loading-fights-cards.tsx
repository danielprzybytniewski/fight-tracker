import LoadingSpinner from "@/components/shared/loading-spinner";

export default function LoadingFightsCards() {
  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <LoadingSpinner />
      <p className="text-2xl font-bold">Loading...</p>
    </div>
  );
}
