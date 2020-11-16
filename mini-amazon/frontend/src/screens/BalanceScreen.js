import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBalance } from '../actions/userActions';
import {detailsProduct, listSellers} from "../actions/productActions";
import {PRODUCT_REVIEW_SAVE_RESET} from "../constants/productConstants";

function BalanceScreen(props) {
    const [balance, setBalance] = useState(0);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    //const userDetails = useSelector((state) => state.userDetails);
    //const userUpdateBalance = useSelector((state) => state.userUpdateBalance);
    // const { loading, success, error } = userUpdateBalance;
    // const { user } = userDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!userInfo) {
            props.history.push("/signin", "/balance");
            return;
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (balance <= 0) {
            alert("Try Again. Invalid Number.");
        } 
        else {
            dispatch(updateUserBalance(balance));
            props.history.push("/profile");
        }
  };
    return userInfo && <div className="addbalance" >
      <form onSubmit={submitHandler} >
        <li>
          <h1>
            Current Balance: ${userInfo.balance.toFixed(2)}
          </h1>
        </li>
        <li>
          <h1>
            <div>
                How much balance do you want to top up to this account?
            </div>
            $<input id="balance" type="number" placeholder="Enter Amount" min="0.00" step="1.00" onChange={(e) => setBalance(e.target.value)}>
            </input>
          </h1>
        </li>
        <li>
          <h1>
            <button type="submit" className="button secondary full-width">Proceed</button>
          </h1>
        </li>
      </form>
  </div>
}

export default BalanceScreen;

