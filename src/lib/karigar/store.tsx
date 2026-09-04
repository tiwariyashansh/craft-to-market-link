import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  SEED_PRODUCTS,
  calculatePrice,
  type AiTemplate,
  type Product,
  type ProductStatus,
} from "./data";

export type Draft = Partial<Product> & { photo?: string };

export type Language = "en" | "hi";

type Store = {
  products: Product[];
  draft: Draft | null;
  language: Language;
  artisanName: string;
  setLanguage: (l: Language) => void;
  setArtisan: (name: string) => void;
  startDraft: (d: Draft) => void;
  updateDraft: (d: Draft) => void;
  clearDraft: () => void;
  saveDraft: (status: ProductStatus) => Product;
  setStatus: (id: string, status: ProductStatus) => void;
  getProduct: (id: string) => Product | undefined;
  updateProduct: (id: string, patch: Partial<Product>) => void;
};

const StoreContext = createContext<Store | null>(null);

export function fromTemplate(t: AiTemplate, photo?: string): Draft {
  return { ...t, photo, status: "catalog" };
}

let counter = 0;

export function KarigarProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [language, setLanguage] = useState<Language>("en");
  const [artisanName, setArtisan] = useState("Meena Devi");

  const startDraft = useCallback((d: Draft) => setDraft({ ...d }), []);
  const updateDraft = useCallback(
    (d: Draft) => setDraft((prev) => ({ ...(prev ?? {}), ...d })),
    [],
  );
  const clearDraft = useCallback(() => setDraft(null), []);

  const saveDraft = useCallback(
    (status: ProductStatus) => {
      const d = draft ?? {};
      const price = calculatePrice(d.materialCost ?? 0, d.labourCost ?? 0);
      const existingId = d.id;
      const product: Product = {
        id: existingId ?? `p-${Date.now()}-${counter++}`,
        name: d.name ?? "Untitled product",
        craft: d.craft ?? "",
        category: d.category ?? "Home Decor",
        material: d.material ?? "",
        title: d.title ?? d.name ?? "Untitled product",
        description: d.description ?? "",
        tags: d.tags ?? [],
        confidence: d.confidence ?? 85,
        status,
        photo: d.photo,
        icon: d.icon ?? "pot",
        materialCost: d.materialCost ?? 0,
        labourCost: d.labourCost ?? 0,
        makingTime: d.makingTime ?? "",
        size: d.size ?? "",
        retail: d.retail ?? price.retail,
        wholesale: d.wholesale ?? price.wholesale,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setProducts((prev) =>
        existingId && prev.some((p) => p.id === existingId)
          ? prev.map((p) => (p.id === existingId ? product : p))
          : [product, ...prev],
      );
      setDraft({ ...product });
      return product;
    },
    [draft],
  );

  const setStatus = useCallback((id: string, status: ProductStatus) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  }, []);

  const updateProduct = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  const value = useMemo(
    () => ({
      products,
      draft,
      language,
      artisanName,
      setLanguage,
      setArtisan,
      startDraft,
      updateDraft,
      clearDraft,
      saveDraft,
      setStatus,
      getProduct,
      updateProduct,
    }),
    [
      products,
      draft,
      language,
      artisanName,
      startDraft,
      updateDraft,
      clearDraft,
      saveDraft,
      setStatus,
      getProduct,
      updateProduct,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useKarigar() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useKarigar must be used inside KarigarProvider");
  return ctx;
}
