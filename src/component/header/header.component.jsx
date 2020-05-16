import React from "react";
import { Link } from "react-router-dom";
import "./header.styles.scss";

const Header = () => {
  return (
    <div className="options">
      <Link to="/">Head to Home</Link>
      <Link to="/sales/form">Head to Form</Link>
      <Link to="/sales/report">Head to Report</Link>
    </div>
  );
};
export default Header;
