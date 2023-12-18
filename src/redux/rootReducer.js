import { combineReducers } from 'redux';
import wishlistReducer from './reducers/wishlistReducer';
import basketReducer from './reducers/basketReducer';

const appReducers = combineReducers({
  wishlist: wishlistReducer,
  basket: basketReducer,
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("error loading state: ", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.warn("error saving state: ", err);
    return undefined;
  }
};

const rootReducer = (state = loadState(), action) => {
  const newState = appReducers(state, action);
  saveState(newState);
  return newState;
};

export default rootReducer;
