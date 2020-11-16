import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {logout, getUserBalance} from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


function ProfileScreen(props) {
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const [avatar, setAvatar] = useState('');
    const [uploading, setUploading] = useState(false);
    const userDetails = useSelector((state) => state.userDetails);
    const { user } = userDetails;
    const dispatch = useDispatch();

    //calls api to get balance everytime page is refreshed/rendered
    useEffect(() => {
        if (!userInfo) {
            props.history.push("/signin", "/profile");
            return;
        }
        dispatch(getUserBalance());
        return () => {
            //
        };
    }, []);

    const uploadFileHandler = (e) => {
      const file = e.target.files[0];
      const bodyFormData = new FormData();
      bodyFormData.append('avatar', file);
      setUploading(true);
      axios
        .post('/api/upload/image', bodyFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setAvatar(response.data.fileLink);
          setUploading(false);
        })
        .catch((err) => {
          console.log(err);
          setUploading(false);
        });
    };

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
<<<<<<< HEAD
    return <div className="profile">
      {/*}
        <li>
          <h1>
            Avatar: <img className="product-image" src={userInfo.avatar}></img>
          </h1>
        </li>
        */}
=======
    return userInfo && (<div className="profile">
          <h1 align="center">
            Avatar: <img className="product-image" src={userInfo.avatar}></img>
          </h1>
>>>>>>> 11deed7b8c7da2d421a9ecdf5e2c257e333b5a00
        {/*
        <li>
          <label htmlFor="avatar">Upload Avatar</label>
                <input
                  type="text"
                  name="avatar"
                  value={avatar}
                  id="avatar"
                  onChange={(e) => setAvatar(e.target.value)}
                ></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
        </li>
        */}
          <h1 align="center">
            Full Name: {userInfo.fullName}
          </h1>
          <h1 align="center">
            User Name: {userInfo.username}
          </h1>
          <h1 align="center">
            Email:  {userInfo.email}         
          </h1>
            <h1 align="center">
                Account Balance: ${userInfo.balance.toFixed(2)}
            </h1>
            <div className="profile-buttons">
              <button type="button" onClick={handleBalance} className="button primary full-width" align="center">Add Balance</button>
              <p></p>
              <button type="button" onClick={handleTransaction} className="button primary full-width">Purchase History</button>
              <p></p>
          {userInfo.isSeller &&
              <button type="button" onClick={handleProducts} className="button primary full-width">Add/Edit Products</button>}
              <p></p>
              <button type="button" onClick={handleLogout} className="button primary full-width">Logout</button>
            </div>
  </div>)
}

export default ProfileScreen;

