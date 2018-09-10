import { combineReducers } from 'redux';
import posts from './posts';

let combinedObj = {
    posts
};

const rootReducer = combineReducers(combinedObj);

export default rootReducer;