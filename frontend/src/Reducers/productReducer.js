import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_LATEST_REQUEST,
    PRODUCT_LATEST_SUCCESS,
    PRODUCT_LATEST_FAIL

 } from '../Constants/ProductConstant'


export const productListReducer = (state = {products:[]}, action) =>{
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}

        case PRODUCT_LIST_SUCCESS:
            return {loading:false, products:action.payload.products, page: action.payload.page, pages: action.payload.pages}

        case PRODUCT_LIST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}

export const productDetailsReducer = (state = {products:{reviews:[]}}, action) =>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state}

        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product:action.payload}

        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}


export const latestProductReducer = (state = {products:[]}, action) =>{
    switch(action.type){
        case PRODUCT_LATEST_REQUEST:
            return {loading:true, products:[]}

        case PRODUCT_LATEST_SUCCESS:
            return {loading:false, products:action.payload }

        case PRODUCT_LATEST_FAIL:
            return {loading:false, error: action.payload}

        default:
            return state
    }
}
