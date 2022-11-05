import { createReducer } from "@reduxjs/toolkit";

import * as actions from './actions';

const INITIAL_STATE = {
    products: [],
    loading: false,
    error: null,
    currentItem: {},
    selectedFilter: "$",
  };

  const shopReducer = createReducer(INITIAL_STATE, builder => {
    builder
        .addCase(actions.productsFetching, state => {
            state.loading = true;
        })
        .addCase(actions.productsFetched, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        .addCase(actions.productsFetchingError, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(actions.productCreated, (state, action) => {
            state.products.push(action.payload);
        })
        .addCase(actions.productDeleted, (state, action) => {
            state.products = state.products.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(() => {});
  })


  export default shopReducer;