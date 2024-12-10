import Image from "next/image";
import errorImg from "../../public/images/error.png";

type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorFightsCards({ message, onRetry }: ErrorProps) {
  const isNetworkError = message.toLowerCase().includes("network");

  return (
    <div className="flex flex-col items-center justify-center pt-48">
      <Image src={errorImg} alt="error" width={200} height={200} />
      <p className="text-2xl font-bold text-red-500 uppercase mb-5">
        {isNetworkError
          ? "Network error occurred. Please check your connection and try again."
          : `An error occurred: ${message}`}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded"
        >
          Retry
        </button>
      )}
    </div>
  );
}
