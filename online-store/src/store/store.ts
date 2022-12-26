import {
  configureStore,
  createAction,
  createReducer,
  createSelector,
  Selector,
} from '@reduxjs/toolkit';
import { products } from '../products';
import { CartEntry, Product } from '../types';

export type RootState = {
  products: Record<Product['id'], Product>;
  filters: unknown;
  sort: {
    by: 'price' | 'name' | 'none';
    direction: 'asc' | 'desc';
  };
  cart: { entries: CartEntry[] };
};
const initialState: RootState = {
  products: [],
  filters: null,
  sort: {
    by: 'none',
    direction: 'asc',
  },
  cart: { entries: [] },
};

// ACTIONS
export const loadInitialProductsData = createAction<Product[]>('products/loadInitialProductsData');
export const setProductsSortOptions = createAction<RootState['sort']>(
  'products/setProductsSortOptions'
);

export const updateCart = createAction<CartEntry>('product/updateCart');

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadInitialProductsData, (state, action) => {
      state.products = Object.fromEntries((action.payload ?? []).map((p) => [p.id, p]));
    })
    .addCase(setProductsSortOptions, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(updateCart, (state, action) => {
      const { productId, count } = action.payload;
      const entry = state.cart.entries.find((entry) => entry.productId === productId);
      if (!entry) {
        state.cart.entries.push(action.payload);
      } else {
        entry.count += count;
      }

      state.cart.entries = state.cart.entries.filter((p) => p.count > 0);
    });
});

export const selectProducts: Selector<RootState, RootState['products']> = createSelector(
  [(st: RootState) => st.products],
  (p) => p
);

export const selectProductsAsList: Selector<RootState, Product[]> = createSelector(
  [selectProducts],
  (p) => Object.values(p)
);

export const selectSort: Selector<RootState, RootState['sort']> = createSelector(
  [(st: RootState) => st.sort],
  (v) => v
);
export const selectCart: Selector<RootState, RootState['cart']> = createSelector(
  [(st: RootState) => st.cart],
  (c) => c
);

type CartProduct = Product & { quantity: CartEntry['count'] };

export const selectCartShopProducts: Selector<RootState, CartProduct[]> = createSelector(
  [selectProducts, selectCart],
  (products, cart) =>
    cart.entries
      .map(({ count: quantity, productId: id }) =>
        id in products ? { ...products[id], quantity } : null
      )
      .filter((x): x is CartProduct => !!x)
);

export const selectCartTotal = createSelector([selectCartShopProducts], (products) =>
  products.reduce((acc, { quantity, price }) => acc + quantity * price, 0)
);

export const selectSortedProducts: Selector<RootState, Product[]> = createSelector(
  [selectProductsAsList, selectSort],
  (products, sort: RootState['sort']) => {
    const sortFuncToFieldMap: Record<
      RootState['sort']['by'],
      (pA: Product, pB: Product) => number
    > = {
      name: (pA: Product, pB: Product) => pA.group.localeCompare(pB.group),
      price: (pA: Product, pB: Product) => pA.price - pB.price,
      none: (pA: Product, pB: Product) => pA.id - pB.id,
    };
    const sortFunc = sortFuncToFieldMap[sort.by];
    const sortedProducts = sortFunc ? [...products].sort(sortFunc) : products;
    return sort.direction === 'asc' ? sortedProducts : sortedProducts.reverse();
  }
);
export const store = configureStore({ reducer: productsReducer });

export type AppDispatch = typeof store.dispatch;
