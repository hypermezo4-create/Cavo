import StoreGrid from "@/components/store/StoreGrid";

export const metadata = {
  title: "Kids Collection | Cavo",
  description: "Durable and stylish kids footwear with premium presentation.",
};

export default function Page() {
  return (
    <StoreGrid
      category="Kids"
      title="Kids Collection"
      description="Durable and stylish kids footwear with premium presentation."
    />
  );
}