import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getImage, loadingStates } from '../../api';
import { selectCurrentItem } from '../images/imagesSlice';
import Image from './Image';

function ImageContainer() {
  const params = useParams();
  const imageId = parseInt(params.imageId, 10);
  const currentImageData = useSelector((state) => selectCurrentItem(state, imageId));
  const [imageData, setImageData] = useState(currentImageData);
  const [status, setStatus] = useState(loadingStates.idle);

  useEffect(() => {
    if (currentImageData) return;
    setStatus(loadingStates.loading);
    (async () => {
      getImage(imageId)
        .then((data) => {
          setImageData(data);
          setStatus(loadingStates.succeeded);
        })
        .catch(() => setStatus(loadingStates.failed));
    })();
  }, [currentImageData, imageId]);

  return <Image imageData={imageData} status={status} />;
}

export default ImageContainer;
