import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { ImageItemPT } from './propTypes';
import ImageItem from './ImageItem';

function ImagesList({ items }) {
  return (
    <Row xs={1} sm={2} md={3} className="g-3">
      {items.map((item) => (
        <Col key={item.id}>
          <ImageItem imageData={item} />
        </Col>
      ))}
    </Row>
  );
}

ImagesList.propTypes = {
  items: PropTypes.arrayOf(ImageItemPT).isRequired,
};

export default ImagesList;
