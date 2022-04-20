import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'react-bootstrap';
import 'bootstrap/scss/bootstrap.scss';

import './reset.scss';
import routes from '../routes';
import Gallery from '../pages/Gallery';
import Image from '../pages/Image';
import About from '../pages/About';
import Error from '../pages/Error';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path={routes.homePath()}>
            <Route index element={<Gallery />} />
            <Route path={routes.imagesPath()}>
              <Route path=":imageId" element={<Image />} />
            </Route>
            <Route path={routes.aboutPath()} element={<About />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
