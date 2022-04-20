import React from 'react';
import PropTypes from 'prop-types';

import Navigation from './Navigation';

function PageLayout({ children }) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
    </>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
