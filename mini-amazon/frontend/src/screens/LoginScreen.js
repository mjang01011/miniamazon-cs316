import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

function SigninScreen(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');//get pwd
  const userSignin = useSelector(state => state.userSignin); //access from redux store
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect); //if userInfo exists, direct user to homepage [may be subject to change later]
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault(); //dont refresh screen when user signin
    dispatch(signin(email, password)); //dispatch signin action

  } 
//   set up sign in page 
  return <div className="form">
    <form onSubmit={submitHandler} >
      <ul className="form-container">
        <li>
          <h2>Sign-In</h2>
        </li>
        <li>
          {loading && <div>Loading...</div>}
          {error && <div style={{color: "red"}}>Incorrect email and password combination. Please try again.</div>}
        </li>
        <li>
            {/* email box and password box */}
          <label htmlFor="email">
            Email
          </label>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}> 
            {/* event.target.value triggers function */}
          </input>
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}> 
          </input>
        </li>
        <li>
          <button type="submit" className="button primary">Sign In</button>
        </li>
        <li>
          New user?
        </li>
        <li>
          <Link to={redirect === "/" ? "register" : "register?redirect=" + redirect} className="button secondary text-center" >Create your Mini Amazon account</Link>
        </li>
      </ul>
    </form>
  </div>
}
export default SigninScreen;
