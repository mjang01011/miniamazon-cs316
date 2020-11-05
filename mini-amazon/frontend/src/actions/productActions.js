import axios from "axios";
import React, {Component} from 'react';
import ReactDOM from 'react-dom'; 

const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL, SELLER_LIST_FAIL, SELLER_LIST_REQUEST, SELLER_LIST_SUCCESS, PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL} = require("../constants/productConstants")

//make function called listProduct
const listProducts = (searchKeyword = "", sortOrder = "") => async (dispatch) => {
    try{
        //call api
        dispatch({type: PRODUCT_LIST_REQUEST});

        //send ajax request to server (with query parameters)
        const {data} = await axios.get("/api/products?searchKeyword=" +
            searchKeyword +
            "&sortOrder=" +
            sortOrder);

        //get data from server
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}

const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
      const {
        userSignin: { userInfo },
      } = getState();
      //if (!product._id) {
        const { data } = await axios.post('/api/products', product, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token, //make sure user token is authorized to do this request, gotten by getState()
          },
        });
        console.log("dispatching create product message");
        dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data }); //if successful authentication, dispatch data
      //} else {
        // const { data } = await axios.put(
        //   '/api/products/' + product._id,
        //   product,
        //   {
        //     headers: {
        //       Authorization: 'Bearer ' + userInfo.token,
        //     },
        //   }
        // );
        // dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
      //}
    } catch (error) {
        console.log(error.message);
      dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
    }
  };

const detailsProduct = (productId) => async (dispatch) => {
    try{
        // send req to server to get current product details
       dispatch({type: PRODUCT_DETAILS_REQUEST,payload: productId});
       // get product data from server
       const {data} = await axios.get("/api/products/" + productId);
       dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload: error.message});
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
      "/api/review/" + productId,
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

export {listProducts, saveProduct, detailsProduct, listSellers, saveProductReview}