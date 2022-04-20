import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

import PageLayout from '../common/PageLayout';
import AboutContainer from '../features/about/About';

function About() {
  useEffect(() => {
    document.title = 'Обо мне';
  });

  return (
    <PageLayout>
      <Container className="my-3" style={{ maxWidth: '40rem' }}>
        <AboutContainer />
      </Container>
    </PageLayout>
  );
}

export default About;
