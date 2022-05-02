import React from 'react';
import {
  Nav, Navbar, OverlayTrigger, Tooltip, Container, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { FaPlus, FaAlignJustify } from 'react-icons/fa';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <Navbar bg="light">
      <Container fluid>
        <Navbar.Brand>Issue Tracker</Navbar.Brand>
        <Nav className="justify-content-start">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/issues">
            <Nav.Link>Issue List</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/report">
            <Nav.Link>Report</Nav.Link>
          </LinkContainer>
        </Nav>
        <Navbar className="justify-content-end">
          <OverlayTrigger
            placement="left"
            delay={{ show: 1000, hide: 400 }}
            overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
          >
            <div><FaPlus size="1.2em" /></div>
          </OverlayTrigger>
          <NavDropdown
            id="user-dropdown"
            title={<FaAlignJustify size="1.2em" />}
            className="noCaret"
            align="end"
          >
            <NavDropdown.Item>About</NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      </Container>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/elstoc/pro-mern-stack-2-modern">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
      <Footer />
    </div>
  );
}
