import axios from "axios";

const { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_SAVE_FAIL} = require("../constants/productConstants")

//make function called listproduct
const listProducts = () => async (dispatch) => {
    try{
    //call api
    dispatch({type: PRODUCT_LIST_REQUEST});
    //send ajax request to server
    const {data} = await axios.get("/api/products");
    console.log(data);
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
            Authorization: 'Bearer ' + userInfo.token, //make sure user token is authorized to do this request, gotten by  getState()
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
       dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data});
       console.log(data);
    } catch (error) {
        dispatch({type:PRODUCT_DETAILS_FAIL, payload: error.message});
    }
}
export {listProducts, saveProduct, detailsProduct}