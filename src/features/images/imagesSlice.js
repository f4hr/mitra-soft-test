import { takeLatest, put, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';

import { loadingStates, getAlbums } from '../../api';

const ITEMS_IN_CATEGORY_LIMIT = 6;

const actionTypes = {
  getCategories: 'images/getCategories',
  getCategoriesSuccess: 'images/getCategoriesSuccess',
  getCategoriesFail: 'images/getCategoriesFail',
  setCategory: 'image/setCategory',
};

/**
 * Actions
 */
export const getCategories = (params) => ({
  type: actionTypes.getCategories,
  payload: params,
});

const getCategoriesSuccess = (images) => ({
  type: actionTypes.getCategoriesSuccess,
  payload: images,
});

const getCategoriesFail = (error) => ({
  type: actionTypes.getCategoriesFail,
  payload: error,
});

export const setCategory = (categoryId) => ({
  type: actionTypes.setCategory,
  payload: categoryId,
});

const initialState = {
  entities: {
    items: {
      byId: {},
      allIds: [],
    },
    categories: {
      byId: {},
      allIds: [],
    },
  },
  currentCategoryId: 1,
  status: loadingStates.idle,
  error: {
    message: '',
  },
};

/**
 * Reducer
 */
const ImageReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.getCategories:
      return { ...state, status: loadingStates.loading };
    case actionTypes.getCategoriesSuccess: {
      const items = payload.reduce(
        (acc, { photos }) => [...acc, ...photos.slice(0, ITEMS_IN_CATEGORY_LIMIT)],
        []
      );
      const categories = payload.map(({ id, title }) => ({ id, title }));
      const newImagesEntities = items.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
      const newCategoriesEntities = categories.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
      const currentCategoryId = state.currentCategory ?? categories[0].id;

      return {
        ...state,
        status: loadingStates.succeeded,
        currentCategoryId,
        entities: {
          items: {
            byId: newImagesEntities,
            allIds: items.map(({ id }) => id),
          },
          categories: {
            byId: newCategoriesEntities,
            allIds: categories.map(({ id }) => id),
          },
        },
      };
    }
    case actionTypes.getCategoriesFail:
      return {
        ...state,
        status: loadingStates.failed,
        error: { message: payload },
      };
    case actionTypes.setCategory:
      return {
        ...state,
        currentCategoryId: parseInt(payload, 10),
      };
    default:
      return state;
  }
};

/**
 * Selectors
 */
export const selectItems = createSelector(
  (state) => state.images.entities.items.byId,
  (state) => state.images.entities.items.allIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);
export const selectCategories = createSelector(
  (state) => state.images.entities.categories.byId,
  (state) => state.images.entities.categories.allIds,
  (byId, allIds) => allIds.map((id) => byId[id])
);
export const selectCurrentCategoryId = createSelector(
  (state) => state.images.currentCategoryId,
  (state) => state
);
export const selectItemsByCategory = createSelector(
  (state) => state.images.entities.items.byId,
  (state) => state.images.entities.items.allIds,
  (state) => state.images.entities.categories.byId,
  (state) => state.images.entities.categories.allIds,
  (itemsById, itemsAllIds, categoriesById, categoriesAllIds) =>
    categoriesAllIds.map((id) => {
      const filteredItemsIds = itemsAllIds.filter((itemId) => itemsById[itemId].albumId === id);
      const filteredItems = filteredItemsIds.map((itemId) => itemsById[itemId]);
      return {
        category: {
          id,
          title: categoriesById[id].title,
        },
        items: filteredItems,
      };
    })
);
export const selectStatus = createSelector(
  (state) => state.images.status,
  (state) => state
);
export const selectCurrentItem = (state, imageId) =>
  selectItems(state).find(({ id }) => id === imageId);

/**
 * Saga
 */
function* onGetCategories(action) {
  try {
    const response = yield call(getAlbums, action.payload);
    yield put(getCategoriesSuccess(response));
  } catch (error) {
    yield put(getCategoriesFail(error));
  }
}

export function* ImageSaga() {
  yield takeLatest(actionTypes.getCategories, onGetCategories);
}

export default ImageReducer;
