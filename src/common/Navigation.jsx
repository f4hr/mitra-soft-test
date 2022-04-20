import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';

import routes from '../routes';
import Avatar from '../assets/images/photo.jpg';
import { ReactComponent as GitHub } from '../assets/images/github.svg';

const USER_NAME = 'Илья Фахрутдинов';
const USER_EMAIL = 'ilyaf4hr@gmail.com';

function Navigation() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
          <a
            href="https://github.com/f4hr/mitra-soft-test"
            target="_blank"
            rel="noreferrer"
            title="GitHub"
          >
            <GitHub />
          </a>
        </Container>
      </Navbar>
      <Offcanvas
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        placement="start"
        show={show}
        onHide={handleClose}
        style={{ maxWidth: '280px' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title id="offcanvasNavbarLabel">Меню</Offcanvas.Title>
        </Offcanvas.Header>
        <hr />
        <Offcanvas.Body>
          <Nav className="flex-column" variant="pills" defaultActiveKey="/home">
            <Nav.Item>
              <NavLink className="nav-link" to={routes.homePath()}>
                Галерея
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink className="nav-link" to={routes.aboutPath()}>
                Обо мне
              </NavLink>
            </Nav.Item>
          </Nav>
        </Offcanvas.Body>
        <hr />
        <div className="d-flex align-items-center p-3">
          <img className="rounded-circle" src={Avatar} alt="" width="64" height="64" />
          <div className="ms-2">
            <p className="mb-1">{USER_NAME}</p>
            <p className="mb-0" style={{ fontSize: '0.875rem' }}>
              <a href={`mailto:${USER_EMAIL}`}>{USER_EMAIL}</a>
            </p>
          </div>
        </div>
      </Offcanvas>
    </>
  );
}

export default Navigation;
