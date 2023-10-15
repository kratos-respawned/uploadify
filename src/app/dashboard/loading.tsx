import { Skeleton } from "@/components/ui/skeleton";
const Loading = () => {
  return (
    <section className="flex-grow flex flex-col gap-8">
      <Skeleton className="w-[70%] h-10" />
      <Skeleton className="w-[30%] h-6" />
    </section>
  );
};
export default Loading;
