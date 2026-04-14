import { PRODUCTS, TESTIMONIALS, type SiteCategory, type SiteProduct } from "@/lib/site-data";
import { CAVO_STORE_CONFIG } from "@/lib/store-config";
import type { Brand, Category, Product, ProductReview, ProductVariant, ReviewCard, StoreConfig } from "@/lib/store-types";

const categoryMap: Record<SiteCategory, Category> = {
  men: {
    id: "category-men",
    slug: "men",
    name: "Men",
    nameEn: "Men",
    nameAr: "رجالي",
    image: "/images/cavo/categories/men.svg",
  },
  women: {
    id: "category-women",
    slug: "women",
    name: "Women",
    nameEn: "Women",
    nameAr: "حريمي",
    image: "/images/cavo/categories/women.svg",
  },
  kids: {
    id: "category-kids",
    slug: "kids",
    name: "Kids",
    nameEn: "Kids",
    nameAr: "أطفال",
    image: "/images/cavo/categories/kids.svg",
  },
  offers: {
    id: "category-offers",
    slug: "offers",
    name: "Offers",
    nameEn: "Offers",
    nameAr: "عروض",
    image: "/images/cavo/categories/offers.svg",
  },
};

function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function buildBrand(name: string): Brand {
  return {
    id: `brand-${toSlug(name)}`,
    slug: toSlug(name),
    name,
    nameEn: name,
    nameAr: name,
    logoUrl: null,
  };
}

const brandMap = new Map<string, Brand>();

function getBrand(name: string) {
  const existing = brandMap.get(name);
  if (existing) return existing;
  const created = buildBrand(name);
  brandMap.set(name, created);
  return created;
}

function buildVariants(item: SiteProduct): ProductVariant[] {
  return item.sizes.map((size, index) => ({
    id: `${item.id}-variant-${index + 1}`,
    size,
    color: item.colors[0] ?? "Default",
    sku: `CAVO-${item.slug.toUpperCase()}-${size}`,
    stock: Math.max(1, Math.ceil(item.sizes.length / 2)),
    image: item.images[index] ?? item.image,
    isActive: true,
  }));
}

function buildReviews(item: SiteProduct): ProductReview[] {
  return TESTIMONIALS.slice(0, 2).map((review, index) => ({
    id: `${item.id}-review-${index + 1}`,
    rating: review.rating,
    title: review.role,
    comment: review.text,
    createdAt: new Date().toISOString(),
    user: {
      id: `${item.id}-review-user-${index + 1}`,
      name: review.name,
    },
  }));
}

function mapSeedProduct(item: SiteProduct): Product {
  const category = categoryMap[item.category];
  const brand = getBrand(item.brand);
  const variants = buildVariants(item);
  const reviews = buildReviews(item);
  const now = new Date().toISOString();

  return {
    id: item.id,
    slug: item.slug,
    sku: `CAVO-${item.slug.toUpperCase()}`,
    name: item.name,
    nameEn: item.name,
    nameAr: item.name,
    description: item.description,
    descriptionEn: item.description,
    descriptionAr: item.description,
    shortDescriptionEn: item.description,
    shortDescriptionAr: item.description,
    image: item.image,
    featuredImage: item.image,
    images: item.images,
    createdAt: now,
    updatedAt: now,
    categoryId: category.id,
    brandId: brand.id,
    category,
    brand,
    colors: item.colors,
    sizes: item.sizes,
    stock: Math.max(item.sizes.length * 2, 1),
    price: null,
    salePrice: null,
    currency: "EGP",
    isActive: true,
    isFeatured: Boolean(item.featured),
    isNewArrival: Boolean(item.home),
    isOnSale: item.category === "offers",
    variants,
    reviews,
    _count: { reviews: reviews.length },
  };
}

export const seedCategories = Object.values(categoryMap);
export const seedBrands = Array.from(new Set(PRODUCTS.map((item) => item.brand))).map((name) => getBrand(name));
export const seedProducts = PRODUCTS.map(mapSeedProduct);
export const seedTestimonials: ReviewCard[] = TESTIMONIALS;
export const seedStoreConfig: StoreConfig = CAVO_STORE_CONFIG;
