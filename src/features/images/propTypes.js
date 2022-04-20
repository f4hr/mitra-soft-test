import PropTypes from 'prop-types';

export const CategoryPT = PropTypes.exact({
  id: PropTypes.number,
  title: PropTypes.string,
});

export const ImageItemPT = PropTypes.exact({
  id: PropTypes.number,
  albumId: PropTypes.number,
  title: PropTypes.string,
  url: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  resourceUrl: PropTypes.string,
});
