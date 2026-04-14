import StoreGrid from "@/components/store/StoreGrid";

export const metadata = { title: "Products | Cavo", description: "Browse all Cavo products" };

export default function ProductsPage() {
  return <StoreGrid title="All products" description="Browse the full Cavo mirror collection across all categories." />;
}
