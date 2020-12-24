import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import "./hero.styles.scss";
import { Link } from "react-router-dom";
import hero from "../../img/hero.svg";
const Hero = () => (
  <Container style={{ maxWidth: "500px" }}>
    <h1 className="text-center text-dark">Welcome to The Lemonade Stand!</h1>
    <Row>
      <Col sm="6" className="d-flex justify-content-center">
        <Link to="/sales/form">
          <Button variant="custom" className="p-2 m-2 w-100 shadow round">
            Enter Transaction
          </Button>
        </Link>
      </Col>
      <Col sm="6" className="d-flex justify-content-center">
        <Link to="/sales/report">
          <Button variant="custom" className="p-2 m-2 w-100 shadow round">
            Generate Report
          </Button>
        </Link>
      </Col>
    </Row>
    <Jumbotron className="shadow round">
      <img src={hero} className="h-100 w-100"></img>
    </Jumbotron>
  </Container>
);

export default Hero;
