import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productDetailsReducer, productListReducer } from './reducers/productReducers';
import thunk from 'redux-thunk';

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer, 
    productDetails: productDetailsReducer
})
//check devtools on chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//allows async actions
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;