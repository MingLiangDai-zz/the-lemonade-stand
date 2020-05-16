import React from "react";
import "./lemonade-selection.styles.scss";
// import { useState } from "react";

const LemonadeSelection = ({ drink, handleChange }) => {
  const { name, price, imageUrl, quantity } = drink;
  return (
    <div className="lemonade-selection">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <label>Quantity:</label>
        <input
          type="number"
          onChange={(e) => handleChange(e.target.value, drink.name)}
          min="0"
          placeholder="0"
          value={quantity}
        />
      </div>
      <span className="price">Price: ${price.toFixed(2)}</span>
    </div>
  );
};

export default LemonadeSelection;
