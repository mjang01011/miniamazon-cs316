import {
  ADD_ITEM_CART,
  REMOVE_ITEM_CART,
  TRANSACTION_CREATE_REQUEST,
  TRANSACTION_CREATE_SUCCESS,
  TRANSACTION_CREATE_FAIL,
  TRANSACTION_LIST_SUCCESS, TRANSACTION_LIST_REQUEST, TRANSACTION_LIST_FAIL, TRANSACTION_CREATE_RESET
} from "../constants/cartConstants";


function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {//function acts as state, with default value as empty items
  switch (action.type) {
    case ADD_ITEM_CART:
      const item = action.payload; //get item
      const product = state.cartItems.find(x => x.product === item.product); //search for the product in the state where x.product = item.product [if so, product exists]
      if (product) {//if product exists
        return {
          cartItems://replace product with items in cart
          //if x id matches product id, return item, else return x;
          //if insert product that exists in cart, reprace qty with new qty
            state.cartItems.map(x => x.product === product.product ? item : x)
            
        };
      }
      return { cartItems: [...state.cartItems, item] };//return previous state of cart items and add the items
      
      case REMOVE_ITEM_CART:
        return { cartItems: state.cartItems.filter(x => x.product !== action.payload) };

      default: //default just return state
          return state
  }
}

function transactionCreateReducer(state = {}, action) {
  switch (action.type) {
    case TRANSACTION_CREATE_REQUEST:
      return { loading: true };
    case TRANSACTION_CREATE_SUCCESS:
      return { loading: false, transaction: action.payload, success: true };
    case TRANSACTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TRANSACTION_CREATE_RESET:
      return {};
    default: return state;
  }
}

function transactionListReducer(state = {
  transactions: []
}, action) {
  switch (action.type) {
    case TRANSACTION_LIST_REQUEST:
      return { loading: true };
    case TRANSACTION_LIST_SUCCESS:
      return { loading: false, transactions: action.payload };
    case TRANSACTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { cartReducer, transactionCreateReducer, transactionListReducer }