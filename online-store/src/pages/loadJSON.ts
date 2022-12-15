export const loadJSON = async function (): Promise<void> {
    const pathToJSON = './assets/json/products.json'
    const response = await fetch(pathToJSON);
    console.log(response)
    const products: unknown = await response.json();
    console.log(products);
}