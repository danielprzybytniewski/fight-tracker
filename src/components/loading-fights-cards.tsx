import LoadingSpinner from "@/components/loading-spinner";

export default function LoadingFightsCards() {
  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <LoadingSpinner />
      <p className="text-2xl font-bold">Loading fight cards...</p>
    </div>
  );
}
