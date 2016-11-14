import { applyMiddleware, compose, createStore } from 'redux';
import promise from 'redux-promise';
import persistState from 'redux-localstorage';
import makeRootReducer from './reducers';

export default (initialState = {}) => {
    // ======================================================
    // Middleware Configuration
    // ======================================================
    const middleware = [promise];

    // ======================================================
    // Store Enhancers
    // ======================================================

    const enhancers = [persistState('graph')];

    if (__DEV__) {
        const devToolsExtension = window.devToolsExtension;
        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension())
        }

        if (module.hot) {
            module.hot.accept('./reducers', () => {
                const reducers = require('./reducers').default;
                store.replaceReducer(reducers())
            })
        }
    }

    // ======================================================
    // Store Instantiation and HMR Setup
    // ======================================================
    const store = createStore(
        makeRootReducer(),
        initialState,
        compose(
            applyMiddleware(...middleware),
            ...enhancers
        )
    );

    return store
}
