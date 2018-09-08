import { combineReducers } from 'redux';
import loading from './loading';

let combinedObj = {
    loading
};

const rootReducer = combineReducers(combinedObj);

export default rootReducer;