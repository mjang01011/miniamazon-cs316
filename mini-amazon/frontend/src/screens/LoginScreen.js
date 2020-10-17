// import React, { useState , Component} from "react";
// import { Link } from "react-router-dom";

// class LoginScreen extends Component{
//     constructor(){
//         super();
//         this.state = {
//             email: "",
//             password: "",
//             errors:{}
//         };
//     } 
//     //set state
//     onChange = e=> {
//         this.setState({[e.target.id]: e.target.value});
//     };
//     onSubmit = e => {
//         e.preventDefault(); //prevents page from loading when submit button is clicked
//         const userData = {
//             email: this.state.email,
//             password: this.state.password
//         };
//         console.log(userData); //console.log as we submit form
//     };
//     render(){
//         const{errors} = this.state;
//         return ( <div className="loginPage">
//         {/*centers the form on the page*/}
//         <div style={{ marginTop: "4rem" , marginLeft: "50rem"}} className="row">
//         <div className="fields">
//             <form noValidate onSubmit={this.onSubmit}>
//             {/*Email Field*/}
//             <label email="emailField"><b>Email</b></label>
//             <div className="email-input">
//                 <input
//                 onChange={this.onChange}
//                 value={this.state.email}
//                 error={errors.email}
//                 id="email"
//                 type="email"
//                 />
//             </div>
//             {/*Password Field*/}
//             <label password="passwordField"><b>Password</b></label>
//             <div className="password-input">
//                 <input
//                     onChange={this.onChange}
//                     value={this.state.password}
//                     error={errors.password}
//                     id="password"
//                     type="password"
//                     />
//             </div>
//             {/*Login Button*/}
//             <div className="loginButton">
//                 <button
//                     style={{
//                         width: "150px",
//                         borderRadius: "3px",
//                         letterSpacing: "1px",
//                         marginTop: "1rem"
//                     }}
//                     type="submit"
//                 >
//                 {/*Text for button*/}
//                 Login</button>
//             </div>
//             <div className="registerOption">
//             <p className="register">
//             Don't have an account? <Link to="/register">Register</Link>
//             </p>
//             </div>
//             </form>
//         </div>
//         </div>
//         </div>
//         );
//     }
// }
// export default LoginScreen;
// /*export default function Login() {
//   //useState hook gets what the user enters in the form and sets new value
//   //setting the new state re-renders the component
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   //check if the input values are non-empty
//   function validateForm() {
//     return email.length > 0 && password.length > 0;
// }*/


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
          {error && <div>{error}</div>}
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
          <button type="submit" className="button primary">Signin</button>
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
