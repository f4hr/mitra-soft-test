import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Card, Placeholder, Ratio, Spinner } from 'react-bootstrap';

import { ImageItemPT } from '../images/propTypes';
import { loadingStates } from '../../api';

function ImageWrapper({ image, body, footer }) {
  return (
    <Card className="w-100 mx-auto" style={{ maxWidth: '600px' }}>
      {image}
      <Card.Body>{body}</Card.Body>
      <div className="mx-3 mb-3">
        <div>
          <Table hover size="sm">
            <tbody>{footer}</tbody>
          </Table>
        </div>
      </div>
    </Card>
  );
}

function ImagePlaceholder() {
  const image = (
    <Ratio className="bg-light" aspectRatio="1x1">
      <span
        className="position-absolute top-50 start-50 translate-middle"
        style={{ width: '2rem', height: '2rem' }}
      >
        <Spinner variant="secondary" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </span>
    </Ratio>
  );

  const body = (
    <Placeholder as={Card.Title} animation="wave">
      <Placeholder xs={2} /> <Placeholder xs={5} />
    </Placeholder>
  );

  const footer = (
    <>
      <tr>
        <Placeholder animation="wave" as="td">
          <Placeholder xs={2} />
        </Placeholder>
        <Placeholder animation="wave" as="td">
          <Placeholder xs={2} />
        </Placeholder>
      </tr>
      <tr>
        <Placeholder animation="wave" as="td">
          <Placeholder xs={2} />
        </Placeholder>
        <Placeholder animation="wave" as="td">
          <Placeholder xs={5} />
        </Placeholder>
      </tr>
    </>
  );

  return <ImageWrapper image={image} body={body} footer={footer} />;
}

function ImageWithData({ imageData }) {
  const { id, title, url, thumbnailUrl } = imageData;
  const [status, setStatus] = useState('loading');

  const image = (
    <Card.Img
      className={`opacity-${status === 'loading' ? 0 : 100}`}
      style={{ transition: 'opacity 0.3s ease-in-out' }}
      variant="top"
      srcSet={`${thumbnailUrl} 150w, ${url} 600w`}
      sizes="(max-width: 320px) 150px, 600px"
      src={thumbnailUrl}
      alt={title}
      width="600"
      height="600"
      onLoad={() => setStatus('finished')}
      onError={() => setStatus('finished')}
    />
  );

  const body = (
    <Card.Title>
      <h3>{title}</h3>
    </Card.Title>
  );

  const footer = (
    <>
      <tr>
        <td>ID</td>
        <td>{id}</td>
      </tr>
      <tr>
        <td>URL</td>
        <td>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
        </td>
      </tr>
    </>
  );

  return <ImageWrapper image={image} body={body} footer={footer} />;
}

function Image({ imageData, status }) {
  if (status === loadingStates.failed) {
    return <p className="text-center">Не удалось загрузить изображение</p>;
  }
  if (status === loadingStates.loading || !imageData) {
    return <ImagePlaceholder />;
  }

  return <ImageWithData imageData={imageData} />;
}

ImageWrapper.propTypes = {
  image: PropTypes.node.isRequired,
  body: PropTypes.node.isRequired,
  footer: PropTypes.node.isRequired,
};
ImageWithData.propTypes = {
  imageData: ImageItemPT.isRequired,
};
Image.propTypes = {
  imageData: ImageItemPT,
  status: PropTypes.string.isRequired,
};
Image.defaultProps = {
  imageData: {},
};

export default Image;
