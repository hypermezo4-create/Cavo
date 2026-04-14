import { notFound } from "next/navigation";
import ProductDetailsClient from "@/components/store/ProductDetailsClient";
import { getProductById, getProducts } from "@/lib/api";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  try {
    const product = await getProductById(params.id);
    return <ProductDetailsClient product={product} />;
  } catch {
    return notFound();
  }
}
