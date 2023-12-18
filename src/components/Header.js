import React from 'react';
import '../styles/Header.scss'; 
import logo from '../images/adsa-logo.png'; 
import emailIcon from '../images/envelope-solid.svg'; 
import phoneIcon from '../images/phone-solid.svg'; 

import { useSelector } from 'react-redux';

const Header = ({ menuItems }) => {
  const wishlistItems = useSelector(state => state.wishlist); // Ensure default value if wishlist is null or undefined
  const basketItems = useSelector(state => state.basket); // Ensure default value if wishlist is null or undefined

  console.log(wishlistItems)
  return (
    <header>
      <div className="utility-header section">
        <div className="container utility">
        <div className="contact-details">
          <strong>
              <img src={phoneIcon} alt="Telephone" />
          </strong>{' '}
          <a href="tel:+441212101221">0121 2101 221</a>
          <strong> {' '}
              <img src={emailIcon}  alt="Email" />
          </strong>{' '}
          <a href="mailto:hello@adsa-supermarket.co.uk">hello@adsa-supermarket.co.uk</a>
        </div>
        <div className="contact-details address">
          <strong>Head Office:</strong> Adsa HQ, Hubble Road, Cheltenham GL51 0EX
        </div>
        </div>
      </div>
      <div className="main-header section">
        <div className="container">
          <a className="logo" href="/">
            <img src={logo} alt="Logo" /> 
          </a>
          <nav className="main-menu">
            <ul className="menu">
            {menuItems.map((item, index) => (
        <li key={index} className="menu-item">
          <a href={item.url} className="menu-link">
            {item.image && (
              <img src={item.image} alt={`${item.text}`} className="menu-image" />
            )}
            <div className="menu-text">
              <span className="menu-item-text">{item.text}</span>
              {item.subtext && (
                <span className="menu-item-subtext">{item.subtext}
                   {item.text === "Wishlist" && wishlistItems.length}
                   {item.text === "Basket" && basketItems.length}
                </span>
              )}
            </div>
          </a>
        </li>
      ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
