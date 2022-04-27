import React, { useState } from 'react';
import { Button, Card, Ratio } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import './ImageItem.scss';
import { ImageItemPT } from './propTypes';
import routes from '../../routes';

const imgOverlayClassName = [
  'd-flex',
  'justify-content-center',
  'align-items-center',
  'bg-dark',
  'bg-gradient',
  'bg-opacity-50',
].join(' ');

function ImageItem({ imageData }) {
  const navigate = useNavigate();
  const { id, title, url, thumbnailUrl } = imageData;
  const [status, setStatus] = useState('loading');

  return (
    <Card className="card-w-hover">
      <Ratio aspectRatio="1x1">
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
      </Ratio>
      <Card.ImgOverlay className={imgOverlayClassName}>
        <Button onClick={() => navigate(routes.imagePath(id))} variant="light">
          Подробнее
        </Button>
      </Card.ImgOverlay>
    </Card>
  );
}

ImageItem.propTypes = {
  imageData: ImageItemPT.isRequired,
};

export default ImageItem;
