import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import shopReducer from "./reducer";

const stringMiddleware = (store) => (next) => (action) => {
    if(typeof action === 'string'){
        return next({
            type: action
        })
    }
    return next(action)
}

const store = configureStore({
    reducer: shopReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;