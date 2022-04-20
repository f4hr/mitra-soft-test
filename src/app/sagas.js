import { all, fork } from 'redux-saga/effects';

import { ImageSaga } from '../features/images/imagesSlice';

export default function* rootSaga() {
  yield all([fork(ImageSaga)]);
}
