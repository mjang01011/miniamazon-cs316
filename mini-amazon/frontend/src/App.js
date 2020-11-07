import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import SigninScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import { useSelector } from 'react-redux';
import SellerProductsScreen from './screens/SellerProductsScreen';
import BalanceScreen from './screens/BalanceScreen';
import TransactionScreen from "./screens/TransactionScreen";

function App() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeSidebar = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }

  return (
      
      <BrowserRouter> {/*set up router*/}
    <div className="grid-container"> 
            {/*Banner*/}
            <header className="header">
                <div className="category">
                    <button onClick={openSidebar}>&#9776;</button> {/*Call openSidebar on button click*/}
                    <Link to="/">Mini Amazon</Link> {/*Links back to home on click of brand*/}
                </div>
                <div className="header-links"> {/*banner links*/}
                    {/* <a href="cart.html">Cart</a> */}
                    <Link to="/cart">Cart</Link>
                    {/* <a href="login.html"> Log In</a> */}
                    {/* <Link to="/signin"> Log In</Link> */}
                    {userInfo ? ( //if user info exists, show profile, else show signin
                        <Link to="/profile">{userInfo.name} Profile</Link>
                        ) : (
                    <Link to="/signin">Sign In</Link>
                    )}
                    
                    {/* <Link to="/signin">Sign In</Link> */}
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close" onClick={closeSidebar}>x</button> 
                <ul>
                    <li>
                        <a href="index.html">Food and Beverage</a>
                    </li>
                    <li>
                        <a href="index.html">Apparel</a>
                    </li>
                    <li>
                        <a href="index.html">Appliances</a>
                    </li>
                    <li>
                        <a href="index.html">Sporting Equipment</a>
                    </li>
                    <li>
                        <a href="index.html">Shoes</a>
                    </li>
                    <li>
                        <a href="index.html">Books</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className = "content">
                    <Route path="/products" component={SellerProductsScreen} />  {/*route to products screen*/}
                    <Route path="/signin" component={SigninScreen} /> {/*route to signin screen*/}
                    <Route path="/profile" component={ProfileScreen} />  {/*route to user profile screen*/}
                    <Route path="/balance" component={BalanceScreen} />  {/*route to add balance screen*/}
                    <Route path="/product/:id" component={ProductScreen}/> {/*route to product screen when root/products/number -- app.js will render ProductScreen.js*/} 
                    <Route path="/cart/:id?" component={CartScreen}/> {/*id is optional; represents id of item in cart; route to cart */}
                    <Route path="/" exact={true} component={HomeScreen}/> {/*creates a route : default = homescreen*/}
                    <Route exact path="/register" component={RegisterScreen}/> {/*route to register screen*/}
                    <Route path="/transaction" component={TransactionScreen} />  {/*route to transaction screen*/}
                </div>
            </main>
        </div>
   </BrowserRouter>    
  );
}

export default App;
