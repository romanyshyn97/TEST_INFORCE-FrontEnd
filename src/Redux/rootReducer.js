import { combineReducers } from "redux";
import shopReducer from './reducer';

const rootReducer = combineReducers({
    shop: shopReducer,

});


export default rootReducer;