import StoreGrid from "@/components/store/StoreGrid";

export const metadata = {
  title: "Men Collection | Cavo",
  description: "Premium mirror footwear for men with a sharp dark presentation.",
};

export default function Page() {
  return (
    <StoreGrid
      category="Men"
      title="Men Collection"
      description="Premium mirror footwear for men with a sharp dark presentation."
    />
  );
}