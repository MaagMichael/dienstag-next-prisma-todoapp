import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-pinky w-full h-[18vh] text-center">
        in Prisma (with Users)
      </div>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col items-center justify-center h-screen">
          <Link
            href="/login"
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-md transition duration-300"
          >
            Go To Login
          </Link>
        </div>
      </div>
    </>
  );
}
