import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {listProducts} from '../actions/productActions';

function HomeScreen(props){
    //defining variables

    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    //calls api to get products
    useEffect(() => {
        //send to store
        dispatch(listProducts());
        return () => {
        };
    }, []
    )
    return loading? <div>Loading...</div> :
    error? <div>{error}</div> :

                    <ul className = "products">
                        {  //allows flexibility in product attributes (can insert data for values)
                            //call var product 
                            //utilize data.js
                            products.map(product => 
                                <li key={product._id}>
                                    <div className = "product">
                                        <Link to={'/product/' + product._id}>
                                            <img className="product-image" src={product.image}></img>
                                        </Link>
                                        
                                        <div className="product-name">
                                            <Link to={'/product/' + product._id}>{product.itemName}</Link>
                                        </div>
                                        <div className="product-category">{product.category}</div>
                                        <div className="product-price">${product.price}</div>
                                        <div className="product-rating">{product.avgRating} stars ({product.reviews.length} ratings)</div>
                                    </div>
                                </li>
                                )
                        }
                        
                    </ul>
    
}
export default HomeScreen; //return what HomeScreen returns