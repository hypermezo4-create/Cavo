export type Locale = "en" | "ar";

export type LocalizedText = {
  en: string;
  ar: string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameAr: string;
  image?: string | null;
};

export type Brand = {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  nameAr: string;
  logoUrl?: string | null;
};

export type ProductVariant = {
  id: string;
  size: string;
  color: string;
  sku?: string | null;
  stock: number;
  priceOverride?: number | null;
  image?: string | null;
  isActive: boolean;
};

export type ProductReview = {
  id: string;
  rating: number;
  title?: string | null;
  comment: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    avatarUrl?: string | null;
  };
};

export type Product = {
  id: string;
  slug: string;
  sku?: string | null;
  name: string;
  nameEn: string;
  nameAr: string;
  description?: string | null;
  descriptionEn: string;
  descriptionAr: string;
  shortDescriptionEn?: string | null;
  shortDescriptionAr?: string | null;
  image?: string | null;
  featuredImage?: string | null;
  images: string[];
  createdAt: string;
  updatedAt?: string;
  categoryId: string;
  brandId: string;
  category: Category;
  brand: Brand;
  colors: string[];
  sizes: string[];
  stock: number;
  price?: number | null;
  salePrice?: number | null;
  currency?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  variants?: ProductVariant[];
  reviews?: ProductReview[];
  _count?: { reviews: number };
};

export type OrderStatus =
  | "new"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  productId: string;
  orderId: string;
  quantity: number;
  selectedSize?: string | null;
  selectedColor?: string | null;
  product: Product;
};

export type Order = {
  id: string;
  name: string;
  phone: string;
  city: string;
  area?: string | null;
  address?: string | null;
  notes?: string | null;
  shippingCity: string;
  status: OrderStatus;
  locale: Locale;
  createdAt: string;
  items: OrderItem[];
};

export type ReviewCard = {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
};

export type StoreConfig = {
  storeName: string;
  defaultLocale: Locale;
  supportedLocales: Locale[];
  priceVisibility: "hidden" | "shown";
  shipping: {
    city: string;
    cityEn: string;
    cityAr: string;
    noteEn: string;
    noteAr: string;
    allowEveryAreaWithinCity: boolean;
  };
  address: {
    lineEn: string;
    lineAr: string;
    labelEn: string;
    labelAr: string;
  };
};

export type ProductsResponse = {
  items: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
};

export type CreateProductInput = {
  slug?: string;
  sku?: string;
  name: string;
  nameEn?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionAr?: string;
  shortDescriptionEn?: string | null;
  shortDescriptionAr?: string | null;
  categoryId: string;
  brandId: string;
  image?: string;
  featuredImage?: string;
  images?: string[];
  sizes?: string[];
  colors?: string[];
  stock?: number;
  price?: number | null;
  salePrice?: number | null;
  currency?: string;
  isActive?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
};

export type UpdateProductInput = Partial<CreateProductInput>;

export type CreateOrderInput = {
  name: string;
  phone: string;
  city: string;
  area?: string;
  address?: string;
  notes?: string;
  locale?: Locale;
  items: {
    productId: string;
    quantity?: number;
    selectedSize?: string;
    selectedColor?: string;
  }[];
};
