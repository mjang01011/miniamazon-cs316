import React, {useEffect, useState, Component} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct, listSellers } from '../actions/productActions';


function ProductScreen(props){
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails; // extract info from productDetails
    const dispatch = useDispatch(); // dispatch an action

    const sellerDetails = useSelector(state => state.sellerDetails);
    const {products, load, err} = sellerDetails; //extract seller details for item page

    useEffect(() => {
        // runs after the elements are rendered on the screen 
        dispatch(detailsProduct(props.match.params.id)); // matches product based on id
        dispatch(listSellers(props.match.params.id)); // matches seller details based on id
    }, []);


    var divs = []
    function handleList(props){
        for (var sellerIndex in props) {
            var details = props[sellerIndex]; //gets seller info, etc. for each seller of this item
            divs.push(
                <ul key={details.seller._id}>
                   <div>Seller: {details.seller.username}</div>
                   <div>Price: {details.price}</div>
                   <div>Available: {details.quantity}</div>
                </ul>
            )
            console.log(details); 
        }
    }
    handleList(products);
    console.log(divs);
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
    }
    //typecheck to avoid error
    /*if(products === undefined){
        console.log("products is undefined");
    }
    else {
        //console.log(products);
        console.log(products[0]);
        if(products[0] != undefined){
            console.log(products[0].seller.username);
            listItems = products[0];
            console.log(listItems);
        }
    }*/
    /*function Test(props){
        return(
        <ul className = "sellers-list">
            {props.map(x => (
                <li key={x.seller._id}>
                <div>Seller: {x.seller.username}</div>
                <div>Price: {x.price}</div>
                <div>Available: {x.quantity}</div>
            </li>
            ))}
        </ul>);
    }*/

    return <div>
        <div className="back-to-res">
            <Link to="/">Back to Results</Link>
        </div>
        {loading? <div>Loading...</div>:
        error? <div>{error}</div>:
        load? <div> loading </div>:
        err? <div>{err}</div>:
        (
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
                        {product.avgRating} stars ({product.reviews && product.reviews.length} ratings)
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
                    <li>
                        Other Sellers:
                        <div>
                            {/*try to display list of sellers for the same item*/} 
                            {divs}
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
                        Status: {product.inventory>0? "In stock" : "Out of stock" }
                    </li>
                    <li>
                        {/*value that user selects is put in qty var*/}
                        Quantity: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                            {[...Array(product.inventory).keys()].map(x=>
                                <option key={x+1} value={x+1}>{x+1}</option>)}

                        </select>
                    </li>
                    <li>
                        {/* only show add to cart if item in stock*/}
                        {product.inventory>0 && <button onClick={handleAddToCart} className="button primary">
                            Add to cart
                        </button>}
                    </li>
                </ul>
            </div>
        </div>
        )
        }
    </div>
        

}
export default ProductScreen; //return what ProductScreen returns