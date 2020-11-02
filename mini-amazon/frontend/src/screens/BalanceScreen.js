import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBalance } from '../actions/userActions';

function BalanceScreen(props) {
    const [balance, setBalance] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const userUpdateBalance = useSelector((state) => state.userUpdateBalance);
    const { user } = userDetails;
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if (balance <= 0) {
            alert("Try Again");
        } 
        else {
            dispatch(updateUserBalance({ userId: user._id, balance }));
        }
  };
    return <div className="addbalance" >
        <li>
          <h1>
            Current Balance: ${userInfo.balance}
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
            <button type="submit" onSubmit={submitHandler} className="button secondary full-width">Proceed</button>
          </h1>
        </li>
  </div>
}

export default BalanceScreen;

