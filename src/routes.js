const host = '';
const api = process.env.REACT_APP_API_URL;

// TODO: refactor to use URL
export default {
  homePath: () => '/',
  aboutPath: () => [host, 'about'].join('/'),
  imagesPath: () => [host, 'images'].join('/'),
  imagePath: (id) => [host, 'images', id].join('/'),
  apiBasePath: () => api,
  apiAlbumsPath: (params) =>
    [api, 'albums', `?${new URLSearchParams(params).toString()}`].join('/'),
  apiPhotoPath: (id) => [api, 'photos', id].join('/'),
};
