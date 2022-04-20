import { combineReducers } from 'redux';

import ImageReducer from '../features/images/imagesSlice';

const rootReducer = combineReducers({
  images: ImageReducer,
});

export default rootReducer;
