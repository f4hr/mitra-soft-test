import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Nav, Tab, Placeholder, Ratio, Spinner } from 'react-bootstrap';

import { CategoryPT, ImageItemPT } from './propTypes';
import { loadingStates } from '../../api';
import ImagesList from './ImagesList';

function TabsWrapper({ tabButtons, tabs }) {
  return (
    <>
      <Row>
        <Nav variant="tabs">{tabButtons}</Nav>
      </Row>
      <Row className="pt-3">
        <Tab.Content>{tabs}</Tab.Content>
      </Row>
    </>
  );
}

function TabsPlaceholder() {
  const tabButtons = (
    <>
      <Nav.Item>
        <Placeholder as={Nav.Link} animation="wave" eventKey={1}>
          <Placeholder bg="secondary" style={{ width: '5em' }} />
        </Placeholder>
      </Nav.Item>
      <Nav.Item>
        <Placeholder as={Nav.Link} animation="wave" disabled>
          <Placeholder bg="light" style={{ width: '5em' }} />
        </Placeholder>
      </Nav.Item>
    </>
  );
  const tabs = (
    <Tab.Pane eventKey={1}>
      <Row xs={1} sm={2} md={3} className="g-3">
        {[1, 2, 3, 4, 5, 6].map((itemId) => (
          <Col key={itemId}>
            <Ratio className="bg-light" aspectRatio="1x1">
              <span
                className="position-absolute top-50 start-50 translate-middle"
                style={{ width: '2rem', height: '2rem' }}
              >
                <Spinner variant="secondary" animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </span>
            </Ratio>
          </Col>
        ))}
      </Row>
    </Tab.Pane>
  );

  return <TabsWrapper tabButtons={tabButtons} tabs={tabs} />;
}

function TabsContent({ itemsByCategory }) {
  const tabButtons = (
    <>
      {itemsByCategory.map(({ category: { id, title } }) => (
        <Nav.Item key={id}>
          <Nav.Link href={`/category-${id}`} eventKey={id}>
            {title}
          </Nav.Link>
        </Nav.Item>
      ))}
    </>
  );
  const tabs = (
    <>
      {itemsByCategory.map(({ category: { id }, items }) => (
        <Tab.Pane key={id} eventKey={id}>
          <ImagesList items={items} />
        </Tab.Pane>
      ))}
    </>
  );

  return <TabsWrapper tabButtons={tabButtons} tabs={tabs} />;
}

function Tabs({ itemsByCategory, handleSetCategory, currentCategory, status }) {
  if (status === loadingStates.failed) {
    return <p className="text-center">Не удалось загрузить изображения</p>;
  }
  if (status === loadingStates.loading) {
    return (
      <Tab.Container id="categories-placeholder" defaultActiveKey={1}>
        <TabsPlaceholder />
      </Tab.Container>
    );
  }

  const handleSelect = (key, e) => {
    e.preventDefault();
    handleSetCategory(key);
  };

  return (
    <Tab.Container id="categories" defaultActiveKey={currentCategory} onSelect={handleSelect}>
      <TabsContent itemsByCategory={itemsByCategory} />
    </Tab.Container>
  );
}

const itemsByCategoryProps = PropTypes.arrayOf(
  PropTypes.exact({
    category: CategoryPT,
    items: PropTypes.arrayOf(ImageItemPT),
  })
);

TabsWrapper.propTypes = {
  tabButtons: PropTypes.node.isRequired,
  tabs: PropTypes.node.isRequired,
};
TabsContent.propTypes = {
  itemsByCategory: itemsByCategoryProps.isRequired,
};
Tabs.propTypes = {
  itemsByCategory: itemsByCategoryProps.isRequired,
  handleSetCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default Tabs;
