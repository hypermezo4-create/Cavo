import { IMAGE_BASED_PRODUCTS } from "@/lib/generated/catalog-image-manifest.generated";

export type SiteCategory = "men" | "women" | "kids" | "offers";

export type SiteProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: SiteCategory;
  description: string;
  image: string;
  images: string[];
  sizes: string[];
  colors: string[];
  featured?: boolean;
  home?: boolean;
};

export type BrandLogo = { id: string; image: string; alt: string };
export type Testimonial = { id: string; name: string; role: string; rating: number; text: string };

export const BRAND_LOGOS: BrandLogo[] = [
  { id: "brand-1", image: "/images/brand/1775763809143.png", alt: "Cavo premium mark" },
  { id: "brand-2", image: "/images/brand/1775777140723.png", alt: "Premium mirror quality badge" },
  { id: "brand-3", image: "/images/brand/1775777154062.png", alt: "Cavo selected drop" },
  { id: "brand-4", image: "/images/brand/1775777246129.png", alt: "Cavo studio label" },
  { id: "brand-5", image: "/images/brand/1775777459899.png", alt: "Shoes prime mirror signature" },
  { id: "brand-6", image: "/images/brand/1775777567515.png", alt: "Cavo luxury collection" },
];

const menSizes = ["41", "42", "43", "44", "45", "46"];
const womenSizes = ["36", "37", "38", "39", "40", "41"];
const kidsSizes = ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"];

const CURATED_PRODUCTS: SiteProduct[] = [
  {
    id: "men-air-force-black",
    slug: "men-air-force-black",
    name: "Nike Air Force Black",
    brand: "Nike",
    category: "men",
    description: "Premium mirror men collection with a clean black finish, balanced cushioning, and a sharp everyday silhouette. Sizes 41–46.",
    image: "/images/cavo/men/air_force/b/air_force1.jpg",
    images: [
      "/images/cavo/men/air_force/b/air_force1.jpg",
      "/images/cavo/men/air_force/b/air_force2.jpg",
      "/images/cavo/men/air_force/b/air_force3.jpg",
      "/images/cavo/men/air_force/b/air_force4.jpg",
    ],
    sizes: menSizes,
    colors: ["Black"],
    featured: true,
    home: true,
  },
  {
    id: "men-samba-white",
    slug: "men-samba-white",
    name: "Adidas Samba White",
    brand: "Adidas",
    category: "men",
    description: "Smooth low-profile men pair with premium white finishing and easy daily styling. Sizes 41–46.",
    image: "/images/cavo/men/samba/w/smaba_w1.jpg",
    images: [
      "/images/cavo/men/samba/w/smaba_w1.jpg",
      "/images/cavo/men/samba/w/smaba_w2.jpg",
      "/images/cavo/men/samba/w/smaba_w3.jpg",
      "/images/cavo/men/samba/w/smaba_w4.jpg",
    ],
    sizes: menSizes,
    colors: ["White"],
    featured: true,
    home: true,
  },
  {
    id: "men-jordan-black-cat",
    slug: "men-jordan-black-cat",
    name: "Jordan 4 Black Cat",
    brand: "Jordan",
    category: "men",
    description: "Statement men drop with dark luxury details and a premium mirror finish. Sizes 41–46.",
    image: "/images/cavo/men/Jordan4/black_cat/black_cat1.jpg",
    images: [
      "/images/cavo/men/Jordan4/black_cat/black_cat1.jpg",
      "/images/cavo/men/Jordan4/black_cat/black_cat2.jpg",
      "/images/cavo/men/Jordan4/black_cat/black_cat3.jpg",
      "/images/cavo/men/Jordan4/black_cat/black_cat4.jpg",
    ],
    sizes: menSizes,
    colors: ["Black"],
    home: true,
  },
  {
    id: "women-samba-blue",
    slug: "women-samba-blue",
    name: "Adidas Samba Blue",
    brand: "Adidas",
    category: "women",
    description: "Elegant women style with a smooth blue palette, soft comfort, and polished finishing. Sizes 36–41.",
    image: "/images/cavo/women/samba/blue/smaba_blue1.jpg",
    images: [
      "/images/cavo/women/samba/blue/smaba_blue1.jpg",
      "/images/cavo/women/samba/blue/smaba_blue2.jpg",
      "/images/cavo/women/samba/blue/smaba_blue3.jpg",
      "/images/cavo/women/samba/blue/smaba_blue4.jpg",
    ],
    sizes: womenSizes,
    colors: ["Blue"],
    featured: true,
    home: true,
  },
  {
    id: "women-air-force-white",
    slug: "women-air-force-white",
    name: "Nike Air Force White",
    brand: "Nike",
    category: "women",
    description: "Clean premium women pair built for all-day wear with a bright white finish. Sizes 36–41.",
    image: "/images/cavo/women/air_force/w/air_force1.jpg",
    images: [
      "/images/cavo/women/air_force/w/air_force1.jpg",
      "/images/cavo/women/air_force/w/air_force2.jpg",
      "/images/cavo/women/air_force/w/air_force3.jpg",
      "/images/cavo/women/air_force/w/air_force4.jpg",
    ],
    sizes: womenSizes,
    colors: ["White"],
    home: true,
  },
  {
    id: "women-mcqueen-white-black",
    slug: "women-mcqueen-white-black",
    name: "Alexander McQueen White Black",
    brand: "Alexander McQueen",
    category: "women",
    description: "Luxury women silhouette with elevated sole shape and premium mirror detailing. Sizes 36–41.",
    image: "/images/cavo/women/Alexander_McQueen/w_b/Alexander_McQueen1.webp",
    images: [
      "/images/cavo/women/Alexander_McQueen/w_b/Alexander_McQueen1.webp",
      "/images/cavo/women/Alexander_McQueen/w_b/Alexander_McQueen2.webp",
      "/images/cavo/women/Alexander_McQueen/w_b/Alexander_McQueen3.webp",
      "/images/cavo/women/Alexander_McQueen/w_b/Alexander_McQueen4.webp",
    ],
    sizes: womenSizes,
    colors: ["White / Black"],
    featured: true,
  },
  {
    id: "kids-core-spark",
    slug: "kids-core-spark",
    name: "Kids Core Spark",
    brand: "Cavo Kids",
    category: "kids",
    description: "Lightweight and durable kids pair designed for movement, comfort, and premium everyday style. Sizes 22–35.",
    image: "/images/cavo/products/cavo-junior-core-1.svg",
    images: [
      "/images/cavo/products/cavo-junior-core-1.svg",
      "/images/cavo/products/cavo-junior-spark-1.svg",
    ],
    sizes: kidsSizes,
    colors: ["White / Gold"],
    featured: true,
    home: true,
  },
  {
    id: "kids-luna-rose",
    slug: "kids-luna-rose",
    name: "Kids Luna Rose",
    brand: "Cavo Kids",
    category: "kids",
    description: "Smooth junior look with bright color energy and comfortable support. Sizes 22–35.",
    image: "/images/cavo/products/cavo-luna-rose-1.svg",
    images: [
      "/images/cavo/products/cavo-luna-rose-1.svg",
      "/images/cavo/products/cavo-junior-spark-1.svg",
    ],
    sizes: kidsSizes,
    colors: ["Rose"],
    home: true,
  },
  {
    id: "offer-newbalance-blue",
    slug: "offer-newbalance-blue",
    name: "New Balance 530 Blue",
    brand: "New Balance",
    category: "offers",
    description: "Selected premium drop from the Cavo showcase with clean layered blue styling. Men sizes 41–46.",
    image: "/images/cavo/men/Newbalance_530/blue/nb_blue1.jpg",
    images: [
      "/images/cavo/men/Newbalance_530/blue/nb_blue1.jpg",
      "/images/cavo/men/Newbalance_530/blue/nb_blue2.jpg",
      "/images/cavo/men/Newbalance_530/blue/nb_blue3.jpg",
    ],
    sizes: menSizes,
    colors: ["Blue"],
    featured: true,
    home: true,
  },
  {
    id: "offer-on-cloud-bw",
    slug: "offer-on-cloud-bw",
    name: "On Cloud Black White",
    brand: "On",
    category: "offers",
    description: "Premium selected pair with a monochrome finish and sharp smooth styling. Men sizes 41–46.",
    image: "/images/cavo/men/one_cloud/black_withe/b_w1.jpg",
    images: [
      "/images/cavo/men/one_cloud/black_withe/b_w1.jpg",
      "/images/cavo/men/one_cloud/black_withe/b_w2.jpg",
    ],
    sizes: menSizes,
    colors: ["Black / White"],
    featured: true,
  },
];

function dedupeProducts(items: SiteProduct[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.slug || item.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const PRODUCTS: SiteProduct[] = dedupeProducts([...CURATED_PRODUCTS, ...IMAGE_BASED_PRODUCTS]);

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Mariam A.",
    role: "Cavo customer",
    rating: 5,
    text: "The finishing feels premium and the photos matched the real pair beautifully. Smooth experience from start to finish.",
  },
  {
    id: "t2",
    name: "Omar H.",
    role: "Sneaker collector",
    rating: 5,
    text: "The presentation looks luxury and the quality is exactly what I wanted from a mirror selection.",
  },
  {
    id: "t3",
    name: "Nada K.",
    role: "Repeat customer",
    rating: 4,
    text: "Loved the clean organization between categories and the fast communication through the links page.",
  },
];

export function getProductsByCategory(category?: SiteCategory) {
  return category ? PRODUCTS.filter((item) => item.category === category) : PRODUCTS;
}

export function getFeaturedProducts(limit?: number) {
  const items = PRODUCTS.filter((item) => item.featured || item.home);
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export function getProductById(idOrSlug: string) {
  return PRODUCTS.find((item) => item.id === idOrSlug || item.slug === idOrSlug) ?? null;
}
