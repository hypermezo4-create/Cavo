import StoreGrid from "@/components/store/StoreGrid";

export const metadata = {
  title: "Selected Collection | Cavo",
  description: "Highlighted premium showcase products from the Cavo collection.",
};

export default function Page() {
  return (
    <StoreGrid
      category="Offers"
      title="Selected Collection"
      description="Highlighted premium showcase products from the Cavo collection."
    />
  );
}
