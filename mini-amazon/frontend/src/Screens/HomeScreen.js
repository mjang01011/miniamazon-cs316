import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function HomeScreen(props){
    const [products, setProduct] = useState([]);
    useEffect(() => {
        const fetchData = async() => {
            const {data} = await axios.get("api/products");
            setProduct(data);
        }
        fetchData();
        return () => {
        };
    }, []
    )
    return (
                    <ul className = "products">
                        {  //allows flexibility in product attributes (can insert data for values)
                            //call var product 
                            //utilize data.js
                            products.map((product) => 
                                <li key={product.id}>
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