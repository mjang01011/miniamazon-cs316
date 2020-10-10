import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productConstants";

function productListReducer(state={products:[]}, action){
    switch(action.type){
        //sending request to server to get list of products
        case PRODUCT_LIST_REQUEST: 
            return {loading:true}; //show variable loading true if successful
        case PRODUCT_LIST_SUCCESS:
            //actions are payloads that send data from application to store
            return {loading:false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
}
export {productListReducer}