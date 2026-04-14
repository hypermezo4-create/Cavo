"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getBrands,
  getCategories,
  getOrders,
  getProducts,
  getStoreConfig,
  getTestimonials,
  updateOrderStatus,
  type Brand,
  type Category,
  type Order,
  type Product,
  type ReviewCard,
  type StoreConfig,
} from "@/lib/api";
import { CAVO_STORE_CONFIG } from "@/lib/store-config";

function useAsyncCollection<T>(loader: () => Promise<T[]>) {
  const [items, setItems] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const nextItems = await loader();
      setItems(nextItems);
    } catch {
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { items, setItems, isLoading, refresh };
}

export function useProducts() {
  return useProductsState().items;
}

export function useProductsState() {
  return useAsyncCollection<Product>(getProducts);
}

export function useOrders() {
  return useOrdersState().items;
}

export function useOrdersState() {
  const state = useAsyncCollection<Order>(getOrders);

  const updateStatus = useCallback(
    async (id: string, status: Order["status"]) => {
      const updated = await updateOrderStatus(id, status);
      state.setItems((current) => current.map((order) => (order.id === id ? updated : order)));
      return updated;
    },
    [state],
  );

  return {
    ...state,
    updateStatus,
  };
}

export function useCategories() {
  return useCategoriesState().items;
}

export function useCategoriesState() {
  return useAsyncCollection<Category>(getCategories);
}

export function useBrands() {
  return useBrandsState().items;
}

export function useBrandsState() {
  return useAsyncCollection<Brand>(getBrands);
}

export function useTestimonials() {
  const [items, setItems] = useState<ReviewCard[]>([]);

  useEffect(() => {
    getTestimonials().then(setItems).catch(() => setItems([]));
  }, []);

  return items;
}

export function useStoreConfig() {
  const [config, setConfig] = useState<StoreConfig>(CAVO_STORE_CONFIG);

  useEffect(() => {
    getStoreConfig().then(setConfig).catch(() => setConfig(CAVO_STORE_CONFIG));
  }, []);

  return config;
}

export function useStoreMeta() {
  const categoriesState = useCategoriesState();
  const brandsState = useBrandsState();

  return useMemo(
    () => ({
      categories: categoriesState.items,
      brands: brandsState.items,
      isLoading: categoriesState.isLoading || brandsState.isLoading,
      refresh: async () => {
        await Promise.all([categoriesState.refresh(), brandsState.refresh()]);
      },
    }),
    [brandsState, categoriesState],
  );
}
