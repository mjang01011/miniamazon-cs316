import React from 'react';
import data from '../data'
import {Link} from 'react-router-dom';

function HomeScreen(props){
    return (
                    <ul className = "products">
                        {  //allows flexibility in product attributes (can insert data for values)
                            //call var product 
                            //utilize data.js
                            data.products.map(product => 
                                <li>
                                    <div className = "product">
                                        <Link to={'/product/' + product.id}>
                                            <img className="product-image" src={product.image}></img>
                                        </Link>
                                        
                                        <div className="product-name">
                                            <Link to={'/product/' + product.id}>{product.name}</Link>
                                        </div>
                                        <div className="product-brand">{product.brand}</div>
                                        <div className="product-price">${product.price}</div>
                                        <div className="product-rating">{product.rating} stars ({product.numRatings} ratings)</div>
                                    </div>
                                </li>
                                )
                        }
                        
                    </ul>
    )
}
export default HomeScreen; //return what HomeScreen returns