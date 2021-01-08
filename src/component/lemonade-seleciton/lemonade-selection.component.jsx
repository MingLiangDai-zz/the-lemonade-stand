import React from "react";
import "./lemonade-selection.styles.scss";
const LemonadeSelection = ({ drink, handleChange }) => {
  const { name, price, imageUrl, quantity } = drink;
  return (
    <div className="lemonade-selection">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span style={{ color: "rgb(52,58,64" }}>{name}</span>
      <div className="quantity" style={{ fontSize: "15px" }}>
        <p className="text-muted">Quantity:</p>
        <div>
          <input
            type="number"
            onChange={(e) => handleChange(e.target.value, drink.name)}
            min="0"
            placeholder="0"
            value={quantity}
          />
        </div>
      </div>
      <div className="price" style={{ fontSize: "15px" }}>
        <p className="text-muted">Price:</p>
        <p>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default LemonadeSelection;
