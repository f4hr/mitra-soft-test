const host = '';
const api = process.env.REACT_APP_API_URL;

// TODO: refactor to use URL
export default {
  homePath: () => '/',
  aboutPath: () => [host, 'about'].join('/'),
  imagesPath: () => [host, 'images'].join('/'),
  imagePath: (id) => [host, 'images', id].join('/'),
  apiBasePath: () => api,
  apiImagesPath: ({ limit = 24 }) => [api, 'photos', `?_limit=${limit}`].join('/'),
  apiImagePath: (id) => [api, 'photos', id].join('/'),
};
