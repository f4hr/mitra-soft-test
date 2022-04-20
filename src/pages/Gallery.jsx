import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import PageLayout from '../common/PageLayout';
import ImageGallery from '../features/images/Gallery';

function Gallery() {
  useEffect(() => {
    document.title = 'Галерея';
  });

  return (
    <PageLayout>
      <Container className="my-3">
        <ImageGallery />
      </Container>
    </PageLayout>
  );
}

export default Gallery;
