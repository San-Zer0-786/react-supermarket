import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist);
  console.warn("wishlist loaded with data: ", wishlistItems);

  return (
    <div>
      <h2>Your Wishlist</h2>
      {Array.isArray(wishlistItems) && wishlistItems.length > 0 ? (
        <ul className="flex_container">
          {wishlistItems.map((product) => (
            <li key={product.id}>
              <Product
                id={product.id}
                name={product.name}
                price={product.price}
                isBasketItem={false} // makes this view different from the basket as users can add items to the basket here
                // add other product details as props if needed when API has more information, etc.
              />
            </li>
          ))}
        </ul>
      ) : (
        <h3>
           <a href="/">
            Your Wishlist is currently empty!{' '}
            Click here to shop for 24/7 Low priced items.
          </a>
        </h3>
      )}
    </div>
  );
};

export default Wishlist;
