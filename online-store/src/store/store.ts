import {
  configureStore,
  createAction,
  createReducer,
  createSelector,
  Selector,
} from '@reduxjs/toolkit';
import { Product } from '../types';
// ...

export type RootState = {
  products: Product[];
  filters: unknown;
};
const initialState: RootState = {
  products: [],
  filters: null,
};
export const loadInitialProductsData = createAction<Product[]>('products/loadInitialProductsData');
const productsReducer = createReducer(initialState, (builder) => {
  builder.addCase(loadInitialProductsData, (state, action) => {
    state.products = [...action.payload];
  });
});

export const selectProducts: Selector<RootState, Product[]> = createSelector(
  [(st) => st.products],
  (p) => p
);
export const store = configureStore({ reducer: productsReducer });

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
