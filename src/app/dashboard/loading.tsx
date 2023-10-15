import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
const Loading = () => {
  return (
    <>
      <header className=" absolute inset-x-0 top-0 flex justify-between px-4 md:px-20 pt-8">
        <Link href="/" className="font-cal text-xl md:text-2xl">
          <span className="text-primary">Upload</span>ify
        </Link>
        <Skeleton className="w-8 h-8 rounded-full " />
      </header>
      <section className="flex-grow flex flex-col gap-8">
        <Skeleton className="w-[70%] h-10" />
        <Skeleton className="w-[30%] h-6" />
      </section>
    </>
  );
};
export default Loading;
