import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import graph from './graph';
import search from './search';
import env from './env';
import select from './select';
import status from './status';

export default () => {
    return combineReducers({
        routing: routerReducer,
        graph, search, env, select, status
    })
};
