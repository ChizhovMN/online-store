export interface ProductType {
  id: number;
  group: string;
  album: string;
  year: number;
  price: number;
  format: string;
  category: string;
  trackList: string[];
  thumbnail: string;
  images: string[];
}

export type RangeMinMax = [min: number, max: number];

export type CartEntry = {
  productId: ProductType['id'];
  count: number;
};

export type DiscountType = {
  discount: string;
  name: string;
  procent: number;
};
