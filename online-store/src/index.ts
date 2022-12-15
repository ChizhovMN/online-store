import './assets/styles/normalize.css';
import './assets/styles/header.css';
import './assets/styles/footer.css';
import './pages/main/main.css';
import './global.css';
import { routeOptions, elOrNull } from './pages/types'
import { Shop } from './pages/main/main';
import { items, loadJSON } from './pages/loadJSON';
loadJSON();
const mainPage: elOrNull = document.getElementById('main-page');
const mainLink: elOrNull = document.getElementById('main');
const cartLink: elOrNull = document.getElementById('cart');


const route = function (event: Event): void {
    event = event || window.event;
    event.preventDefault();
    if (event.target instanceof HTMLElement && event.target.getAttribute('href')) {
        const href: string | null = event.target.getAttribute('href');
        if (href !== null) {
            window.history.pushState({}, '', href);
            changeLocation();
        }
    }
}

const routes: routeOptions = {
    404: './pages/404/error.html',
    '/': './pages/main/main.html', // <-- There is main page!
    cart: './pages/cart/cart.html',
    product: './pages/product/product.html'
}

const changeLocation = async function (): Promise<void> {
    let path: string = window.location.hash.replace('#', '');
    if (path.length === 0) {
        path = '/';
    }
    const route: string | undefined = routes[path] || routes['404'];

    if (route && !route.includes('404')) {

        const appendItem: Response = await fetch(route);
        const data = await appendItem.text();
        if (mainPage instanceof Element) {
            mainPage.innerHTML = data;
            const shop = new Shop();
            shop.drawItems(items.products);
        }
    }
}
window.onpopstate = changeLocation;
changeLocation();

cartLink?.addEventListener('click', route);
mainLink?.addEventListener('click', route);

// const shopPage: elOrNull = document.getElementById('shop-page');
// const shopTable = document.createElement('div');
// shopPage?.appendChild(shopTable);
