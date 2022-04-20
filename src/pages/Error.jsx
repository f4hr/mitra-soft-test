import React, { useEffect } from 'react';

import PageLayout from '../common/PageLayout';

function Error() {
  useEffect(() => {
    document.title = 'Страница не найдена';
  });

  return (
    <PageLayout>
      <h1>Страница не найдена</h1>
    </PageLayout>
  );
}

export default Error;
