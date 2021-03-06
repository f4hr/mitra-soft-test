import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getCategories,
  selectCurrentCategoryId,
  selectItemsByCategory,
  selectStatus,
  setCategory,
} from './imagesSlice';
import Tabs from './Tabs';

const LIMIT = 4;

function Gallery() {
  const dispatch = useDispatch();
  const currentCategory = useSelector(selectCurrentCategoryId);
  const itemsByCategory = useSelector(selectItemsByCategory);
  const status = useSelector(selectStatus);
  const itemsCount = useMemo(() => itemsByCategory.length, [itemsByCategory]);

  useEffect(() => {
    if (itemsCount > 0) return;
    dispatch(getCategories({ _limit: LIMIT, _embed: 'photos' }));
  }, [itemsCount, dispatch]);

  const handleSetCategory = (key) => {
    dispatch(setCategory(key));
  };

  return (
    <Tabs
      itemsByCategory={itemsByCategory}
      handleSetCategory={handleSetCategory}
      currentCategory={currentCategory}
      status={status}
    />
  );
}

export default Gallery;
