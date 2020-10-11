import React, { useEffect } from 'react';
import { addToCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id; //get product id
  //get quantity selected from Qty dropdown in frontend--if there is a quantity existing, 
  //get the element to the right of the equal sign (will see qty=x); if not exist, put 1
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1; 
  const dispatch = useDispatch();
//   const removeFromCartHandler = (productId) => {
//     dispatch(removeFromCart(productId));
//   }
  useEffect(() => {
    if (productId) {//if productId exists
      dispatch(addToCart(productId, qty));//dispatch action add to cart
    }
  }, []);//only run command after rendering has been done

//   const checkoutHandler = () => {
//     props.history.push("/signin?redirect=shipping");
//   }

  return <div>cart screen
      dfjalkjdfojad
      dfjaoijfodisjfojsd
      djfaodsjfodsjodsifjodsijf
      dfjadsojfdosijfosdjf
      dfjadfoijsadfojads
      dafjpodasijfpadjf
      adifjadpofjadpofjaoijdsf
      adjfadjfdaojfoidasjfiadjf
      dsjfdsjfosdijfodisjfoisdjfoejwfoewfl
      dafjadsjf;doasijfo;iewjf;oeajf;console.error(dfj;ajdi
      dafjio;adsjfsdifje;ofiae;ofjae;fija;hfe
      adfh;daf
  </div>
}

export default CartScreen;