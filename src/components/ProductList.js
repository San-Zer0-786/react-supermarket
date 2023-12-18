import React from 'react';
import Product from './Product';

const ProductList = ({ products }) => {
  return (
    <ul className="flex_container">
      {products.map((product) => (
        <li key={product.id} className='product_container'>
          <Product
            id={product.id}
            name={product.name}
            price={product.price}
            // add over product details as props if needed when API has more information etc.
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
