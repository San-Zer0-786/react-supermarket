import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product'; 
import BasketTotals from './BasketTotals'; 

const Basket = () => {
  // Retrieve the basket items from the Redux store
  const basketItems = useSelector((state) => state.basket);
  console.warn("basket loaded with data: ", basketItems);

  return (
    <div>
      <h2>Your Basket</h2>
      {Array.isArray(basketItems) && basketItems.length > 0 ? (
        <div className="flex_container mobile">
          <ul className='flex_col_left'>
            {basketItems.map((product) => (
              <li key={product.id}>
                <Product
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  isBasketItem={true}
                  // add other product details as props if needed when API has more information etc.
                />
              </li>
            ))}
          </ul>
          <div className='flex_col_right'>
            <BasketTotals basketItems={basketItems}/>
          </div>
        </div>
      ) : (
        <h3>
          <a href="/">
            Your Basket is currently empty!{' '}
            Click here to shop for 24/7 Low priced items.
          </a>
        </h3>
      )}
    </div>
  );
};

export default Basket;
