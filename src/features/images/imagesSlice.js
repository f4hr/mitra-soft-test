import { takeLatest, put, call } from 'redux-saga/effects';
import { createSelector } from 'reselect';

import routes from '../../routes';
import { loadingStates, getImages as getPhotos } from '../../api';

const ITEMS_IN_CATEGORY = 6;

const actionTypes = {
  getImages: 'images/getImages',
  getImagesSuccess: 'images/getImagesSuccess',
  getImagesFail: 'images/getImagesFail',
  setCategory: 'image/setCategory',
};

/**
 * Actions
 */
export const getImages = (params) => ({
  type: actionTypes.getImages,
  payload: params,
});

const getImagesSuccess = (images) => ({
  type: actionTypes.getImagesSuccess,
  payload: images,
});

const getImagesFail = (error) => ({
  type: actionTypes.getImagesFail,
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
    case actionTypes.getImages:
      return { ...state, status: loadingStates.loading };
    case actionTypes.getImagesSuccess: {
      let albumId = 1;
      const categories = [{ id: albumId, title: `Category ${albumId}` }];
      const items = payload.map((item, idx) => {
        if (idx > 0 && idx % ITEMS_IN_CATEGORY === 0) {
          albumId += 1;
          categories.push({ id: albumId, title: `Category ${albumId}` });
        }
        return {
          id: item.id,
          albumId,
          title: item.title,
          url: item.url,
          thumbnailUrl: item.thumbnailUrl,
          resourceUrl: routes.imagePath(item.id),
        };
      });
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
    case actionTypes.getImagesFail:
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
function* onGetImages(action) {
  try {
    const response = yield call(getPhotos, action.payload);
    yield put(getImagesSuccess(response));
  } catch (error) {
    yield put(getImagesFail(error));
  }
}

export function* ImageSaga() {
  yield takeLatest(actionTypes.getImages, onGetImages);
}

export default ImageReducer;
