import LoadingContainer from "@/components/shared/loading-container";

export default function FavoritesLoading() {
  return (
    <>
      <h1 className="py-4 text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r bg-clip-text text-transparent from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400">
        Favorite Fighters
      </h1>
      <LoadingContainer />
    </>
  );
}
