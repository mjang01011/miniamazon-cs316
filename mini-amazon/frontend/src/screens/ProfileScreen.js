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
    return userInfo && (<div className="profile">
        <li>
          <h1>
            Avatar: <img className="product-image" src={userInfo.avatar}></img>
          </h1>
        </li>
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
  </div>)
}

export default ProfileScreen;

