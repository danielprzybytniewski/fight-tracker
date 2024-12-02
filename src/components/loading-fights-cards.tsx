export default function LoadingFightsCards() {
  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-6"></div>
      <p className="text-2xl font-bold">Loading fight cards...</p>
    </div>
  );
}
