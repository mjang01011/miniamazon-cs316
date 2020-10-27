import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';


function ProfileScreen(props) {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        props.history.push("/signin");
      }

    return <div className="profile">
        <li>
            <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
        </li>
  </div>
}

export default ProfileScreen;