import fs from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const imagesRoot = path.join(projectRoot, "public", "images", "cavo");
const outputPath = path.join(projectRoot, "lib", "generated", "catalog-image-manifest.generated.ts");

const sizesMap = {
  men: ["41", "42", "43", "44", "45", "46"],
  women: ["36", "37", "38", "39", "40", "41"],
  kids: ["22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"],
};

const brandMap = {
  air_force: "Nike",
  samba: "Adidas",
  jordan4: "Jordan",
  newbalance_530: "New Balance",
  aciss: "ASICS",
  dank: "Nike Dunk",
  one_cloud: "On",
  alexander_mcqueen: "Alexander McQueen",
  cambos: "Campus",
};

const nameMap = {
  w_b: "White Black",
  black_cat: "Black Cat",
  red_sander: "Red Sander",
  blue: "Blue",
  beige_brown: "Beige Brown",
  beige_green: "Beige Green",
  gray_petrol: "Gray Petrol",
  air_force_gucci: "Gucci",
  air_force_undeeated: "Undefeated",
  b: "Black",
  w: "White",
  berlue: "Blue",
  brwon_wajnzarari: "Brown",
  cofe_black: "Coffee Black",
  grey_black: "Grey Black",
  the_northe_face: "The North Face",
  cambos_black_withe: "Black White",
  gray: "Gray",
  green: "Green",
  panda: "Panda",
  black_withe: "Black White",
  g: "Green",
  grey: "Grey",
  p: "Pink",
  red: "Red",
};

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function titleize(value) {
  return value.replace(/[_-]+/g, " ").trim().split(/\s+/).map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function walkLeafGroups(baseDir) {
  const results = [];
  function walk(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    const files = items.filter((item) => item.isFile() && /\.(jpg|jpeg|png|webp|svg)$/i.test(item.name)).map((item) => item.name).sort();
    if (files.length) results.push({ dir: currentDir, files });
    for (const item of items) if (item.isDirectory()) walk(path.join(currentDir, item.name));
  }
  walk(baseDir);
  return results;
}

function buildName(parts) {
  const brandKey = (parts[0] || "").toLowerCase();
  const variantKey = (parts[parts.length - 1] || "").toLowerCase();
  const brand = brandMap[brandKey] || titleize(parts[0] || "Cavo");
  const variant = nameMap[variantKey] || titleize(parts[parts.length - 1] || "Default");
  let model = "";
  if (brandKey === "jordan4") model = "Jordan 4";
  else if (brandKey === "newbalance_530") model = "530";
  else if (brandKey === "alexander_mcqueen") model = "Alexander McQueen";
  else if (brandKey === "one_cloud") model = "Cloud";
  else if (brandKey === "dank") model = "Dunk";
  else if (brandKey === "cambos") model = "Campus";
  else if (brandKey === "aciss") model = "Sport";
  else if (brandKey === "air_force") model = "Air Force";
  else if (brandKey === "samba") model = "Samba";
  return (model ? `${brand} ${model} ${variant}` : `${brand} ${variant}`).replace(/\s+/g, " ").trim();
}

function createEntries() {
  const entries = [];
  for (const category of ["men", "women"]) {
    const baseDir = path.join(imagesRoot, category);
    for (const group of walkLeafGroups(baseDir)) {
      const rel = path.relative(baseDir, group.dir).split(path.sep).join("/");
      const parts = rel.split("/");
      const brand = brandMap[(parts[0] || "").toLowerCase()] || titleize(parts[0] || "Cavo");
      const name = buildName(parts);
      const variant = nameMap[(parts[parts.length - 1] || "").toLowerCase()] || titleize(parts[parts.length - 1] || "Default");
      const images = group.files.map((file) => `/images/cavo/${category}/${rel}/${file}`);
      entries.push({
        id: `${category}-${slugify(rel)}`,
        slug: `${category}-${slugify(rel)}`,
        name,
        brand,
        category,
        description: `Premium ${category} catalog entry generated from the current project images for ${name}.`,
        image: images[0],
        images,
        sizes: sizesMap[category],
        colors: [variant],
        featured: false,
        home: false,
      });
    }
  }

  const kidsDir = path.join(imagesRoot, "products");
  const files = fs.readdirSync(kidsDir).filter((file) => /\.(svg|png|jpg|jpeg|webp)$/i.test(file)).sort();
  const groups = new Map();
  for (const file of files) {
    const key = file.replace(/-\d+(?=\.[^.]+$)/, "").replace(/\.[^.]+$/, "");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(file);
  }

  for (const [key, groupedFiles] of groups.entries()) {
    const pretty = key.replace(/^cavo-/, "").split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    const images = groupedFiles.map((file) => `/images/cavo/products/${file}`);
    entries.push({
      id: `kids-${slugify(key)}`,
      slug: `kids-${slugify(key)}`,
      name: `Cavo Kids ${pretty}`,
      brand: "Cavo Kids",
      category: "kids",
      description: `Premium kids catalog entry generated from the current project images for Cavo Kids ${pretty}.`,
      image: images[0],
      images,
      sizes: sizesMap.kids,
      colors: [pretty],
      featured: false,
      home: false,
    });
  }

  return entries.sort((a, b) => a.category.localeCompare(b.category) || a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name));
}

const entries = createEntries();
const content = `import type { SiteProduct } from "@/lib/site-data";\n\nexport const IMAGE_BASED_PRODUCTS: SiteProduct[] = ${JSON.stringify(entries, null, 2)};\n`;
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, content);
console.log(`Generated ${entries.length} catalog groups at ${path.relative(projectRoot, outputPath)}`);
