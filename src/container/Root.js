import React, {PropTypes as type} from 'react';
import {Router} from 'react-router';
import {Provider} from 'react-redux';

const Root = (props) => {

    const {store, history, routes} = props;

    return (
        <Provider store={store}>
            <div style={{height: '100%'}}>
                <Router history={history} children={routes}/>
            </div>
        </Provider>
    );
};

Root.propTypes = {
    store: type.object.isRequired,
    history: type.object.isRequired,
    routes: type.object.isRequired
};

export default Root;
