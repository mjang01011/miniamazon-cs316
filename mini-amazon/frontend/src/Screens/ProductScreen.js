import React from 'react';
import data from '../data'
import {Link} from 'react-router-dom';


function ProductScreen(props){
    const product = data.products.find(x => x.id === props.match.params.id); //product = find product by id in data
    return <div>
        <div className="back-to-res">
            <Link to="/">Back to Results</Link>
        </div>
        <div className="details">
            <div className="details-image">
                <img src={product.image}></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h3>
                            {product.name}
                        </h3>
                    </li>
                    <li>
                        {product.rating} stars ({product.numRatings} ratings)
                    </li>
                    <li>
                        <b>Price: ${product.price}</b>
                    </li>
                    <li>
                        Description: 
                        <div>
                            {product.description}
                        </div>
                    </li>
                </ul>
            </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: {product.price}
                    </li>
                    <li>
                        Status: {product.status}
                    </li>
                    <li>
                        Quantity: <select>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>

                        </select>
                    </li>
                    <li>
                        <button className="button primary">
                            Add to cart
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        </div>
}
export default ProductScreen; //return what ProductScreen returns