// types.ts
import { Brand, User } from "../../../../../lib/types";

export type SerializedBrand = Omit<Brand, "maxBudget"> & {
  maxBudget: number | null;
};

export type SerializedBrandUser = User & {
  brand: SerializedBrand | null;
  brands: {
    id: string;
    name: string;
    logo: string | null;
  }[];
};

export const serializeBrand = (brand: Brand | null): SerializedBrand | null => {
  if (!brand) return null;
  return {
    ...brand,
    maxBudget: brand.maxBudget?.toNumber() ?? null,
  };
};
