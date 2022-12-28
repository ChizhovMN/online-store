import {
  configureStore,
  createAction,
  createReducer,
  createSelector,
  Selector,
} from '@reduxjs/toolkit';
import { products } from '../products';
import { CartEntry, ProductType } from '../types';

export const uniqCategory = [...new Set(products.map((item) => item.category))];
export const uniqFormat = [...new Set(products.map((item) => item.format))];

export type RootState = {
  products: Record<ProductType['id'], ProductType>;
  filters: {
    genre: {
      allValue: string[];
      currentValue: string[];
    };
    format: {
      allValue: string[];
      currentValue: string[];
    };
  };
  sort: {
    by: 'price' | 'name' | 'none';
    direction: 'asc' | 'desc';
  };
  cart: { entries: CartEntry[] };
};
const initialState: RootState = {
  products: [],
  filters: {
    genre: {
      allValue: [],
      currentValue: [],
    },
    format: {
      allValue: [],
      currentValue: [],
    },
  },
  sort: {
    by: 'none',
    direction: 'asc',
  },
  cart: { entries: [] },
};

const checkboxValueChecker = (
  objCheckboxValues: {
    allValue: string[];
    currentValue: string[];
  },
  currentValue: string
) => {
  if (objCheckboxValues.allValue.includes(currentValue)) {
    if (objCheckboxValues.currentValue.includes(currentValue)) {
      objCheckboxValues.currentValue = objCheckboxValues.currentValue.filter(
        (value) => value !== currentValue
      );
    } else {
      objCheckboxValues.currentValue.push(currentValue);
    }
  }
  return objCheckboxValues;
};

// ACTIONS
export const loadInitialProductsData = createAction<ProductType[]>(
  'products/loadInitialProductsData'
);
export const setProductsSortOptions = createAction<RootState['sort']>(
  'products/setProductsSortOptions'
);
export const deleteProductFromCart = createAction<number>('product/deleteProductFromCart');
export const updateCart = createAction<CartEntry>('product/updateCart');
export const deleteFilters = createAction<ProductType[]>('product/deleteFilters');
export const checkFiltersFormat = createAction<string>('product/checkFiltersFormat');
export const checkFiltersCategory = createAction<string>('product/checkFiltersCategory');

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadInitialProductsData, (state, action) => {
      state.products = Object.fromEntries((action.payload ?? []).map((p) => [p.id, p]));
      state.filters.format.allValue = [...uniqFormat];
      state.filters.genre.allValue = [...uniqCategory];
    })
    .addCase(setProductsSortOptions, (state, action) => {
      state.sort = action.payload;
    })
    .addCase(deleteProductFromCart, (state, action) => {
      const productId = action.payload;
      state.cart.entries = state.cart.entries.filter((p) => p.productId !== productId);
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
    })
    .addCase(checkFiltersFormat, (state, action) => {
      const chexboxValue = action.payload;
      checkboxValueChecker(state.filters.format, chexboxValue);
    })
    .addCase(checkFiltersCategory, (state, action) => {
      const chexboxValue = action.payload;
      checkboxValueChecker(state.filters.genre, chexboxValue);
    });
});
export const selectProducts: Selector<RootState, RootState['products']> = createSelector(
  [(st: RootState) => st.products],
  (p) => p
);

export const selectProductsAsList: Selector<RootState, ProductType[]> = createSelector(
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
type CartProduct = ProductType & { quantity: CartEntry['count'] };

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

export const selectSortedProducts: Selector<RootState, ProductType[]> = createSelector(
  [selectProductsAsList, selectSort],
  (products, sort: RootState['sort']) => {
    const sortFuncToFieldMap: Record<
      RootState['sort']['by'],
      (pA: ProductType, pB: ProductType) => number
    > = {
      name: (pA: ProductType, pB: ProductType) => pA.group.localeCompare(pB.group),
      price: (pA: ProductType, pB: ProductType) => pA.price - pB.price,
      none: (pA: ProductType, pB: ProductType) => pA.id - pB.id,
    };
    const sortFunc = sortFuncToFieldMap[sort.by];
    const sortedProducts = sortFunc ? [...products].sort(sortFunc) : products;
    return sort.direction === 'asc' ? sortedProducts : sortedProducts.reverse();
  }
);
export const selectFilter: Selector<RootState, RootState['filters']> = createSelector(
  [(st: RootState) => st.filters],
  (f) => f
);
export const selectFilterFormatProducts = createSelector(
  [selectSortedProducts, selectFilter],
  (products, filter) => {
    const format = filter.format.currentValue;
    const filterProducts = products.filter((item) => {
      if (format.length) {
        return format.includes(item.format);
      }
    });
    return filterProducts.length === 0 ? products : filterProducts;
  }
);
export const selectFilterGenreProducts = createSelector(
  [selectFilterFormatProducts, selectFilter],
  (products, filter) => {
    const format = filter.genre.currentValue;
    const filterProducts = products.filter((item) => {
      if (format.length) {
        return format.includes(item.category);
      }
    });
    return filterProducts.length === 0 ? products : filterProducts;
  }
);
export const store = configureStore({ reducer: productsReducer });

export type AppDispatch = typeof store.dispatch;
