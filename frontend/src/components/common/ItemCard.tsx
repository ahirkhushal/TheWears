import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export default function ItemCard() {
  const src = ["https://github.com/shadcn.png"];

  return (
    <Card
      key={1}
      className="group w-32 cursor-pointer border-none bg-transparent shadow-none transition-shadow duration-200 hover:bg-accent hover:shadow-md sm:w-36 sm:border-solid md:w-48 lg:w-56"
    >
      <CardContent className="size-full p-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-md">
          <Link to={`/me/playlist/${1}`} className="absolute inset-0 z-10">
            <span className="sr-only">View </span>
          </Link>

          <div
            className={cn(
              "h-full",
              src.length === 4 && "grid grid-cols-2 grid-rows-2 gap-0.5",
            )}
          >
            {src.map((image, i) => (
              <div
                key={i}
                className="relative h-full overflow-hidden rounded-md"
              >
                <img
                  src={image}
                  alt="Song cover"
                  className={cn(
                    src.length === 1 &&
                      src[0].includes("placeholder") &&
                      "dark:invert",
                  )}
                />
              </div>
            ))}
          </div>

          <Skeleton className="absolute inset-0 -z-10 size-full hover:scale-110" />
        </div>

        <div className="mt-1 flex w-full flex-col items-center justify-between">
          <h4 className="w-full font-semibold lg:text-lg">
            <Link
              to={`/me/playlist/${1}`}
              className="mx-auto flex max-w-fit items-center"
            >
              <span className="truncate">Rajesh Khanna</span>
            </Link>
          </h4>

          <span className="w-full truncate text-center text-xs capitalize text-secondary-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum
            doloribus itaque animi.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
