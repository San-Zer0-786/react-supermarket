import React from 'react';
import "../styles/Basket.scss";

const BasketTotals = ({ basketItems }) => {
  const getTotalPrice = () => {
    return basketItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="basket-totals ml-25">
      <h3>Summary:</h3>
      <ul className="totals-list">
        {basketItems.map((product) => (
          <li key={product.id} className="totals-item">
            <span className="item-name">{product.name}</span>
            <span className="item-price">£{product.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <hr />
      <div className="total-container">
        <strong className="total-label">Total:</strong>
        <strong className="total-value">£{getTotalPrice()}</strong>
      </div>
    </div>
  );
};

export default BasketTotals;
