import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "./header.styles.scss";

const Header = () => {
  return (
    <div style={{ position: "sticky" }} className="mb-3">
      <Navbar expand="sm" bg="dark" variant="dark">
        <Link to="/">
          <Navbar.Brand>Lemonade Stand Transaction Tracker</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/sales/form" className="nav-link">
              Enter Transactions
            </Link>
            <Link to="/sales/report" className="nav-link">
              See Report
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
