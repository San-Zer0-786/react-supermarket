import React, { useState, useEffect } from 'react';
import "../styles/ProductDetail.scss";
import heart from '../images/heart-regular.svg';
import heartFull from '../images/heart-solid.svg';

import basket from '../images/basket-plus-solid.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishlistActions';
import { addToBasket } from '../redux/actions/basketActions';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import Loader from '../components/Loader';

const ProductDetail = () => {
  const location = useLocation();
  const { id, price, name, salePrice, isBasketItem = false} = location.state || {};
  const product = { id, price, salePrice, name };
  console.warn('productDetail has data: ', product)

  // Retrieve all wishlist items from Redux
  const wishlistItems = useSelector((state) => state.wishlist);

  // Check if the current product is in the wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch('https://products-json-dev.s3.eu-west-1.amazonaws.com/products.json');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();

        // randomly select 5 elements from the data array to emulate related products!
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 4);

        setRelatedProducts(randomProducts);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          // just to show loader effect when app is ready!
          setLoading(false);
        }, 500);
      }
    };
    fetchData();
  }, [location]);

  const dispatch = useDispatch();

  const handleAddToWishlist = () => {
    console.warn(product, 'added to wishlist!')
    dispatch(addToWishlist(product)); // also add sale price and isOnSale later
    toast(`${product.name} added to wishlist!`, { autoClose: 200, hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, 
      className: 'green-toast' 
    });
  };

  const handleRemoveFromWishlist = () => {
    console.warn({ id, name, price }, 'removed from wishlist!')
    dispatch(removeFromWishlist(id)); // also add sale price and isOnSale later
    toast(`${name} removed from wishlist!`, { autoClose: 200, hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, 
      className: 'red-toast' 
    });
  };

  const handleAddToBasket = () => {
    console.warn(product, 'added to basket!')
    dispatch(addToBasket(product)); // also add sale price and isOnSale later
    toast(`${product.name} added to basket!`, { autoClose: 200, hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      className: 'green-toast' // Apply CSS class for custom styling
    });
  };

  return (
    <>
    {loading && <Loader />}
    <div className="product-detail">
      {
        error ? (
          <h2>{error}</h2>
        ) :
        <>
          <div className="product-detail-container">
          <div className="product-detail-image">
            <img src="https://loremflickr.com/320/240" alt='excellent placeholder' />
          </div>
          <div className="product-detail-info">
            <h2>{product.name}</h2>
            <p style={product.salePrice ? {textDecoration: 'line-through'} : {}}>Price: £{product.price}</p>
            {
              salePrice && (
                <p>Sale Price: £{product.salePrice.toFixed(2)}</p>
              )
            }
            {
            !isBasketItem ? (
            <div className="actions-wrapper">

            {
              isInWishlist ? ( 
                <span className="add-btn wishlist" onClick={handleRemoveFromWishlist}><img src={heartFull} alt='Heart Full Icon'/>Remove from Wishlist</span>
              ) : (
                <span className="add-btn wishlist" onClick={handleAddToWishlist}><img src={heart} alt='Heart Icon'/>Add to Wishlist</span>
              )
            }
        
              <span className="add-btn basket" onClick={handleAddToBasket}><img src={basket} alt='Basket Icon'/>Add to Basket</span>
            </div>
            ) : (
              // without above wrapper, there is no margin, so add it here for basket view
              <div className='product-spacer'>
              </div>
            )
          }
          </div>
          </div>    
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}</p>
          </div>

          <div className="product-related">
            <h3>Related Products</h3>
            <ProductList products={relatedProducts} />
          </div> 
      
        </>
      }
    </div>
    </>
  );
};

export default ProductDetail;
