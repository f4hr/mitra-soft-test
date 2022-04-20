import React from 'react';
import PropTypes from 'prop-types';

function PageLayout({ children }) {
  return <main>{children}</main>;
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
