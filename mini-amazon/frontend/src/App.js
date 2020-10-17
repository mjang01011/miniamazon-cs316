import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import './App.css';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/LoginScreen';

function App() {
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
                    <Link to="/signin"> Log In</Link>
                </div>
            </header>
            <aside className="sidebar">
                <h3>Shopping Categories</h3>
                <button className="sidebar-close" onClick={closeSidebar}>x</button> 
                <ul>
                    <li>
                        <a href="index.html">Toys</a>
                    </li>
                    <li>
                        <a href="index.html">Tea</a>
                    </li>
                </ul>
            </aside>
            <main className="main">
                <div className = "content">
                    <Route path="/signin" component={SigninScreen} />
                    <Route path="/product/:id" component={ProductScreen}/> {/*route to product screen when root/products/number -- app.js will render ProductScreen.js*/} 
                    <Route path="/cart/:id?" component={CartScreen}/> {/*id is optional; represents id of item in cart; route to cart */}
                    <Route path="/" exact={true} component={HomeScreen}/> {/*creates a route : default = homescreen*/}
                    {/* <Route exact path="/login.html" component={LoginScreen}/> route to login screen */}
                </div>
            </main>
        </div>
   </BrowserRouter>    
  );
}

export default App;
