import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import PageLayout from '../common/PageLayout';
import ImageContainer from '../features/image/ImageContainer';

function Image() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Изображение';
  });

  return (
    <PageLayout>
      <Container className="d-flex flex-column align-items-center my-3">
        <Row className="mb-3">
          <Col>
            <Button type="button" onClick={() => navigate(-1)}>
              Назад
            </Button>
          </Col>
        </Row>
        <Row className="w-100 justify-content-center">
          <Col>
            <ImageContainer />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}

export default Image;
