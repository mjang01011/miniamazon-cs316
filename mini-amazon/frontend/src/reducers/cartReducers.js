import { ADD_ITEM_CART, REMOVE_ITEM_CART} from "../constants/cartConstants";

function cartReducer(state = { cartItems: [], shipping: {}, payment: {} }, action) {//function acts as state, with default value as empty items
  switch (action.type) {
    case ADD_ITEM_CART:
      const item = action.payload; //get item
      const product = state.cartItems.find(x => x.product === item.product); //search for the product in the state where x.product = item.product [if so, product exists]
      if (product) {//if product exists
        console.log(product);
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

export { cartReducer }