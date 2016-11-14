import {combineReducers} from 'redux';
import edges from './edges';
import nodes from './nodes';

export const types = {
    UPDATE_DATA: 'UPDATE_DATA'
};

export const graph = (state = {}, action) => {
    return {...state, ...{[action.env]: combineReducers({edges, nodes})(state[action.env], action)}}
};

export default (state = {}, action) => {
    if (action.type === types.UPDATE_DATA) {
        const {sha, graph} = action.payload;
        return {...state, ...{data: {sha, graph}}}
    } else if (action.env) {
        const graph = graph(state, action);
        return {...state.data, graph};
    }

    return state;
}
