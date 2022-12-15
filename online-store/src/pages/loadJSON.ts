import { structureJSON } from "./types";

export let items: structureJSON;
export const loadJSON = async function (): Promise<void> {
    const pathToJSON = './assets/json/products.json'
    const response = await fetch(pathToJSON);
    items = await response.json();
}
