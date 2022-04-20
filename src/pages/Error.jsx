import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import routes from '../routes';
import PageLayout from '../common/PageLayout';

function Error() {
  useEffect(() => {
    document.title = 'Страница не найдена';
  });

  return (
    <PageLayout>
      <Container className="my-3 text-center">
        <h1 className="fs-2">Страница не найдена</h1>
        <Link to={routes.homePath()}>На Главную</Link>
      </Container>
    </PageLayout>
  );
}

export default Error;
