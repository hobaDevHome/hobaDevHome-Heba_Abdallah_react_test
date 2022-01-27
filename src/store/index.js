import { createStore } from 'redux';
import { productsReducer } from './reducer';

const store = createStore(productsReducer);

export default store;
