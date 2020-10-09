import React from 'react';
import data from './data';
import './App.css';

function App() {
  const openSidebar = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeSidebar = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <div className="grid-container"> 
            {/*Banner*/}
            <header className="header">
                <div className="brand">
                    <button onClick={openSidebar}>&#9776;</button> {/*Call openSidebar on button click*/}
                    <a href="index.html"> Mini Amazon</a></div>
                <div className="header-links"> {/*banner links*/}
                    <a href="cart.html">Cart</a>
                    <a href="signin.html"> Sign In</a>
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
                    <ul className = "products">
                        {  //allows flexibility in product attributes (can insert data for values)
                            //call var product 
                            //utilize data.js
                            data.products.map(product => 
                                <li>
                                    <div className = "product">
                                        <img className="product-image" src={product.image}></img>
                                        <div className="product-name">
                                            <a href="product.html">{product.name}</a>
                                        </div>
                                        <div className="product-brand">{product.brand}</div>
                                        <div className="product-price">${product.price}</div>
                                        <div className="product-rating">{product.rating} stars ({product.numRatings} ratings)</div>
                                    </div>
                                </li>
                                )
                        }
                        
                    </ul>
                </div>
            </main>
        </div>
        
  );
}

export default App;
