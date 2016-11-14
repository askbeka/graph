import {AppContainer} from 'react-hot-loader';
import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import Root from './container/Root';
import createStore from './store/createStore';
import createRoutes from './routes';

// ========================================================
// Store Instantiation
// ========================================================

const initialState = window.__INITIAL_STATE_;
const store = createStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

const rootEl = document.getElementById('root');

const renderApp = () => {
    const routes = require('./routes').default(store);
    render(
        <AppContainer>
            <Root {...{store, history, routes}}/>
        </AppContainer>,
        rootEl
    );
};

// This code is excluded from production bundle
if (__DEV__) {

    // =======================
    // Developer Tools Setup
    // ========================================================
    // if (window.devToolsExtension) {
    //     window.devToolsExtension.open();
    // }

    // Hot reload
    if (module.hot) {
        module.hot.accept('./routes/index.js', () => {
            renderApp();
        });
    }
}

renderApp();
