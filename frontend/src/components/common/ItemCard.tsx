type Product = {
  id: number;
  name: string;
  description: string;
};

interface ItemCardProps {
  list: Product[];
}

export default function ItemCard({ list }: ItemCardProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight">Trends</h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8 2xl:grid-cols-4">
        {list.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
              <img
                alt="l"
                src={`/assets/jpg/image-${product.id}.jpg`}
                className="h-full w-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110 lg:h-full lg:w-full"
                style={{ position: "sticky", top: 0 }}
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm">
                  <a href="/">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm">Black</p>
              </div>
              <p className="text-sm font-medium">20$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
