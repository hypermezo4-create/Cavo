import type {
  Brand,
  Category,
  CreateOrderInput,
  CreateProductInput,
  Order,
  Product,
  ProductReview,
  ProductVariant,
  ProductsResponse,
  ReviewCard,
  StoreConfig,
  UpdateProductInput,
} from "@/lib/store-types";

export type {
  Brand,
  Category,
  CreateOrderInput,
  CreateProductInput,
  Order,
  Product,
  ProductReview,
  ProductVariant,
  ProductsResponse,
  ReviewCard,
  StoreConfig,
  UpdateProductInput,
} from "@/lib/store-types";

async function requestJson<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "Request failed.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function getCategories(): Promise<Category[]> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.listCategories();
  }
  return requestJson<Category[]>("/api/store/categories");
}

export async function getBrands(): Promise<Brand[]> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.listBrands();
  }
  return requestJson<Brand[]>("/api/store/brands");
}

export async function getProducts(): Promise<Product[]> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.listProducts();
  }
  return requestJson<Product[]>("/api/store/products");
}

export async function getFeaturedCatalog(limit = 6): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((product) => product.isFeatured || product.isNewArrival).slice(0, limit);
}

export async function getProductsBySection(category?: "men" | "women" | "kids" | "offers"): Promise<Product[]> {
  const products = await getProducts();
  if (!category) return products;
  return products.filter((product) => product.category?.slug === category);
}

export async function getProductById(id: string): Promise<Product> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    const product = await service.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }
  return requestJson<Product>(`/api/store/products/${id}`);
}

export async function getOrders(): Promise<Order[]> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.listOrders();
  }
  return requestJson<Order[]>("/api/store/orders");
}

export async function createProduct(data: CreateProductInput): Promise<Product> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.createProduct(data);
  }
  return requestJson<Product>("/api/store/products", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: string, data: UpdateProductInput): Promise<Product> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.updateProduct(id, data);
  }
  return requestJson<Product>(`/api/store/products/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: string): Promise<{ success: true }> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.deleteProduct(id);
  }
  return requestJson<{ success: true }>(`/api/store/products/${id}`, {
    method: "DELETE",
  });
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.updateOrderStatus(id, status);
  }
  return requestJson<Order>(`/api/store/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function createOrder(data: CreateOrderInput): Promise<Order> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.createOrder(data);
  }
  return requestJson<Order>("/api/store/orders", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getTestimonials(): Promise<ReviewCard[]> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.listTestimonials();
  }
  return requestJson<ReviewCard[]>("/api/store/testimonials");
}

export async function getStoreConfig(): Promise<StoreConfig> {
  if (typeof window === "undefined") {
    const service = await import("@/lib/server/store-service");
    return service.getStoreConfig();
  }
  return requestJson<StoreConfig>("/api/store/config");
}
