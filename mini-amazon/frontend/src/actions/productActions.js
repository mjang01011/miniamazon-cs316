import axios from "axios";

const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } = require("../constants/productConstants")

//make function called listproduct
const listProducts = () => async (dispatch) => {
    try{
    //call api
    dispatch({type: PRODUCT_LIST_REQUEST});
    //send ajax request to server
    const {data} = await axios.get("/api/products");
    //get data from server
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
    }
}
export {listProducts}