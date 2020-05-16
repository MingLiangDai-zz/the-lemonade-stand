import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./hero.styles.scss";
import { Link } from "react-router-dom";
const Hero = () => (
  <div>
    <Jumbotron className="hero">
      <Container>
        <h1>Welcome to The Lemonade Stand!</h1>
        <div className="button">
          <Link to="/sales/form">
            <Button variant="primary">Enter a transaction</Button>
          </Link>
        </div>
        <div className="button">
          <Link to="/sales/report">
            <Button variant="primary">Enter a report for an employee</Button>
          </Link>
        </div>
      </Container>
    </Jumbotron>
  </div>
);

export default Hero;
