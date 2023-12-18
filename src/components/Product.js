import React from 'react';
import "../styles/Product.scss";
import heart from '../images/heart-regular.svg';
import heartFull from '../images/heart-solid.svg';

import basket from '../images/basket-plus-solid.svg';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishlistActions';
import { addToBasket, removeFromBasket } from '../redux/actions/basketActions';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Product = ({ id, name, price, isBasketItem = false}) => {
  // isBasketItem  = false allows component to also be used in basket with some UI changes via boolean
  const basketClass = isBasketItem ? 'basket-item' : '';
  // ensure when rendering again, the emulation of sale products stays consistent
  const saleIndices = [1, 4, 9, 10, 13, 17, 19, 20, 23, 27, 29, 30, 32, 37, 38, 40, 42, 44, 46]; 
  
  const isOnSale = saleIndices.includes(id); // emulate that some products will be on sale, some will not!
  const isOnSaleDiscount = isOnSale ? 0.8 : 1;// emulate discount between 0% and 50% (0.5 = 50%, 1 = 100% or no discount)
  const salePrice = price * isOnSaleDiscount;
  // Retrieve all wishlist items from Redux
  const wishlistItems = useSelector((state) => state.wishlist);

  // Check if the current product is in the wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === id);

  // ensure any new item added to basket has a unique ID for e.g. same products added to basket
  const basketItems = useSelector((state) => state.basket);

  const dispatch = useDispatch();

  const generateUniqueID = () => {
    // Generate a unique ID based on the current timestamp and the length of basketItems
    return `${Date.now()}-${basketItems.length + 1}`;
  };

  const handleAddToWishlist = () => {
    console.warn({ id, name, price }, 'added to wishlist!')
    dispatch(addToWishlist({ id, name, price })); // also add sale price and isOnSale later
    toast(`${name} added to wishlist!`, { autoClose: 200, hideProgressBar: true,
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
    const uniqueID = generateUniqueID();
    const determinedPrice = isOnSale ? salePrice : price 
    const newBasketItem = {
      id: uniqueID,
      name,
      price: determinedPrice,
    };
    console.warn(newBasketItem, 'added to basket!')
    dispatch(addToBasket(newBasketItem)); // also add sale price and isOnSale later
    toast(`${name} added to basket!`, { autoClose: 200, hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, 
      className: 'green-toast' 
    })
  };

  const handleRemoveFromBasket = () => {
    console.warn({ id, name, price }, 'removed from Basket!')
    dispatch(removeFromBasket(id)); // also add sale price and isOnSale later
    toast(`${name} removed from Basket!`, { autoClose: 200, hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, 
      className: 'red-toast' 
    });
  };

  return (
    <div className="product">
        <Link to={`/products/${name.toLowerCase().replace(/\s+/g, '-')}`} state={{ id, name, price, ...(salePrice !== price ? { salePrice } : {}) }}>
          <img src="https://loremflickr.com/320/240" alt='excellent placeholder' />
        </Link>
        {isOnSale && (
                <div className="note on-sale">On sale! {((1 - isOnSaleDiscount) * 100).toFixed(0)}% off!</div>
            )
        }
        <div className={`info ${basketClass}`}>
          <div className="title">
            <Link to={`/products/${name.toLowerCase().replace(/\s+/g, '-')}`} state={{ id, name, price }}>
              {name}
            </Link>
          </div>
            {isOnSale ? (
            <>
                <div className="price sale">£{(price * isOnSaleDiscount).toFixed(2)}</div>
                <div className="price original">£{price.toFixed(2)}</div>
            </>
            ) : (
            <div className="price">£{price.toFixed(2)}</div>
            )}
          </div>
          <div className="actions-wrapper">
           {
            isInWishlist ? ( 
              <span className="add-btn wishlist" onClick={handleRemoveFromWishlist}><img src={heartFull} alt='Heart Full Icon'/>Remove from Wishlist</span>
            ) : (
              <span className="add-btn wishlist" onClick={handleAddToWishlist}><img src={heart} alt='Heart Icon'/>Add to Wishlist</span>
            )
           }
           {
            isBasketItem ? ( 
            <span className="add-btn basket" onClick={handleRemoveFromBasket}><img src={basket} alt='Basket Icon'/>Remove from Basket</span> ) : 
            (
              <span className="add-btn basket" onClick={handleAddToBasket}><img src={basket} alt='Basket Icon'/>Add to Basket</span> 
            )
            }
          </div>
    </div>
  );
};

export default Product;
