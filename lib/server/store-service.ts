import { getPrismaClient } from "@/lib/prisma";
import { CAVO_STORE_CONFIG } from "@/lib/store-config";
import type {
  Brand,
  Category,
  CreateOrderInput,
  CreateProductInput,
  Order,
  OrderStatus,
  Product,
  ProductReview,
  ProductVariant,
  ReviewCard,
  StoreConfig,
  UpdateProductInput,
} from "@/lib/store-types";
import { seedBrands, seedCategories, seedProducts, seedStoreConfig, seedTestimonials } from "@/lib/server/seed-data";

type MemoryDb = {
  categories: Category[];
  brands: Brand[];
  products: Product[];
  orders: Order[];
  testimonials: ReviewCard[];
  storeConfig: StoreConfig;
};

declare global {
  var __cavoMemoryDb: MemoryDb | undefined;
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getMemoryDb(): MemoryDb {
  if (!globalThis.__cavoMemoryDb) {
    globalThis.__cavoMemoryDb = {
      categories: deepClone(seedCategories),
      brands: deepClone(seedBrands),
      products: deepClone(seedProducts),
      orders: [],
      testimonials: deepClone(seedTestimonials),
      storeConfig: deepClone(seedStoreConfig),
    };
  }
  return globalThis.__cavoMemoryDb;
}

function toNumber(value: unknown): number | null {
  if (value == null) return null;
  const next = Number(value);
  return Number.isFinite(next) ? next : null;
}

function statusFromDb(value: string | null | undefined): OrderStatus {
  const normalized = (value || "NEW").toLowerCase();
  if (normalized === "confirmed" || normalized === "processing" || normalized === "shipped" || normalized === "delivered" || normalized === "cancelled") {
    return normalized;
  }
  return "new";
}

function mapPrismaCategory(record: any): Category {
  return {
    id: record.id,
    slug: record.slug,
    name: record.nameEn,
    nameEn: record.nameEn,
    nameAr: record.nameAr,
    image: record.image ?? null,
  };
}

function mapPrismaBrand(record: any): Brand {
  return {
    id: record.id,
    slug: record.slug,
    name: record.nameEn,
    nameEn: record.nameEn,
    nameAr: record.nameAr,
    logoUrl: record.logoUrl ?? null,
  };
}

function mapPrismaVariant(record: any): ProductVariant {
  return {
    id: record.id,
    size: record.size,
    color: record.color,
    sku: record.sku ?? null,
    stock: record.stock ?? 0,
    priceOverride: toNumber(record.priceOverride),
    image: record.image ?? null,
    isActive: Boolean(record.isActive),
  };
}

function mapPrismaReview(record: any): ProductReview {
  return {
    id: record.id,
    rating: record.rating,
    title: record.title ?? null,
    comment: record.comment,
    createdAt: record.createdAt instanceof Date ? record.createdAt.toISOString() : String(record.createdAt),
    user: {
      id: `review-user-${record.id}`,
      name: record.customerName || "Cavo customer",
    },
  };
}

function mapPrismaProduct(record: any): Product {
  const category = mapPrismaCategory(record.category);
  const brand = mapPrismaBrand(record.brand);
  const reviews = Array.isArray(record.reviews) ? record.reviews.map(mapPrismaReview) : [];
  const variants = Array.isArray(record.variants) ? record.variants.map(mapPrismaVariant) : [];
  const images = Array.isArray(record.images)
    ? record.images.sort((a: any, b: any) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((image: any) => image.url)
    : [];

  return {
    id: record.id,
    slug: record.slug,
    sku: record.sku ?? null,
    name: record.nameEn,
    nameEn: record.nameEn,
    nameAr: record.nameAr,
    description: record.descriptionEn,
    descriptionEn: record.descriptionEn,
    descriptionAr: record.descriptionAr,
    shortDescriptionEn: record.shortDescriptionEn ?? null,
    shortDescriptionAr: record.shortDescriptionAr ?? null,
    image: record.featuredImage ?? images[0] ?? null,
    featuredImage: record.featuredImage ?? images[0] ?? null,
    images,
    createdAt: record.createdAt instanceof Date ? record.createdAt.toISOString() : String(record.createdAt),
    updatedAt: record.updatedAt instanceof Date ? record.updatedAt.toISOString() : String(record.updatedAt),
    categoryId: record.categoryId,
    brandId: record.brandId,
    category,
    brand,
    colors: record.colors ?? [],
    sizes: record.sizes ?? [],
    stock: record.stock ?? 0,
    price: toNumber(record.price),
    salePrice: toNumber(record.salePrice),
    currency: record.currency ?? "EGP",
    isActive: Boolean(record.isActive),
    isFeatured: Boolean(record.isFeatured),
    isNewArrival: Boolean(record.isNewArrival),
    isOnSale: Boolean(record.isOnSale),
    variants,
    reviews,
    _count: { reviews: reviews.length },
  };
}

function makeMemoryProduct(input: CreateProductInput, fallbackProduct?: Product): Product {
  const db = getMemoryDb();
  const category = db.categories.find((item) => item.id === (input.categoryId || fallbackProduct?.categoryId)) ?? db.categories[0];
  const brand = db.brands.find((item) => item.id === (input.brandId || fallbackProduct?.brandId)) ?? db.brands[0];
  const now = new Date().toISOString();
  const slug = input.slug || fallbackProduct?.slug || toSlug(input.name);
  const image = input.featuredImage || input.image || fallbackProduct?.featuredImage || fallbackProduct?.image || "/images/brand/logo.jpg";
  const images = Array.isArray(input.images) && input.images.length ? input.images : fallbackProduct?.images?.length ? fallbackProduct.images : image ? [image] : [];
  const sizes = Array.isArray(input.sizes) && input.sizes.length ? input.sizes : fallbackProduct?.sizes || [];
  const colors = Array.isArray(input.colors) && input.colors.length ? input.colors : fallbackProduct?.colors || [];

  return {
    id: fallbackProduct?.id || `product-${Date.now()}`,
    slug,
    sku: input.sku ?? fallbackProduct?.sku ?? `CAVO-${slug.toUpperCase()}`,
    name: input.nameEn || input.name || fallbackProduct?.nameEn || fallbackProduct?.name || "Cavo Product",
    nameEn: input.nameEn || input.name || fallbackProduct?.nameEn || fallbackProduct?.name || "Cavo Product",
    nameAr: input.nameAr || input.name || fallbackProduct?.nameAr || fallbackProduct?.name || "منتج كافو",
    description: input.descriptionEn || input.description || fallbackProduct?.descriptionEn || fallbackProduct?.description || "",
    descriptionEn: input.descriptionEn || input.description || fallbackProduct?.descriptionEn || fallbackProduct?.description || "",
    descriptionAr: input.descriptionAr || input.description || fallbackProduct?.descriptionAr || fallbackProduct?.description || "",
    shortDescriptionEn: input.shortDescriptionEn ?? fallbackProduct?.shortDescriptionEn ?? null,
    shortDescriptionAr: input.shortDescriptionAr ?? fallbackProduct?.shortDescriptionAr ?? null,
    image,
    featuredImage: image,
    images,
    createdAt: fallbackProduct?.createdAt || now,
    updatedAt: now,
    categoryId: category.id,
    brandId: brand.id,
    category,
    brand,
    colors,
    sizes,
    stock: typeof input.stock === "number" ? input.stock : fallbackProduct?.stock || 0,
    price: input.price ?? fallbackProduct?.price ?? null,
    salePrice: input.salePrice ?? fallbackProduct?.salePrice ?? null,
    currency: input.currency || fallbackProduct?.currency || "EGP",
    isActive: input.isActive ?? fallbackProduct?.isActive ?? true,
    isFeatured: input.isFeatured ?? fallbackProduct?.isFeatured ?? false,
    isNewArrival: input.isNewArrival ?? fallbackProduct?.isNewArrival ?? false,
    isOnSale: input.isOnSale ?? fallbackProduct?.isOnSale ?? false,
    variants: fallbackProduct?.variants ?? [],
    reviews: fallbackProduct?.reviews ?? [],
    _count: fallbackProduct?._count ?? { reviews: fallbackProduct?.reviews?.length ?? 0 },
  };
}

export async function listCategories(): Promise<Category[]> {
  const prisma = await getPrismaClient();
  if (!prisma) return deepClone(getMemoryDb().categories);
  const items = await (prisma as any).category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  return items.map(mapPrismaCategory);
}

export async function listBrands(): Promise<Brand[]> {
  const prisma = await getPrismaClient();
  if (!prisma) return deepClone(getMemoryDb().brands);
  const items = await (prisma as any).brand.findMany({ orderBy: { nameEn: "asc" } });
  return items.map(mapPrismaBrand);
}

export async function listProducts(): Promise<Product[]> {
  const prisma = await getPrismaClient();
  if (!prisma) return deepClone(getMemoryDb().products);
  const items = await (prisma as any).product.findMany({
    include: { category: true, brand: true, images: true, variants: true, reviews: true },
    orderBy: { createdAt: "desc" },
  });
  return items.map(mapPrismaProduct);
}

export async function getProductById(idOrSlug: string): Promise<Product | null> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    const item = getMemoryDb().products.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
    return item ? deepClone(item) : null;
  }
  const item = await (prisma as any).product.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: { category: true, brand: true, images: true, variants: true, reviews: true },
  });
  return item ? mapPrismaProduct(item) : null;
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    const db = getMemoryDb();
    const created = makeMemoryProduct(input);
    db.products.unshift(created);
    return deepClone(created);
  }
  const product = await (prisma as any).product.create({
    data: {
      slug: input.slug || toSlug(input.name),
      sku: input.sku ?? null,
      nameEn: input.nameEn || input.name,
      nameAr: input.nameAr || input.name,
      descriptionEn: input.descriptionEn || input.description || "",
      descriptionAr: input.descriptionAr || input.description || "",
      shortDescriptionEn: input.shortDescriptionEn ?? null,
      shortDescriptionAr: input.shortDescriptionAr ?? null,
      featuredImage: input.featuredImage || input.image || null,
      colors: input.colors || [],
      sizes: input.sizes || [],
      stock: input.stock || 0,
      price: input.price ?? null,
      salePrice: input.salePrice ?? null,
      currency: input.currency || "EGP",
      isActive: input.isActive ?? true,
      isFeatured: input.isFeatured ?? false,
      isNewArrival: input.isNewArrival ?? false,
      isOnSale: input.isOnSale ?? false,
      categoryId: input.categoryId,
      brandId: input.brandId,
      images: {
        create: (input.images || (input.featuredImage || input.image ? [input.featuredImage || input.image || ""] : []))
          .filter(Boolean)
          .map((url, index) => ({ url, sortOrder: index })),
      },
    },
    include: { category: true, brand: true, images: true, variants: true, reviews: true },
  });
  return mapPrismaProduct(product);
}

export async function updateProduct(id: string, input: UpdateProductInput): Promise<Product> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    const db = getMemoryDb();
    const index = db.products.findIndex((product) => product.id === id);
    if (index < 0) throw new Error("Product not found");
    const currentProduct = db.products[index];
    const updated = makeMemoryProduct(
      {
        ...currentProduct,
        ...input,
        sku: input.sku ?? currentProduct.sku ?? undefined,
        name: input.name || currentProduct.name,
      },
      currentProduct,
    );
    db.products[index] = updated;
    return deepClone(updated);
  }

  const current = await (prisma as any).product.findUnique({
    where: { id },
    include: { category: true, brand: true, images: true, variants: true, reviews: true },
  });
  if (!current) throw new Error("Product not found");

  await (prisma as any).productImage.deleteMany({ where: { productId: id } });

  const updated = await (prisma as any).product.update({
    where: { id },
    data: {
      slug: input.slug || current.slug,
      sku: input.sku === undefined ? current.sku : input.sku,
      nameEn: input.nameEn || input.name || current.nameEn,
      nameAr: input.nameAr || input.name || current.nameAr,
      descriptionEn: input.descriptionEn || input.description || current.descriptionEn,
      descriptionAr: input.descriptionAr || input.description || current.descriptionAr,
      shortDescriptionEn: input.shortDescriptionEn === undefined ? current.shortDescriptionEn : input.shortDescriptionEn,
      shortDescriptionAr: input.shortDescriptionAr === undefined ? current.shortDescriptionAr : input.shortDescriptionAr,
      featuredImage: input.featuredImage || input.image || current.featuredImage,
      colors: input.colors || current.colors,
      sizes: input.sizes || current.sizes,
      stock: input.stock === undefined ? current.stock : input.stock,
      price: input.price === undefined ? current.price : input.price,
      salePrice: input.salePrice === undefined ? current.salePrice : input.salePrice,
      currency: input.currency || current.currency,
      isActive: input.isActive === undefined ? current.isActive : input.isActive,
      isFeatured: input.isFeatured === undefined ? current.isFeatured : input.isFeatured,
      isNewArrival: input.isNewArrival === undefined ? current.isNewArrival : input.isNewArrival,
      isOnSale: input.isOnSale === undefined ? current.isOnSale : input.isOnSale,
      categoryId: input.categoryId || current.categoryId,
      brandId: input.brandId || current.brandId,
      images: {
        create: (input.images || [input.featuredImage || input.image || current.featuredImage].filter(Boolean))
          .filter(Boolean)
          .map((url, index) => ({ url, sortOrder: index })),
      },
    },
    include: { category: true, brand: true, images: true, variants: true, reviews: true },
  });

  return mapPrismaProduct(updated);
}

export async function deleteProduct(id: string): Promise<{ success: true }> {
  const prisma = await getPrismaClient();
  if (!prisma) {
    const db = getMemoryDb();
    db.products = db.products.filter((product) => product.id !== id);
    return { success: true };
  }
  await (prisma as any).product.delete({ where: { id } });
  return { success: true };
}

export async function listOrders(): Promise<Order[]> {
  const prisma = await getPrismaClient();
  if (!prisma) return deepClone(getMemoryDb().orders);
  const orders = await (prisma as any).order.findMany({
    include: {
      items: {
        include: {
          product: {
            include: { category: true, brand: true, images: true, variants: true, reviews: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return orders.map((order: any) => ({
    id: order.id,
    name: order.customerName,
    phone: order.phone,
    city: order.city,
    area: order.area ?? null,
    address: order.address ?? null,
    notes: order.notes ?? null,
    shippingCity: order.shippingCity,
    status: statusFromDb(order.status),
    locale: order.locale === "ar" ? "ar" : "en",
    createdAt: order.createdAt instanceof Date ? order.createdAt.toISOString() : String(order.createdAt),
    items: order.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      orderId: item.orderId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? null,
      selectedColor: item.selectedColor ?? null,
      product: mapPrismaProduct(item.product),
    })),
  }));
}

export async function createOrder(input: CreateOrderInput): Promise<Order> {
  const normalizedCity = (input.city || "").trim().toLowerCase();
  if (normalizedCity && normalizedCity !== "hurghada" && normalizedCity !== "الغردقة") {
    throw new Error("Shipping is currently available within Hurghada only.");
  }

  const prisma = await getPrismaClient();
  if (!prisma) {
    const db = getMemoryDb();
    const createdAt = new Date().toISOString();
    const orderId = `order-${Date.now()}`;
    const items = input.items.map((item, index) => {
      const product = db.products.find((entry) => entry.id === item.productId) ?? db.products[0];
      return {
        id: `order-item-${Date.now()}-${index}`,
        productId: product.id,
        orderId,
        quantity: item.quantity || 1,
        selectedSize: item.selectedSize ?? null,
        selectedColor: item.selectedColor ?? null,
        product: deepClone(product),
      };
    });

    const created: Order = {
      id: orderId,
      name: input.name,
      phone: input.phone,
      city: "Hurghada",
      area: input.area ?? null,
      address: input.address ?? null,
      notes: input.notes ?? null,
      shippingCity: CAVO_STORE_CONFIG.shipping.city,
      status: "new",
      locale: input.locale === "ar" ? "ar" : "en",
      createdAt,
      items,
    };

    db.orders.unshift(created);
    return deepClone(created);
  }

  const created = await (prisma as any).order.create({
    data: {
      customerName: input.name,
      phone: input.phone,
      city: "Hurghada",
      area: input.area ?? null,
      address: input.address ?? null,
      notes: input.notes ?? null,
      shippingCity: CAVO_STORE_CONFIG.shipping.city,
      locale: input.locale === "ar" ? "ar" : "en",
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity || 1,
          selectedSize: item.selectedSize ?? null,
          selectedColor: item.selectedColor ?? null,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: {
            include: { category: true, brand: true, images: true, variants: true, reviews: true },
          },
        },
      },
    },
  });

  return {
    id: created.id,
    name: created.customerName,
    phone: created.phone,
    city: created.city,
    area: created.area ?? null,
    address: created.address ?? null,
    notes: created.notes ?? null,
    shippingCity: created.shippingCity,
    status: statusFromDb(created.status),
    locale: created.locale === "ar" ? "ar" : "en",
    createdAt: created.createdAt instanceof Date ? created.createdAt.toISOString() : String(created.createdAt),
    items: created.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      orderId: item.orderId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? null,
      selectedColor: item.selectedColor ?? null,
      product: mapPrismaProduct(item.product),
    })),
  };
}


export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  const allowed: OrderStatus[] = ["new", "confirmed", "processing", "shipped", "delivered", "cancelled"];
  if (!allowed.includes(status)) {
    throw new Error("Invalid order status.");
  }

  const prisma = await getPrismaClient();
  if (!prisma) {
    const db = getMemoryDb();
    const index = db.orders.findIndex((order) => order.id === id);
    if (index < 0) throw new Error("Order not found");
    db.orders[index] = { ...db.orders[index], status };
    return deepClone(db.orders[index]);
  }

  const updated = await (prisma as any).order.update({
    where: { id },
    data: { status: status.toUpperCase() },
    include: {
      items: {
        include: {
          product: {
            include: { category: true, brand: true, images: true, variants: true, reviews: true },
          },
        },
      },
    },
  });

  return {
    id: updated.id,
    name: updated.customerName,
    phone: updated.phone,
    city: updated.city,
    area: updated.area ?? null,
    address: updated.address ?? null,
    notes: updated.notes ?? null,
    shippingCity: updated.shippingCity,
    status: statusFromDb(updated.status),
    locale: updated.locale === "ar" ? "ar" : "en",
    createdAt: updated.createdAt instanceof Date ? updated.createdAt.toISOString() : String(updated.createdAt),
    items: updated.items.map((item: any) => ({
      id: item.id,
      productId: item.productId,
      orderId: item.orderId,
      quantity: item.quantity,
      selectedSize: item.selectedSize ?? null,
      selectedColor: item.selectedColor ?? null,
      product: mapPrismaProduct(item.product),
    })),
  };
}

export async function getStoreConfig(): Promise<StoreConfig> {
  const prisma = await getPrismaClient();
  if (!prisma) return deepClone(getMemoryDb().storeConfig);
  const config = await (prisma as any).storeConfig.findFirst();
  if (!config) return deepClone(seedStoreConfig);

  return {
    storeName: config.storeName,
    defaultLocale: config.defaultLocale === "ar" ? "ar" : "en",
    supportedLocales: Array.isArray(config.supportedLocales)
      ? config.supportedLocales.filter((locale: string) => locale === "en" || locale === "ar")
      : ["en", "ar"],
    priceVisibility: config.priceVisibility === "shown" ? "shown" : "hidden",
    shipping: {
      city: config.shippingCityEn,
      cityEn: config.shippingCityEn,
      cityAr: config.shippingCityAr,
      noteEn: config.shippingNoteEn,
      noteAr: config.shippingNoteAr,
      allowEveryAreaWithinCity: true,
    },
    address: {
      labelEn: "Store address",
      labelAr: "عنوان المحل",
      lineEn: config.addressEn,
      lineAr: config.addressAr,
    },
  };
}

export async function listTestimonials(): Promise<ReviewCard[]> {
  return deepClone(getMemoryDb().testimonials);
}
