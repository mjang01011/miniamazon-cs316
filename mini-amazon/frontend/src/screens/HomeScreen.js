import React, { useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {listProducts} from '../actions/productActions';

function HomeScreen(props){
    //defining variables
    const [searchKeyword, setSearchKeyword] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const category = props.location.state ? props.location.state : "";
    const productList = useSelector(state => state.productList);
    const {products, loading, error} = productList;
    const dispatch = useDispatch();
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    //calls api to get products
    useEffect(() => {
            if (!userInfo) {
                props.history.push("/signin", "/");
                return;
            }
            //send to store
            dispatch(listProducts(searchKeyword, sortOrder, category));
        }, [sortOrder, category]
    )

    //query handlers
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(searchKeyword, sortOrder));
    };

    const sortHandler = e => {
        setSortOrder(e.target.value);
    };

    return <>
        <ul className="filter">
            <form onSubmit={submitHandler}>
                    <input
                        name="searchKeyword"
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        autoComplete={'off'}
                    />
                    <button type="submit">Search</button>
                    <p></p>
                </form>
                Sort By{' '}
                <select name="sortOrder" onChange={sortHandler}>
                    <option value="aToZ">alphabetical (A-Z)</option>
                    <option value="zToA">alphabetical (Z-A)</option>
                    <option value="rating">rating</option>
                    <option value="category">category</option>
                </select>
        </ul>
        {loading? (<div>Loading...</div>) :
            error? (<div>{error}</div>) :

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
                                        <Link to={'/product/' + product._id}>{product.itemName.slice(0, 70) + (product.itemName.length > 70 ? "..." : "")}</Link>
                                    </div>
                                    <div className="product-category">{product.category}</div>
                                    <div className="product-price">${product.lowestPrice && product.lowestPrice.toFixed(2)}</div>
                                    <div className="product-rating">{product.avgRating.toFixed(2)} stars ({product.reviews.length} ratings)</div>
                                </div>
                            </li>
                        )
                    }

                </ul>}
    </>
}
export default HomeScreen; //return what HomeScreen returns