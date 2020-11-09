import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { productDetailsReducer, productListReducer, productReviewSaveReducer, productSaveReducer, sellerDetailsReducer, sellerProductListReducer} from './reducers/productReducers';
import thunk from 'redux-thunk';
import {cartReducer, transactionCreateReducer, transactionListReducer} from './reducers/cartReducers';
import {
    userSigninReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateBalanceReducer
} from './reducers/userReducers';
import Cookie from 'js-cookie';

// const cartItems = Cookie.getJSON("cartItems") || []; //if no cart items, set empty array
const userInfo = Cookie.getJSON("userInfo") || null; //get userInfo from Cookie
const cartItems = [];


//create initial state on the item that comes from the cookie
const initialState = {//default states
cart: { cartItems, shipping: {}, payment: {} },
userSignin: { userInfo },
};

const reducer = combineReducers({
    sellerProductList: sellerProductListReducer,
    productList: productListReducer, 
    productDetails: productDetailsReducer,
    cart: cartReducer,//add cart reducer
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    updateBalance: userUpdateBalanceReducer,
    productSave: productSaveReducer,
    sellerDetails: sellerDetailsReducer,
    productReviewSave: productReviewSaveReducer,
    userDetails: userDetailsReducer,
    transactionCreate: transactionCreateReducer,
    transactionList: transactionListReducer,
})
//check devtools on chrome
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//allows async actions
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;