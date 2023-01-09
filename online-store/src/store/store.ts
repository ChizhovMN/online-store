import {
  configureStore,
  createAction,
  createReducer,
  createSelector,
  Selector,
} from '@reduxjs/toolkit';
import { products } from '../products';
import { CartEntry, DiscountType, ProductType, RangeMinMax } from '../types';

export const uniqCategory = [...new Set(products.map((item) => item.category))];
export const uniqFormat = [...new Set(products.map((item) => item.format))];
const listOfPrices = [...new Set(products.map((item) => item.price))];
const listOfYears = [...new Set(products.map((item) => item.year))];

export const minMaxPrice: RangeMinMax = [Math.min(...listOfPrices), Math.max(...listOfPrices)];
export const minMaxYear: RangeMinMax = [Math.min(...listOfYears), Math.max(...listOfYears)];
const queryString = window.location.search;
const urlSearchParams = new URLSearchParams(queryString);

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
    year: {
      value: RangeMinMax;
    };
    price: {
      value: RangeMinMax;
    };
    search: string;
  };
  sort: {
    by: 'price' | 'name' | 'none';
    direction: 'asc' | 'desc';
  };
  cart: {
    entries: CartEntry[];
    chunkLength: number;
    page: number;
    promo: string;
    discount: {
      all: DiscountType[];
      current: DiscountType[];
    };
  };
  view: string;
  modal: boolean;
};
const initialState: RootState = {
  products: [],
  filters: {
    genre: {
      allValue: [],
      currentValue: urlSearchParams.get('genre')?.split('↕') || [],
    },
    format: {
      allValue: [],
      currentValue: urlSearchParams.get('format')?.split('↕') || [],
    },
    year: {
      value: [
        Number(urlSearchParams?.get('year')?.split('↕')[0]) || minMaxYear[0],
        Number(urlSearchParams?.get('year')?.split('↕')[1]) || minMaxYear[1],
      ],
    },
    price: {
      value: [
        Number(urlSearchParams?.get('price')?.split('↕')[0]) || minMaxPrice[0],
        Number(urlSearchParams?.get('price')?.split('↕')[1]) || minMaxPrice[1],
      ],
    },
    search: urlSearchParams.get('search') || '',
  },
  sort: {
    by: (urlSearchParams.get('sort')?.split('-')[0] as 'price' | 'name' | 'none') || 'none',
    direction: (urlSearchParams.get('sort')?.split('-')[1] as 'asc' | 'desc') || 'asc',
  },
  cart: {
    entries: [],
    chunkLength: Number(urlSearchParams?.get('limit')) || 5,
    page: Number(urlSearchParams?.get('page')) || 1,
    promo: '',
    discount: {
      all: [
        { discount: 'rs', procent: 10, name: 'Rolling Scopes School' },
        { discount: 'epm', procent: 15, name: 'EPUM' },
      ],
      current: [],
    },
  },
  view: urlSearchParams.get('view') || 'large',
  modal: false,
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
export const resetFilters = createAction<boolean>('product/resetFilters');
export const checkFiltersFormat = createAction<string>('product/checkFiltersFormat');
export const checkFiltersCategory = createAction<string>('product/checkFiltersCategory');
export const checkPriceSlider = createAction<RangeMinMax>('product/checkPriceSlider');
export const checkSliderYear = createAction<RangeMinMax>('product/checkSliderYear');
export const checkSearchField = createAction<string>('product/checkSearchField');
export const chunkItemsLength = createAction<number>('product/chunkItemsLength');
export const checkView = createAction<string>('product/checkView');
export const checkDiscount = createAction<string>('product/checkDiscount');
export const addDiscount = createAction<string>('product/addDiscount');
export const deleteDiscount = createAction<string>('product/deleteDiscount');
export const refreshCart = createAction<boolean>('product/refreshCart');
export const checkModal = createAction<boolean>('product/checkModal');
export const checkCartPage = createAction<number>('product/checkCartPage');

const productsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadInitialProductsData, (state, action) => {
      state.products = Object.fromEntries((action.payload ?? []).map((p) => [p.id, p]));
      state.filters.format.allValue = [...uniqFormat];
      state.filters.genre.allValue = [...uniqCategory];
      if (localStorage.getItem('disco_store_cart')) {
        state.cart.entries = JSON.parse(localStorage.getItem('disco_store_cart') || '{}');
      }
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
      localStorage.setItem('disco_store_cart', JSON.stringify(state.cart.entries));
    })
    .addCase(checkFiltersFormat, (state, action) => {
      const chexboxValue = action.payload;
      checkboxValueChecker(state.filters.format, chexboxValue);
    })
    .addCase(checkFiltersCategory, (state, action) => {
      const chexboxValue = action.payload;
      checkboxValueChecker(state.filters.genre, chexboxValue);
    })
    .addCase(checkPriceSlider, (state, action) => {
      const range = action.payload;
      state.filters.price.value = [Math.min(...range), Math.max(...range)];
    })
    .addCase(checkSliderYear, (state, action) => {
      const range = action.payload;
      state.filters.year.value = [Math.min(...range), Math.max(...range)];
    })
    .addCase(checkSearchField, (state, action) => {
      state.filters.search = action.payload;
    })
    .addCase(chunkItemsLength, (state, action) => {
      state.cart.chunkLength = action.payload;
    })
    .addCase(checkView, (state, action) => {
      state.view = action.payload;
    })
    .addCase(checkDiscount, (state, action) => {
      state.cart.promo = action.payload;
    })
    .addCase(addDiscount, (state, action) => {
      const discount = state.cart.discount.all.find(
        (item) => item.discount === action.payload.toLowerCase()
      );
      if (discount) {
        state.cart.discount.current.push(discount);
      }
    })
    .addCase(deleteDiscount, (state, action) => {
      state.cart.discount.current = state.cart.discount.current.filter(
        (item) => item.discount !== action.payload
      );
    })
    .addCase(refreshCart, (state, action) => {
      if (action.payload) {
        state.cart.entries = [];
      }
    })
    .addCase(checkModal, (state, action) => {
      state.modal = action.payload;
    })
    .addCase(resetFilters, (state, action) => {
      if (action.payload) {
        state.filters.format.currentValue = [];
        state.filters.genre.currentValue = [];
        state.sort.by = 'none';
        state.sort.direction = 'asc';
        state.filters.search = '';
        state.view = 'large';
        state.filters.year.value = minMaxYear;
        state.filters.price.value = minMaxPrice;
      }
    })
    .addCase(checkCartPage, (state, action) => {
      state.cart.page = action.payload;
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
export const selectView = createSelector([(st: RootState) => st.view], (view) => view);
export const selectSort: Selector<RootState, RootState['sort']> = createSelector(
  [(st: RootState) => st.sort],
  (v) => v
);
export const selectCart: Selector<RootState, RootState['cart']> = createSelector(
  [(st: RootState) => st.cart],
  (c) => c
);
export type CartProduct = ProductType & { quantity: CartEntry['count'] };

export const selectCartShopProducts: Selector<RootState, CartProduct[]> = createSelector(
  [selectProducts, selectCart],
  (products, cart) =>
    cart.entries
      .map(({ count: quantity, productId: id }) =>
        id in products ? { ...products[id], quantity } : null
      )
      .filter((x): x is CartProduct => !!x)
);
export const selectCartShopChunks = createSelector(
  [selectCartShopProducts, selectCart],
  (products, cart) =>
    products.reduce((acc: Array<CartProduct[]>, item, index) => {
      const chunkNumber = Math.floor(index / +cart.chunkLength);
      if (!acc[chunkNumber]) {
        acc[chunkNumber] = [];
      }
      acc[chunkNumber].push(item);
      return acc;
    }, [])
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
      } else {
        return [];
      }
    });
    return filterProducts;
  }
);
export const selectRange = createSelector(
  [selectFilterGenreProducts, selectFilter],
  (products, filter) => {
    const priceRange = filter.price.value;
    const yearRange = filter.year.value;
    const filterProducts = products.filter((item) => {
      if (item.price >= priceRange[0] && item.price <= priceRange[1]) {
        if (item.year >= yearRange[0] && item.year <= yearRange[1]) {
          return item;
        }
      }
    });
    return filterProducts;
  }
);
export const selectFieldSearch = createSelector([selectRange, selectFilter], (products, search) => {
  const searchProducts = products.filter(
    (item) =>
      item.group.toLowerCase().includes(search.search.toLowerCase()) ||
      item.album.toLowerCase().includes(search.search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.search.toLowerCase()) ||
      item.format.toLowerCase().includes(search.search.toLowerCase()) ||
      item.price.toString().includes(search.search)
  );
  return searchProducts;
});
export const selectModal: Selector<RootState, RootState['modal']> = createSelector(
  [(st: RootState) => st.modal],
  (modal) => modal
);
export const store = configureStore({ reducer: productsReducer });

export type AppDispatch = typeof store.dispatch;
