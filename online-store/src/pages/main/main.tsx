import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  minMaxPrice,
  minMaxYear,
  selectFieldSearch,
  selectFilter,
  selectSort,
  selectView,
} from '../../store/store';
import '../main/main.css';
import { ShopTable } from './components/shopTable';
import { CheckboxGenre } from './components/sortBox';

const Main = () => {
  const filterProducts = useSelector(selectFieldSearch);
  const filter = useSelector(selectFilter);
  const view = useSelector(selectView);
  const sort = useSelector(selectSort);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    filter.format.currentValue.length > 0
      ? newSearchParams.set('format', filter.format.currentValue.join('↕'))
      : newSearchParams.delete('format');
    filter.genre.currentValue.length > 0
      ? newSearchParams.set('genre', filter.genre.currentValue.join('↕'))
      : newSearchParams.delete('genre');
    sort.by !== 'none'
      ? newSearchParams.set('sort', sort.by + '-' + sort.direction)
      : newSearchParams.delete('sort');
    filter.search.length > 0
      ? newSearchParams.set('search', filter.search)
      : newSearchParams.delete('search');
    filter.year.value[0] !== minMaxYear[0] || filter.year.value[1] !== minMaxYear[1]
      ? newSearchParams.set('year', filter.year.value.join('↕'))
      : newSearchParams.delete('year');
    filter.price.value[0] !== minMaxPrice[0] || filter.price.value[1] !== minMaxPrice[1]
      ? newSearchParams.set('price', filter.price.value.join('↕'))
      : newSearchParams.delete('price');
    newSearchParams.set('view', view);
    setSearchParams(newSearchParams);
  }, [filter, sort, view, searchParams, setSearchParams]);

  return (
    <div className="shop">
      <CheckboxGenre />
      <ShopTable items={filterProducts} />
    </div>
  );
};

export { Main };
