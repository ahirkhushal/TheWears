import ItemCard from "@/components/common/ItemCard";
import { SliderCardSkeleton } from "@/components/common/SliderCardSkeleton";
import { Suspense } from "react";

export default function Home() {
  const fakePlaylists = [
    { id: 1, name: "Summer Vibes", description: "Feel the heat" },
    { id: 2, name: "Winter Nights", description: "Cozy up" },
    { id: 3, name: "Morning Boost", description: "Start your day" },
    { id: 4, name: "Evening Chill", description: "Unwind" },
    { id: 5, name: "Evening Chill", description: "Unwind" },
    { id: 6, name: "Evening Chill", description: "Unwind" },
    { id: 7, name: "Evening Chill", description: "Unwind" },
    { id: 8, name: "Evening Chill", description: "Unwind" },
    { id: 9, name: "Evening Chill", description: "Unwind" },
    { id: 10, name: "Evening Chill", description: "Unwind" },
    { id: 11, name: "Evening Chill", description: "Unwind" },
    { id: 12, name: "Evening Chill", description: "Unwind" },
  ];

  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {fakePlaylists.map((_, index) => (
        <Suspense key={index} fallback={<SliderCardSkeleton hideSubtitle />}>
          <ItemCard />
        </Suspense>
      ))}
    </div>
  );
}
