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
        <linearGradient id="g-light">
          <stop stop-color="#f3f3f3" offset="20%" />
          <stop stop-color="#e0e0e0" offset="50%" />
          <stop stop-color="#f3f3f3" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f3f3f3" />
      <rect id="r-light" width="${w}" height="${h}" fill="url(#g-light)" />
      <animate xlink:href="#r-light" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
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
            <div className="relative hover:cursor-pointer overflow-hidden rounded-xl border group">
              <div className="absolute inset-0 z-10 transition-colors" />
              <Image
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                priority
                src={stat.img}
                alt={stat.name}
                width={700}
                height={475}
                quality={100}
                className="object-cover w-fill h-60 transition-all duration-500 ease-in-out transform group-hover:scale-110"
              />
            </div>
            <h1 className="text-xl mt-5 font-semibold text-primary">
              {stat.name}
            </h1>
            <div className="text-base leading-7 text-white/50">
              {stat.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
