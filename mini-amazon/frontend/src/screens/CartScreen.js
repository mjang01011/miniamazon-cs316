import React, { useEffect } from 'react';
import {addToCart, createTransaction, removeFromCart} from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {TRANSACTION_CREATE_RESET} from "../constants/cartConstants";

function CartScreen(props) {
  const cart = useSelector(state => state.cart);//get cart from redux store
  const { cartItems } = cart; //access cart items from cart
  const productId = props.match.params.id; //get product id
  //get quantity selected from Qty dropdown in frontend--if there is a quantity existing, 
  //get the element to the right of the equal sign (will see qty=x); if not exist, put 1
  const query = props.location.search.split("&");
  const qty = query[0] ? Number(query[0].split("=")[1]) : 1;
  const seller = query[1] ? query[1].split("=")[1] : "";
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => { //called when click on remove from cart button
    dispatch(removeFromCart(productId)); //dispatch action removeFromCart in cartActions.js
  }

  const transactionCreate = useSelector(state => state.transactionCreate);
  const { loading, success, error, transaction } = transactionCreate;

  useEffect(() => {
    if (productId) {//if productId exists
      dispatch(addToCart(productId, seller, qty)); //dispatch action add to cart
    };

    if (success) {
      dispatch({ type: TRANSACTION_CREATE_RESET });
      props.history.push("/transaction");
    }
  }, [success]); //only run command after rendering has been done

  const checkoutHandler = async () => {
    dispatch(createTransaction({
      cartItems: cartItems.map(item => {item["seller"] = "5f885898af49bc1071eea5b4"; return item;}), //for testing
    }));

  };

  return <div className="cart">
  <div className="cart-list">
    <ul className="cart-list-container">
      <li>
        <h3>
          Shopping Cart
        </h3>
        <div>
          Price
        </div>
      </li>
      { //if cart empty
        cartItems.length === 0 ?
          <div>
            Cart is empty

            {/* HAVING TROUBLE GETTING ITEM DATA */}
        </div>
          : //else : show list of items, each item mapped to jsx object
          
          cartItems.map(item =>
            <li>
              <div className="cart-image">
                <img src={item.image} alt="product" /> 
              </div>
              <div className="cart-name">
                <div>
                  <Link to={"/product/" + item.product}>
                    {item.name} 
                  </Link>

                </div>
                <div>
                  Qty: 
                  {/*updates the cart subtotal when quantity is changed*/}
                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, item.seller, e.target.value))}>
                    {[...Array(item.inventory).keys()].map(x =>
                      <option key={x + 1} value={x + 1}>{x + 1}</option> 
                    )}
                  </select>
                  <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                    Delete
                  </button>
                </div>
              </div>
              <div className="cart-price">
                ${item.price.toFixed(2)}
              </div>
            </li>
          )
      }
    </ul>

  </div>
  <div className="cart-action">
      {/* show subtitles */}
    <h3>
      Subtotal ({cartItems.reduce((a, c) => a + Number(c.qty), 0)} items):
       ${(cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2)} {/*default val is 0, calculate cart subtotal; reduce is like map */}
    </h3>
    <button onClick={checkoutHandler}className="button primary full-width" disabled={cartItems.length === 0}> {/*if no item, cannot add to cart */}
      Proceed to Checkout
    </button>

  </div>

</div>
}

export default CartScreen;