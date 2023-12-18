import wishlistReducer from '../redux/reducers/wishlistReducer';
import basketReducer from '../redux/reducers/basketReducer';
import { addToWishlist, removeFromWishlist } from '../redux/actions/wishlistActions';
import { addToBasket, removeFromBasket } from '../redux/actions/basketActions';

describe('Redux Actions and Reducers test', () => {
  describe('Wishlist Actions and Reducer', () => {
    test('should add item to wishlist', () => {
      const product = { id: 1, name: 'Sample Product', price: 10 };
      const action = addToWishlist(product);
      const state = wishlistReducer([], action);
      expect(state).toEqual([product]);
    });

    test('should remove item from wishlist', () => {
      const initialState = [{ id: 1, name: 'Sample Product', price: 10 }];
      const action = removeFromWishlist(1);
      const state = wishlistReducer(initialState, action);
      expect(state).toEqual([]);
    });
  });

  describe('Basket Actions and Reducer', () => {
    test('should add item to basket', () => {
      const product = { id: 1, name: 'Sample Product', price: 10 };
      const action = addToBasket(product);
      const state = basketReducer([], action);
      expect(state).toEqual([product]);
    });

    test('should remove item from basket', () => {
      const initialState = [{ id: 1, name: 'Sample Product', price: 10 }];
      const action = removeFromBasket(1);
      const state = basketReducer(initialState, action);
      expect(state).toEqual([]);
    });
  });
});
