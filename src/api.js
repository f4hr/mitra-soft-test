import axios from 'axios';

import routes from './routes';

const DELAY = process.env.REACT_APP_API_DELAY;

export const loadingStates = {
  idle: 'idle',
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
};

export function sleep(ms = DELAY) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const client = axios.create({
  baseURL: routes.apiBasePath(),
});

client.interceptors.response.use(async (response) => {
  await sleep();

  return response.data;
});

export const getAlbums = async (params) => {
  const albums = await client.get(routes.apiAlbumsPath(params));

  return albums;
};

export const getImage = async (id) => {
  const imageData = await client.get(routes.apiPhotoPath(id));

  return imageData;
};
