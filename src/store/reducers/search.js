import {combineReducers} from 'redux';

export const types = {
    SEARCH_STRING: 'SEARCH_STRING',
    SEARCH_RESULT: 'SEARCH_RESULT'
};

export const text = (state = '', action) => (
    action.type === types.SEARCH_STRING ? action.payload : state
);

export const result = (state = [], action) => (
    action.type === types.SEARCH_RESULT ? action.payload : state
);

export default combineReducers({text, result});
