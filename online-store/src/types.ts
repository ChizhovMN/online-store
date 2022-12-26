export interface Product {
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

export type CartType = {
  id: number;
  count: number;
  cost: number;
};
