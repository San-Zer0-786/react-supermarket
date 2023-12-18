import React from 'react';
import { render, fireEvent  } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Product from '../components/Product'; 

// Create a mock Redux store
const mockStore = configureStore([]);
const initialState = {
  // start with empty lists to emulate a running app and prevent bugs as these are checked on UI e.g. when using .some
  wishlist: [], 
  basket: [], 
};
const store = mockStore(initialState);

describe('Product component', () => {
  test('renders product details correctly', () => {
    const { getByText } = render(
      <Router>
        <Provider store={store}>
          <Product id={1} name="Sample Product" price={10} />
        </Provider>
      </Router>
    );

    // test props passed down to Product component
    expect(getByText('Sample Product')).toBeInTheDocument();
    expect(getByText('£10')).toBeInTheDocument();
    })

    test('adds item to wishlist on button click', () => {
        const { getByText } = render(
        <Router>
          <Provider store={store}>
            <Product id={1} name="Sample Product" price={10} />
          </Provider>
        </Router>
        );
    
        const wishlistButton = getByText('Add to Wishlist');
        fireEvent.click(wishlistButton);
     });

      test('adds item to basket on button click', () => {
        const { getByText } = render(
        <Router>
          <Provider store={store}>
            <Product id={1} name="Sample Product" price={10} />
          </Provider>
        </Router>
        );
    
        const basketButton = getByText('Add to Basket');
        fireEvent.click(basketButton);
      });


      // test how product displays whilst in basket; it should not have div with class action-wrapper
      test('product should render in basket differently', () => {
        const { getByText } = render(
        <Router>
          <Provider store={store}>
            <Product id={1} name="Sample Product" price={10} isBasketItem={true} />
          </Provider>
        </Router>
        );

        // remove from basket only shows in basket view
        expect(getByText('Remove from Basket')).toBeInTheDocument();
      });
  });
