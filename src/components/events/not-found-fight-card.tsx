import Image from "next/image";
import notFoundImg from "@/public/images/not-found.png";

export default function NotFoundFightCard() {
  return (
    <div className="flex flex-col items-center justify-center pt-36 p-2 text-center text-red-500">
      <Image
        src={notFoundImg}
        alt="not found"
        width={200}
        height={200}
        priority
      />
      <p className="mb-3 text-3xl font-bold">Event Not Found!</p>
      <p className="text-xl font-semibold">
        The event you are looking for does not exist
      </p>
    </div>
  );
}
