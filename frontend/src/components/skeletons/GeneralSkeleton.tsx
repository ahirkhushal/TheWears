import { Skeleton } from "../ui/skeleton";

export default function GeneralSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:m-auto xl:w-full">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-[250px] w-full" />
          ))}
      </div>
    </div>
  );
}
