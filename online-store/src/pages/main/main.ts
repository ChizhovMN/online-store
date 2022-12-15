import { elOrNull, Products } from "../types";
export class Shop {
    drawItems(data: Products[]): void {
        const shopPage: elOrNull = document.getElementById('shop-page');
        const shopTable = document.createElement('div');
        shopTable.classList.add('shop-table');

        data.forEach((element) => {

            const item = document.createElement('div');
            item.classList.add('table-item');
            item.id = String(element.id);

            const img = document.createElement('img');
            img.classList.add('table-image');
            img.src = element.thumbnail;
            item.appendChild(img);

            const description = document.createElement('div');
            description.classList.add('item-description');
            description.textContent = element.group + ' - ' + element.album;
            item.appendChild(description);

            const year = document.createElement('div');
            year.classList.add('item-year');
            year.textContent = String(element.year);
            item.appendChild(year);

            const price = document.createElement('div');
            price.classList.add('item-price');
            price.textContent = '$' + element.price;

            item.appendChild(price);

            shopTable.appendChild(item);
            console.log('true', element.album, element.category)
        });
        shopPage?.appendChild(shopTable);
    }
}
