"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ImagePlus, Languages, Monitor, Sparkles, Wand2 } from "lucide-react";
import { AdminPageShell } from "@/components/admin/AdminPageShell";
import UploadButton from "@/components/admin/UploadButton";
import { createProduct, getProductById, updateProduct, type CreateProductInput } from "@/lib/api";
import { useSiteLocale } from "@/lib/use-site-locale";
import { useStoreMeta } from "@/lib/use-store-data";

const DEFAULT_IMAGE = "/images/brand/logo.jpg";
const COLOR_SUGGESTIONS = ["Black", "White", "Beige", "Grey", "Brown", "Green", "Blue", "Pink", "Red"];
const SIZE_PRESETS: Record<string, string[]> = {
  men: Array.from({ length: 6 }, (_, index) => String(41 + index)),
  women: Array.from({ length: 6 }, (_, index) => String(36 + index)),
  kids: Array.from({ length: 14 }, (_, index) => String(22 + index)),
};

type ProductEditorProps = {
  productId?: string;
};

type ProductFormState = {
  slug: string;
  sku: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  shortDescriptionEn: string;
  shortDescriptionAr: string;
  categoryId: string;
  brandId: string;
  featuredImage: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: string;
  price: string;
  salePrice: string;
  currency: string;
  isActive: boolean;
  isFeatured: boolean;
  isNewArrival: boolean;
  isOnSale: boolean;
};

type ToggleKey = "isActive" | "isFeatured" | "isNewArrival" | "isOnSale";

const ui = {
  en: {
    titleCreate: "Create product",
    titleEdit: "Edit product",
    subtitle: "Smooth bilingual admin for images, content, sizing, and storefront placement.",
    basics: "Product basics",
    media: "Images and placement",
    inventory: "Sizing, stock, and visibility",
    preview: "Live product preview",
    englishName: "English name",
    arabicName: "Arabic name",
    slug: "Slug",
    sku: "SKU",
    shortEn: "Short description (EN)",
    shortAr: "Short description (AR)",
    descEn: "Full description (EN)",
    descAr: "Full description (AR)",
    category: "Category",
    brand: "Brand",
    mainImage: "Main card image",
    gallery: "Gallery images",
    uploadMain: "Upload main image",
    uploadGallery: "Upload gallery images",
    uploadHelp: "Large images are kept in high quality. Upload one by one or a small batch for best stability.",
    addImageUrl: "Paste image URL and add",
    setMain: "Set as main",
    remove: "Remove",
    imagePlacement: "How images appear",
    placementHelp:
      "The main image appears on product cards and at the top of the product page. Gallery images stay inside the product details slider.",
    suggestedSizes: "Suggested sizes",
    colors: "Colors",
    stock: "Stock",
    currency: "Currency",
    price: "Price",
    salePrice: "Sale price",
    active: "Visible on site",
    featured: "Featured section",
    newArrival: "New arrivals",
    onSale: "Offers section",
    saveCreate: "Create product",
    saveEdit: "Save changes",
    saving: "Saving...",
    productName: "Product name",
    productDescription: "Product description",
    adminTip: "Tip",
    adminTipText:
      "Pick the main image first, then upload the rest of the gallery. After saving, the updated product appears on the site right away.",
    arabicSupport: "Arabic + English ready",
    mediaSupport: "Live image preview",
    sectionDisplay: "Section display",
    noImages: "No gallery images yet.",
    colorsPlaceholder: "Choose or type colors",
    descriptionsPlaceholderEn: "Write a clear premium English description for the product.",
    descriptionsPlaceholderAr: "اكتب وصفًا عربيًا واضحًا ومهنيًا للمنتج.",
    shortPlaceholderEn: "One clean line for cards and quick highlights.",
    shortPlaceholderAr: "سطر مختصر يظهر في البطاقات أو الملخصات السريعة.",
    externalImage: "Add image from link",
    previewNote: "This preview updates instantly while you edit.",
  },
  ar: {
    titleCreate: "إضافة منتج",
    titleEdit: "تعديل المنتج",
    subtitle: "لوحة تحكم مرنة لإدارة الصور والمحتوى والمقاسات ومواضع الظهور داخل الموقع.",
    basics: "بيانات المنتج الأساسية",
    media: "الصور ومواضع الظهور",
    inventory: "المقاسات والمخزون والظهور",
    preview: "معاينة المنتج مباشرة",
    englishName: "اسم المنتج بالإنجليزية",
    arabicName: "اسم المنتج بالعربية",
    slug: "رابط المنتج المختصر",
    sku: "كود المنتج",
    shortEn: "الوصف المختصر بالإنجليزية",
    shortAr: "الوصف المختصر بالعربية",
    descEn: "الوصف الكامل بالإنجليزية",
    descAr: "الوصف الكامل بالعربية",
    category: "القسم",
    brand: "البراند",
    mainImage: "الصورة الرئيسية للكارت",
    gallery: "صور الجاليري",
    uploadMain: "رفع الصورة الرئيسية",
    uploadGallery: "رفع صور الجاليري",
    uploadHelp: "الصور تبقى بجودتها العالية. ارفع صورة واحدة أو مجموعة صغيرة للحفاظ على السلاسة والاستقرار.",
    addImageUrl: "ألصق رابط الصورة ثم أضفها",
    setMain: "اجعلها الرئيسية",
    remove: "حذف",
    imagePlacement: "طريقة ظهور الصور",
    placementHelp: "الصورة الرئيسية تظهر في كروت المنتجات وفي أعلى صفحة المنتج. باقي الصور تظهر داخل معرض التفاصيل.",
    suggestedSizes: "المقاسات المقترحة",
    colors: "الألوان",
    stock: "المخزون",
    currency: "العملة",
    price: "السعر",
    salePrice: "سعر العرض",
    active: "ظاهر في الموقع",
    featured: "قسم المنتجات المميزة",
    newArrival: "قسم الجديد",
    onSale: "قسم العروض",
    saveCreate: "إضافة المنتج",
    saveEdit: "حفظ التعديلات",
    saving: "جارٍ الحفظ...",
    productName: "اسم المنتج",
    productDescription: "وصف المنتج",
    adminTip: "مهم",
    adminTipText: "اختر الصورة الرئيسية أولًا ثم أضف باقي صور الجاليري. بعد الحفظ سيظهر التعديل في الموقع مباشرة.",
    arabicSupport: "عربي + إنجليزي",
    mediaSupport: "معاينة فورية للصور",
    sectionDisplay: "أماكن الظهور",
    noImages: "لا توجد صور جاليري بعد.",
    colorsPlaceholder: "اختر الألوان أو اكتبها",
    descriptionsPlaceholderEn: "اكتب وصفًا إنجليزيًا واضحًا ومهنيًا للمنتج.",
    descriptionsPlaceholderAr: "اكتب وصفًا عربيًا واضحًا ومهنيًا للمنتج.",
    shortPlaceholderEn: "سطر مختصر يظهر في البطاقات أو الملخص السريع.",
    shortPlaceholderAr: "سطر مختصر يظهر في البطاقات أو الملخص السريع.",
    externalImage: "إضافة صورة من رابط",
    previewNote: "المعاينة تتحدث فورًا أثناء التعديل.",
  },
} as const;

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.map((item) => item.trim()).filter(Boolean)));
}

function createInitialForm(): ProductFormState {
  return {
    slug: "",
    sku: "",
    nameEn: "",
    nameAr: "",
    descriptionEn: "",
    descriptionAr: "",
    shortDescriptionEn: "",
    shortDescriptionAr: "",
    categoryId: "",
    brandId: "",
    featuredImage: DEFAULT_IMAGE,
    images: [],
    sizes: [],
    colors: [],
    stock: "0",
    price: "",
    salePrice: "",
    currency: "EGP",
    isActive: true,
    isFeatured: false,
    isNewArrival: false,
    isOnSale: false,
  };
}

function mapProductToForm(product: Awaited<ReturnType<typeof getProductById>>): ProductFormState {
  const mainImage = product.featuredImage || product.image || DEFAULT_IMAGE;
  const gallery = uniqueStrings(product.images?.length ? [mainImage, ...product.images] : [mainImage]);

  return {
    slug: product.slug || "",
    sku: product.sku || "",
    nameEn: product.nameEn || product.name || "",
    nameAr: product.nameAr || product.name || "",
    descriptionEn: product.descriptionEn || product.description || "",
    descriptionAr: product.descriptionAr || product.description || "",
    shortDescriptionEn: product.shortDescriptionEn || "",
    shortDescriptionAr: product.shortDescriptionAr || "",
    categoryId: product.categoryId,
    brandId: product.brandId,
    featuredImage: mainImage,
    images: gallery,
    sizes: product.sizes || [],
    colors: product.colors || [],
    stock: String(product.stock ?? 0),
    price: product.price == null ? "" : String(product.price),
    salePrice: product.salePrice == null ? "" : String(product.salePrice),
    currency: product.currency || "EGP",
    isActive: Boolean(product.isActive ?? true),
    isFeatured: Boolean(product.isFeatured),
    isNewArrival: Boolean(product.isNewArrival),
    isOnSale: Boolean(product.isOnSale),
  };
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-white/55">{children}</span>;
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 ${props.className || ""}`}
    />
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/25 ${props.className || ""}`}
    />
  );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none ${props.className || ""}`}
    />
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-sm transition ${
        active ? "border-amber-400/50 bg-amber-400/15 text-amber-100" : "border-white/10 bg-white/5 text-white/75 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function SectionCard({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[30px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="mb-5 flex items-start gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-amber-200">{icon}</div>
        <div>
          <h2 className="text-xl font-black text-white">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-white/55">{subtitle}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

export default function ProductEditor({ productId }: ProductEditorProps) {
  const router = useRouter();
  const { categories, brands, isLoading: optionsLoading } = useStoreMeta();
  const { locale, isArabic } = useSiteLocale();
  const t = ui[locale];
  const isEdit = Boolean(productId);

  const [form, setForm] = useState<ProductFormState>(createInitialForm);
  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [customColor, setCustomColor] = useState("");
  const [autoSizedCategorySlug, setAutoSizedCategorySlug] = useState<string | null>(null);

  useEffect(() => {
    if (!form.categoryId && categories.length) {
      setForm((current) => ({ ...current, categoryId: categories[0].id }));
    }
  }, [categories, form.categoryId]);

  useEffect(() => {
    if (!form.brandId && brands.length) {
      setForm((current) => ({ ...current, brandId: brands[0].id }));
    }
  }, [brands, form.brandId]);

  useEffect(() => {
    if (!productId) return;

    setIsLoading(true);
    getProductById(productId)
      .then((product) => setForm(mapProductToForm(product)))
      .catch((loadError) => setError(loadError instanceof Error ? loadError.message : "Failed to load product."))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === form.categoryId) || null,
    [categories, form.categoryId],
  );

  const selectedCategorySlug = selectedCategory?.slug || "";
  const suggestedSizes = SIZE_PRESETS[selectedCategorySlug] || [];

  useEffect(() => {
    if (!selectedCategorySlug || !suggestedSizes.length) return;
    if (autoSizedCategorySlug === selectedCategorySlug) return;

    setForm((current) => ({ ...current, sizes: suggestedSizes }));
    setAutoSizedCategorySlug(selectedCategorySlug);
  }, [autoSizedCategorySlug, selectedCategorySlug, suggestedSizes]);

  const visibleImages = useMemo(
    () =>
      uniqueStrings([
        form.featuredImage && form.featuredImage !== DEFAULT_IMAGE ? form.featuredImage : "",
        ...form.images,
      ]),
    [form.featuredImage, form.images],
  );

  const toggleItems: Array<{
    label: string;
    checked: boolean;
    key: ToggleKey;
  }> = [
    { label: t.active, checked: form.isActive, key: "isActive" },
    { label: t.featured, checked: form.isFeatured, key: "isFeatured" },
    { label: t.newArrival, checked: form.isNewArrival, key: "isNewArrival" },
    { label: t.onSale, checked: form.isOnSale, key: "isOnSale" },
  ];

  const handleFieldChange =
    (field: keyof ProductFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;

      setForm((current) => {
        const next = { ...current, [field]: value } as ProductFormState;

        if (field === "nameEn" && !current.slug.trim()) {
          next.slug = slugify(value);
        }

        return next;
      });
    };

  const handleToggleChange = (key: ToggleKey, checked: boolean) => {
    setForm((current) => {
      switch (key) {
        case "isActive":
          return { ...current, isActive: checked };
        case "isFeatured":
          return { ...current, isFeatured: checked };
        case "isNewArrival":
          return { ...current, isNewArrival: checked };
        case "isOnSale":
          return { ...current, isOnSale: checked };
        default:
          return current;
      }
    });
  };

  const setFeaturedImage = (image: string) => {
    setForm((current) => ({
      ...current,
      featuredImage: image,
      images: uniqueStrings([image, ...current.images.filter((item) => item !== image)]),
    }));
  };

  const appendImages = (urls: string[]) => {
    setForm((current) => {
      const merged = uniqueStrings([...current.images, ...urls]);

      return {
        ...current,
        featuredImage: current.featuredImage || urls[0] || DEFAULT_IMAGE,
        images: merged,
      };
    });
  };

  const addImageFromUrl = () => {
    if (!imageUrlInput.trim()) return;

    const nextUrl = imageUrlInput.trim();
    appendImages([nextUrl]);

    if (!form.featuredImage || form.featuredImage === DEFAULT_IMAGE) {
      setFeaturedImage(nextUrl);
    }

    setImageUrlInput("");
  };

  const removeImage = (image: string) => {
    setForm((current) => {
      const remaining = current.images.filter((item) => item !== image);
      const nextFeatured = current.featuredImage === image ? remaining[0] || DEFAULT_IMAGE : current.featuredImage;

      return {
        ...current,
        featuredImage: nextFeatured,
        images: remaining,
      };
    });
  };

  const toggleSize = (size: string) => {
    setForm((current) => ({
      ...current,
      sizes: current.sizes.includes(size)
        ? current.sizes.filter((item) => item !== size)
        : uniqueStrings([...current.sizes, size]),
    }));
  };

  const toggleColor = (color: string) => {
    setForm((current) => ({
      ...current,
      colors: current.colors.includes(color)
        ? current.colors.filter((item) => item !== color)
        : uniqueStrings([...current.colors, color]),
    }));
  };

  const addCustomColor = () => {
    const nextColor = customColor.trim();
    if (!nextColor) return;

    setForm((current) => ({
      ...current,
      colors: uniqueStrings([...current.colors, nextColor]),
    }));

    setCustomColor("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSaving(true);

    const payload: CreateProductInput = {
      slug: form.slug || slugify(form.nameEn || form.nameAr),
      sku: form.sku || undefined,
      name: form.nameEn || form.nameAr,
      nameEn: form.nameEn || form.nameAr,
      nameAr: form.nameAr || form.nameEn,
      description: form.descriptionEn || form.descriptionAr,
      descriptionEn: form.descriptionEn || form.descriptionAr,
      descriptionAr: form.descriptionAr || form.descriptionEn,
      shortDescriptionEn: form.shortDescriptionEn || null,
      shortDescriptionAr: form.shortDescriptionAr || null,
      categoryId: form.categoryId,
      brandId: form.brandId,
      featuredImage: form.featuredImage || DEFAULT_IMAGE,
      image: form.featuredImage || DEFAULT_IMAGE,
      images: uniqueStrings([
        ...(form.featuredImage && form.featuredImage !== DEFAULT_IMAGE ? [form.featuredImage] : []),
        ...form.images,
      ]),
      sizes: uniqueStrings(form.sizes),
      colors: uniqueStrings(form.colors),
      stock: Number(form.stock || 0),
      price: form.price ? Number(form.price) : null,
      salePrice: form.salePrice ? Number(form.salePrice) : null,
      currency: form.currency || "EGP",
      isActive: form.isActive,
      isFeatured: form.isFeatured,
      isNewArrival: form.isNewArrival,
      isOnSale: form.isOnSale,
    };

    try {
      if (isEdit && productId) {
        await updateProduct(productId, payload);
      } else {
        await createProduct(payload);
      }

      router.push("/admin/products");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save product.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminPageShell title={isEdit ? t.titleEdit : t.titleCreate} subtitle={t.subtitle}>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/65">Loading...</div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell title={isEdit ? t.titleEdit : t.titleCreate} subtitle={t.subtitle}>
      <form onSubmit={handleSubmit} className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <SectionCard title={t.basics} subtitle={t.arabicSupport} icon={<Languages className="h-5 w-5" />}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.englishName}</FieldLabel>
                <Input value={form.nameEn} onChange={handleFieldChange("nameEn")} placeholder="New Balance 530 Blue" required />
              </div>
              <div>
                <FieldLabel>{t.arabicName}</FieldLabel>
                <Input value={form.nameAr} onChange={handleFieldChange("nameAr")} placeholder="نيو بالانس 530 أزرق" required />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.slug}</FieldLabel>
                <Input value={form.slug} onChange={handleFieldChange("slug")} placeholder="new-balance-530-blue" />
              </div>
              <div>
                <FieldLabel>{t.sku}</FieldLabel>
                <Input value={form.sku} onChange={handleFieldChange("sku")} placeholder="CAVO-NB530-BLUE" />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.category}</FieldLabel>
                <Select value={form.categoryId} onChange={handleFieldChange("categoryId")} disabled={optionsLoading || !categories.length}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {isArabic ? category.nameAr : category.nameEn}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <FieldLabel>{t.brand}</FieldLabel>
                <Select value={form.brandId} onChange={handleFieldChange("brandId")} disabled={optionsLoading || !brands.length}>
                  {brands.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {isArabic ? brand.nameAr : brand.nameEn}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.shortEn}</FieldLabel>
                <Textarea value={form.shortDescriptionEn} onChange={handleFieldChange("shortDescriptionEn")} rows={3} placeholder={t.shortPlaceholderEn} />
              </div>
              <div>
                <FieldLabel>{t.shortAr}</FieldLabel>
                <Textarea value={form.shortDescriptionAr} onChange={handleFieldChange("shortDescriptionAr")} rows={3} placeholder={t.shortPlaceholderAr} />
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>{t.descEn}</FieldLabel>
                <Textarea value={form.descriptionEn} onChange={handleFieldChange("descriptionEn")} rows={7} placeholder={t.descriptionsPlaceholderEn} />
              </div>
              <div>
                <FieldLabel>{t.descAr}</FieldLabel>
                <Textarea value={form.descriptionAr} onChange={handleFieldChange("descriptionAr")} rows={7} placeholder={t.descriptionsPlaceholderAr} />
              </div>
            </div>
          </SectionCard>

          <SectionCard title={t.media} subtitle={t.mediaSupport} icon={<ImagePlus className="h-5 w-5" />}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <FieldLabel>{t.mainImage}</FieldLabel>
                <img
                  src={form.featuredImage || DEFAULT_IMAGE}
                  alt="Featured preview"
                  className="h-64 w-full rounded-[28px] border border-white/10 bg-black/20 object-cover"
                />
                <UploadButton
                  onUploaded={(urls) => {
                    appendImages(urls);
                    setFeaturedImage(urls[0]!);
                  }}
                  label={t.uploadMain}
                  helperText={t.uploadHelp}
                />
              </div>

              <div className="space-y-3">
                <FieldLabel>{t.gallery}</FieldLabel>
                <div className="grid max-h-64 grid-cols-2 gap-3 overflow-y-auto rounded-[28px] border border-white/10 bg-black/20 p-3">
                  {visibleImages.length ? (
                    visibleImages.map((image) => (
                      <div key={image} className="rounded-2xl border border-white/10 bg-white/[0.03] p-2">
                        <img src={image} alt="Gallery item" className="h-28 w-full rounded-xl object-cover" />
                        <div className="mt-2 grid gap-2">
                          <button
                            type="button"
                            onClick={() => setFeaturedImage(image)}
                            className={`rounded-xl px-3 py-2 text-xs font-semibold ${
                              form.featuredImage === image ? "bg-emerald-500/20 text-emerald-100" : "bg-white/10 text-white/80"
                            }`}
                          >
                            {form.featuredImage === image ? `${t.setMain} • ${isArabic ? "مفعلة" : "Active"}` : t.setMain}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeImage(image)}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-100"
                          >
                            {t.remove}
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 rounded-2xl border border-dashed border-white/10 p-5 text-sm text-white/45">{t.noImages}</div>
                  )}
                </div>

                <UploadButton onUploaded={appendImages} label={t.uploadGallery} helperText={t.uploadHelp} multiple maxFiles={20} />
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/20 p-4">
              <FieldLabel>{t.externalImage}</FieldLabel>
              <div className="flex flex-col gap-3 md:flex-row">
                <Input value={imageUrlInput} onChange={(event) => setImageUrlInput(event.target.value)} placeholder="https://.../image.webp" />
                <button type="button" onClick={addImageFromUrl} className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-black">
                  <Wand2 className="mr-2 inline h-4 w-4" />
                  {t.addImageUrl}
                </button>
              </div>
            </div>

            <div className="mt-5 rounded-[24px] border border-amber-400/15 bg-amber-400/5 p-4 text-sm leading-6 text-white/75">
              <div className="font-bold text-white">{t.imagePlacement}</div>
              <p className="mt-2">{t.placementHelp}</p>
            </div>
          </SectionCard>

          <SectionCard title={t.inventory} subtitle={t.sectionDisplay} icon={<Sparkles className="h-5 w-5" />}>
            <div>
              <FieldLabel>{t.suggestedSizes}</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {suggestedSizes.map((size) => (
                  <Chip key={size} active={form.sizes.includes(size)} onClick={() => toggleSize(size)}>
                    {size}
                  </Chip>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <FieldLabel>{t.colors}</FieldLabel>
              <div className="flex flex-wrap gap-2">
                {COLOR_SUGGESTIONS.map((color) => (
                  <Chip key={color} active={form.colors.includes(color)} onClick={() => toggleColor(color)}>
                    {color}
                  </Chip>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-3 md:flex-row">
                <Input value={customColor} onChange={(event) => setCustomColor(event.target.value)} placeholder={t.colorsPlaceholder} />
                <button type="button" onClick={addCustomColor} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-semibold text-white">
                  {isArabic ? "إضافة لون" : "Add color"}
                </button>
              </div>

              {!!form.colors.length && <p className="mt-3 text-sm text-white/55">{form.colors.join(" • ")}</p>}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <FieldLabel>{t.stock}</FieldLabel>
                <Input type="number" min="0" value={form.stock} onChange={handleFieldChange("stock")} />
              </div>
              <div>
                <FieldLabel>{t.currency}</FieldLabel>
                <Input value={form.currency} onChange={handleFieldChange("currency")} placeholder="EGP" />
              </div>
              <div>
                <FieldLabel>{t.price}</FieldLabel>
                <Input type="number" min="0" step="0.01" value={form.price} onChange={handleFieldChange("price")} />
              </div>
              <div>
                <FieldLabel>{t.salePrice}</FieldLabel>
                <Input type="number" min="0" step="0.01" value={form.salePrice} onChange={handleFieldChange("salePrice")} />
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {toggleItems.map(({ label, checked, key }) => (
                <label
                  key={key}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80"
                >
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(event) => handleToggleChange(key, event.target.checked)}
                    className="h-4 w-4"
                  />
                </label>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6 xl:sticky xl:top-8 xl:self-start">
          <SectionCard title={t.preview} subtitle={t.previewNote} icon={<Monitor className="h-5 w-5" />}>
            <div className="overflow-hidden rounded-[30px] border border-white/10 bg-black/20">
              <img src={form.featuredImage || DEFAULT_IMAGE} alt="Preview" className="h-72 w-full object-cover" />
              <div className="space-y-4 p-5">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-amber-200">{t.productName}</div>
                  <h3 className="mt-2 text-2xl font-black text-white">
                    {isArabic ? form.nameAr || form.nameEn || "Cavo Product" : form.nameEn || form.nameAr || "Cavo Product"}
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    {isArabic ? form.shortDescriptionAr || form.shortDescriptionEn : form.shortDescriptionEn || form.shortDescriptionAr}
                  </p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-amber-200">{t.productDescription}</div>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {isArabic ? form.descriptionAr || form.descriptionEn : form.descriptionEn || form.descriptionAr}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.sizes.slice(0, 8).map((size) => (
                    <span key={size} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-emerald-400/15 bg-emerald-400/5 p-4 text-sm leading-6 text-white/75">
              <div className="mb-2 flex items-center gap-2 font-bold text-white">
                <Check className="h-4 w-4 text-emerald-300" />
                {t.adminTip}
              </div>
              <p>{t.adminTipText}</p>
            </div>

            {error ? (
              <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={isSaving || optionsLoading}
              className="w-full rounded-2xl bg-white px-6 py-4 text-sm font-black uppercase tracking-[0.18em] text-black disabled:opacity-60"
            >
              {isSaving ? t.saving : isEdit ? t.saveEdit : t.saveCreate}
            </button>
          </SectionCard>
        </div>
      </form>
    </AdminPageShell>
  );
}