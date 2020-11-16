import axios from "axios";
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const { SELLER_PRODUCT_LIST_REQUEST, SELLER_PRODUCT_LIST_SUCCESS, SELLER_PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL, SELLER_LIST_FAIL, SELLER_LIST_REQUEST, SELLER_LIST_SUCCESS, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL} = require("../constants/productConstants")

//make function called listProduct : lists all products
const listProducts = (searchKeyword = "", sortOrder = "", category = "") => async (dispatch) => {
    try{
        //call api
        dispatch({type: PRODUCT_LIST_REQUEST});

        //send ajax request to server (with query parameters)
        const {data} = await axios.get("/api/products?searchKeyword=" + searchKeyword +
            "&sortOrder=" + sortOrder +
            "&category=" + category);
        //get data from server
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
  //console.log("in save product");//okay so it does successfully get here
    try {
      //console.log("in save product try");//okay so it does successfully get here
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!product._id) { //ensure we only create new product if it doesn't exist yet (when updating)
        //console.log("in save product: not created product yet");
        //const { data } = await axios.post('/api/products', product, {
        const { data } = await axios.post('/api/products', product, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token, //make sure user token is authorized to do this request, gotten by getState()
          },
        });
        //console.log("dispatching create product message");
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data }); //if successful authentication, dispatch data
      } else {//already have product: edit product
        //console.log("in save product: created product already"); //gets here
        //console.log(product);
        const { data } = await axios.put(
          //'/api/products/' + product._id,
          '/api/sells/' + product._id,
          product,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        //console.log("in save product: before dispatch");//doesn't reach this either
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
        //console.log("in save product: created product already -- hopefully saved product"); //does not get here!!!
      }
    } catch (error) {
        //console.log(error.message);
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };

const detailsProduct = (productId) => async (dispatch) => {
    try{
        // send req to server to get current product details
       dispatch({type: PRODUCT_DETAILS_REQUEST,payload: productId});
       // get product data from server
       const {data} = await axios.get("/api/products/" + productId);
       //console.log(data);
       dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}
//soldByRoute.js
//gets list of seller's products
const listSellerProducts = () => async(dispatch, getState) => {
  try{
    dispatch({type: SELLER_PRODUCT_LIST_REQUEST});
    const { userSignin: { userInfo } } = getState();
    //call server with request for list of sellers that sell item by id
    const {data} = await axios.get("/api/sells/", {headers:
            { Authorization: 'Bearer ' + userInfo.token }
    });
    //console.log(data);

    dispatch({type:SELLER_PRODUCT_LIST_SUCCESS, payload:data})
  }
  catch(error){
    dispatch({type: SELLER_PRODUCT_LIST_FAIL, payload: error.message});
  }
}

//soldByRoute.js
//gets seller list by product id when on product detail page
const listSellers = (productId) => async(dispatch) => {
    try{
      dispatch({type: SELLER_LIST_REQUEST, payload: productId});
      //call server with request for list of sellers that sell item by id
      const {data} = await axios.get("/api/sells/" + productId);

      dispatch({type:SELLER_LIST_SUCCESS, payload:data})
    }
    catch(error){
      dispatch({type: SELLER_LIST_FAIL, payload: error.message});
    }
}

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      //`/api/products/${productId}/reviews`,
      "/api/products/review/" + productId,
      review,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};


export {listProducts, saveProduct, detailsProduct, listSellerProducts, listSellers, saveProductReview}