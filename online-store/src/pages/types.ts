export type routeOptions = Record<string, string | undefined>;
export type elOrNull = HTMLElement | null;

export interface structureJSON {
    products: Products[];
}
export interface Products {
    id: number;
    group: string;
    album: string;
    year: number;
    price: number;
    category: string;
    trackList: string[];
    thumbnail: string;
    images: string[];
}