import { createAction } from "@reduxjs/toolkit";

import * as actionTypes from './types';

export const productsFetching = createAction(actionTypes.PRODUCTS_FETCHING);
export const productsFetched = createAction(actionTypes.PRODUCTS_FETCHED);
export const productsFetchingError = createAction(actionTypes.PRODUCTS_FETCHING_ERROR);
export const productCreated = createAction(actionTypes.ADD_PRODUCT); 
export const productDeleted = createAction(actionTypes.REMOVE_PRODUCT); 
export const productUPDATE = createAction(actionTypes.UPDATE_PRODUCT); 

export const fetchProducts = (request) => (dispatch) => {
    dispatch(productsFetching());
    request("http://localhost:5000/products")
        .then(data => dispatch(productsFetched(data)))
        .catch(() => dispatch(productsFetchingError()))
}

