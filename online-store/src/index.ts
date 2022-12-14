import './assets/styles/normalize.css';
import './assets/styles/header.css';
import './assets/styles/footer.css';
import './global.css';
import { routeOptions, elOrNull } from './pages/types'

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
    '404': './pages/404/error.html',
    '/main': './pages/main/main.html',
    '/cart': './pages/cart/cart.html',
    '/product': './pages/product/product.html'
}

const changeLocation = async function (): Promise<void> {
    let path: string = window.location.pathname;
    console.log('path', path);
    if (path === '/') {
        path = '/main';
        window.history.pushState({}, '', path);
    }
    console.log(window.history, window.history.state);
    const route: string | undefined = routes[path] || routes['404'];
    if (route && !route.includes('404')) {
        const appendItem: Response = await fetch(route);
        const data = await appendItem.text();
        console.log(data);
        if (mainPage instanceof Element) {
            mainPage.innerHTML = data;
        }
    }
}
window.onpopstate = changeLocation;
//:TODO FIX ROUTE PROBLEM WITH REFRESH WEB PAGES
// window.route = route;
changeLocation();

cartLink?.addEventListener('click', route);
mainLink?.addEventListener('click', route);

