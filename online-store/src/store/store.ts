import {
  configureStore,
  createAction,
  createReducer,
  createSelector,
  Selector,
} from '@reduxjs/toolkit';
import { Product } from '../types';

export type RootState = {
  products: Product[];
  filters: unknown;
  sort: {
    by: 'price' | 'name' | 'none';
    direction: 'asc' | 'desc';
  };
};
const initialState: RootState = {
  products: [],
  filters: null,
  sort: {
    by: 'none',
    direction: 'asc',
  },
};

// ACTIONS
export const loadInitialProductsData = createAction<Product[]>('products/loadInitialProductsData');
export const setProductsSortOptions = createAction<RootState['sort']>(
  'products/setProductsSortOptions'
);
const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadInitialProductsData, (state, action) => {
      state.products = [...action.payload];
    })
    .addCase(setProductsSortOptions, (state, action) => {
      state.sort = action.payload;
    });
});

export const selectProducts: Selector<RootState, Product[]> = createSelector(
  [(st: RootState) => st.products],
  (p) => p
);

export const selectSort: Selector<RootState, RootState['sort']> = createSelector(
  [(st: RootState) => st.sort],
  (v) => v
);

export const selectSortedProducts: Selector<RootState, Product[]> = createSelector(
  [selectProducts, selectSort],
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
