import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


function ProfileScreen(props) {
    // const [fullName, setFullName] = useState('');
    // const [username, setUserName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [balance, setBalance] = useState('');
    // const [isSeller, setisSeller] = useState('');
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    const dispatch = useDispatch();
    const handleBalance = () => {
     props.history.push("/balance");
    }
    const handleTransaction = () => {
        props.history.push("/transaction");
    }
    const handleProducts = () => {
      props.history.push("/products");
    }
    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
      }
    return <div className="profile">
        <li>
          <h1>
            Avatar:
          </h1>
        </li>
        <li>
          <h1>
            Full Name: {userInfo.fullName}
          </h1>
        </li>
        <li>
          <h1>
            User Name: {userInfo.username}
          </h1>
        </li>
        <li>
          <h1>
            Password: {userInfo.password}
          </h1>
        </li>
        <li>
          <h1>
            Email:  {userInfo.email}         
          </h1>
        </li>
        <li>
            <h1>
                Balance: ${userInfo.balance.toFixed(2)}
            </h1>
        </li>
        <li>
            <button type="button" onClick={handleBalance} className="button secondary full-width">Add Balance</button>
        </li>
        <li>
            <button type="button" onClick={handleTransaction} className="button secondary full-width">Purchase History</button>
        </li>
        {userInfo.isSeller && <li>
            <button type="button" onClick={handleProducts} className="button secondary full-width">Add/Edit Products</button>
        </li>}
        <li>
            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
        </li>
  </div>
}

export default ProfileScreen;

