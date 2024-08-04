import Image from "next/image";

const stats = [
  {
    id: 1,
    img: "/main/inventory.png",
    name: "Food Inventory",
    description:
      "Keeps a record of your stored food items, quantities, and expiration dates.",
    link: "/customer/login",
  },

  {
    id: 2,
    img: "/main/recipe.png",
    name: "Generate Recipe",
    description:
      "Generates creative recipes using ingredients that are approaching their expiration dates.",
    link: "/producer/login",
  },

  {
    id: 3,
    img: "/main/shelf-life.png",
    name: "Calculate Shelf Life",
    description:
      "Calculates the shelf life of your food items and sends alerts when they're near expiration.",
    link: "/shipment-provider/login",
  },
];

export default function Features() {
  const shimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g-dark">
        <stop stop-color="#333333" offset="20%" />
        <stop stop-color="#444444" offset="50%" />
        <stop stop-color="#333333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333333" />
    <rect id="r-dark" width="${w}" height="${h}" fill="url(#g-dark)" />
    <animate xlink:href="#r-dark" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <div className="mx-auto max-w-6xl mb-48 px-5 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col justify-center items-center gap-3"
          >
            <div className="relative hover:cursor-pointer overflow-hidden rounded-xl border-2 group">
              <div className="absolute inset-0 z-10 bg-zinc-950/70 transition-colors group-hover:bg-zinc-950/75" />
              <Image
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(500, 500)
                )}`}
                priority
                src={stat.img}
                alt={stat.name}
                width={500}
                height={500}
                quality={100}
                className="object-cover w-fill md:h-72 h-60 transition-all duration-500 ease-in-out transform group-hover:scale-110"
              />
              <div className="absolute bottom-6 z-20 flex flex-col items-center justify-center">
                <h1 className="px-5 text-2xl font-bold text-white">
                  {stat.name}
                </h1>
              </div>
            </div>
            <div className="text-base pt-3 leading-7 text-white/50">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
