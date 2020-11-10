import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import { detailsProduct, listSellers, saveProductReview } from '../actions/productActions';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../constants/productConstants';

function ProductScreen(props){
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [qty, setQty] = useState(1);

    // get user info for posting reviews
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails; // extract info from productDetails

    const dispatch = useDispatch(); // dispatch an action

    const sellerDetails = useSelector(state => state.sellerDetails);
    const {products, load, err} = sellerDetails; //extract seller details for item page

    const productReviewSave = useSelector((state) => state.productReviewSave); // reviews
    const { success: productSaveSuccess } = productReviewSave;

    useEffect(() => {
        // runs after the elements are rendered on the screen 
        dispatch(detailsProduct(props.match.params.id)); // matches product based on id
        dispatch(listSellers(props.match.params.id)); // matches seller details based on id
        // submit review
        if (productSaveSuccess) {
            alert('Review submitted successfully.');
            setRating(1);
            setComment('');
            dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
          }
          dispatch(detailsProduct(props.match.params.id));
          return () => {
          };
    }, [productSaveSuccess]);

    // dispatch review
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(product);
        dispatch(
          saveProductReview(props.match.params.id, {
            rating: rating,
            comment: comment,
          })
        );
      };

    //list to hold other listings/sellers of the current product
    let divs = []
    // //added test data; remove later
    // var o = {};
    // o["seller"] = {"username": "reddevil"};
    // o["price"] = 9999;
    // o["quantity"] = 8;
    // o["item"] = "testitemid";
    // divs.push(o);
    //
    // var ob = {};
    // ob["seller"] = {"username": "testuser123"};
    // ob["price"] = 250;
    // ob["quantity"] = 3;
    // ob["item"] = "itemid";
    // divs.push(ob);

    function handleList(props){
        for (var sellerIndex in props) {
            var details = props[sellerIndex]; //gets seller info, etc. for each seller of this item
            var obj = {}; //each seller of this product represented by object
            obj["seller"] = details.seller;
            obj["price"] = details.price;
            obj["quantity"] = details.quantity;
            obj["item"] = details.item;
            divs.push(obj); //add seller object to list
        }
        divs.sort((a, b) => (a.price > b.price) ? 1 : -1) //sort listings by ascending price
    }
    handleList(products);

    //function to handle outputting the list info
    //TODO: make it prettier or make it into components 
    function createComponent(props){
        return props.map( ( {seller, price, quantity} ) => {
            return ([
                <p className="sellers-list" key={seller._id}></p>,
                <div>Seller: {seller.username}</div>,
                <div>Price: ${price}</div>,
                <div>Available: {quantity}</div>,
                <li>
                    {/*Quantity dropdown for the other sellers*/}
                    Quantity: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                        {[...Array(quantity).keys()].map(x=>
                            <option key={x+1} value={x+1}>{x+1}</option>)}

                    </select>
                </li>,
                <li>
                    {/*Add to cart buttons for the other sellers*/}
                    {quantity>0 && <button onClick={() => handleAddToCart(seller._id)} className="button primary">
                        Add to cart
                    </button>}
                </li>,
            ]);
        })
    }
    const handleAddToCart = (seller) => {
        console.log(seller.target);
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty + "&seller=" + seller);
    }

    function handleReview(props){
        // handles undefined products case
        if(props !== undefined && props.reviews !== undefined){
            return props.reviews.map((review) => (
                <li key={review._id}>
                <div><b>Reviewer: {review.authorId.username}</b></div>
                <div>
                    <Rating value={review.rating}></Rating>
                </div>
                <div>{review.createdAt.substring(0, 10)}</div>
                <div>{review.comment}</div>
                </li>
            ));
        }
    }

    return (<div>
        <div className="back-to-res">
            <Link to="/">Back to Results</Link>
        </div>
        {loading? <div>Loading...</div>:
        error? <div>{error}</div>:
        load? <div> loading </div>:
        err? <div>{err}</div>:
            <div className="details">
            <div className="details-image">
                <img src={product.image}></img>
            </div>
            <div className="details-info">
                <ul>
                    <li>
                        <h3>
                            {product.itemName}
                        </h3>
                    </li>
                    <li>
                        {product.avgRating} stars ({product.reviews && product.reviews.length} ratings)
                    </li>
                    <li>
                        <b>Description: </b>
                        <div>
                            {product.description}
                        </div>
                    </li>
                    <li>
                        <b>Sellers:</b>
                        <div>
                            {/*display listings of same item by different sellers*/} 
                            {createComponent(divs)}
                        </div>
                    </li>
                </ul>
            </div>
            {/*<div className="details-action">*/}
            {/*    <ul>*/}
            {/*        <li>*/}
            {/*        <a href="#reviews">*/}
            {/*            <Rating*/}
            {/*            value={product.rating}*/}
            {/*            text={product.numReviews + ' reviews'}*/}
            {/*            />*/}
            {/*        </a>*/}
            {/*        </li>*/}
                    {/*<li>*/}
                    {/*    Price: ${product.price}*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    Status: {product.inventory>0? "In stock" : "Out of stock" }*/}
                    {/*</li>*/}
                    {/*{product.inventory > 0 && <li>*/}
                    {/*    /!*value that user selects is put in qty var*!/*/}
                    {/*    Quantity: <select value={qty} onChange={(e)=>{setQty(e.target.value)}}>*/}
                    {/*        {[...Array(product.inventory).keys()].map(x=>*/}
                    {/*            <option key={x+1} value={x+1}>{x+1}</option>)}*/}

                    {/*    </select>*/}
                    {/*</li>}*/}
                    {/*<li>*/}
                    {/*    /!* only show add to cart if item in stock*!/*/}
                    {/*    {product.inventory>0 && <button onClick={handleAddToCart} className="button primary">*/}
                    {/*        Add to cart*/}
                    {/*    </button>}*/}
                    {/*</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div className="review-action">
                <h2><b>Reviews</b></h2>
                {product.reviews !== undefined && <div>There are {product.reviews.length} reviews for this product.</div>}
                <ul className="review" id="reviews">
                    {handleReview(product)}
                     <li>
                        <h3>Write a customer review for this product:</h3>
                                    {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <ul className="form-container">
                                <li>
                                    <label htmlFor="rating">Product Rating (Stars)</label>
                                    <select
                                    name="rating"
                                    id="rating"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                    >
                                    <option value="1">1 star (Poor)</option>
                                    <option value="2">2 stars (Fair)</option>
                                    <option value="3">3 stars (Good)</option>
                                    <option value="4">4 stars (Very Good)</option>
                                    <option value="5">5 stars (Excellent)</option>
                                    </select>
                                </li>
                                <li>
                                    <label htmlFor="comment">Leave a Comment</label>
                                    <textarea
                                    name="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </li>
                                <li>
                                    <button type="submit" className="button primary">
                                    Submit
                                    </button>
                                </li>
                                </ul>
                            </form>
                            ) : (
                            <div>
                                Please <Link to="/signin">Sign-in</Link> to write a review.
                            </div>
                            )}
                    </li>
                </ul>
            </div>
        </div>
        }
    </div>      
    );
}
export default ProductScreen; //return what ProductScreen returns