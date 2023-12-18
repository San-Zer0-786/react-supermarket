import shopIcon from '../images/shop-solid.svg';
import basketIcon from '../images/basket-plus-solid.svg';
import heartFull from '../images/heart-solid.svg';
import personIcon from '../images/user-large-solid.svg';

const menuItems = [
    { text: 'Wishlist', url: '/wishlist', image: heartFull, subtext: 'Items:'},
    { text: 'Find a Store', url: '/#', image: shopIcon},
    { text: 'Account', url: '/#', image: personIcon },
    { text: 'Basket', url: '/basket', image: basketIcon, subtext: 'Items:'},
  ]
  
  export default menuItems;
  