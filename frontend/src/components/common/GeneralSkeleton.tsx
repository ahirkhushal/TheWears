import { Skeleton } from "../ui/skeleton";

export default function GeneralSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4">
      <div className="header-line">
        <Skeleton className="h-[50px] w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3 xl:m-auto xl:w-[80%]">
        {Array(9)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} className="h-[250px] w-full" />
          ))}
      </div>
    </div>
  );
}
