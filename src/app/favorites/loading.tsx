import LoadingContainer from "@/components/shared/loading-container";

export default function FavoritesLoading() {
  return (
    <>
      <h1 className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text py-4 text-center text-3xl font-bold text-transparent dark:from-gray-200 dark:to-gray-400 sm:text-4xl">
        Favorite Fighters
      </h1>
      <LoadingContainer />
    </>
  );
}
