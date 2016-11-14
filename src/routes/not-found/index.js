export default (store) => ({
    path : '*',
    /*  Async getComponent is only invoked when route matches   */
    getComponent (nextState, cb) {
        /*  Webpack - use 'require.ensure' to create a split point
         and embed an async module loader (jsonp) when bundling   */
        require.ensure([], (require) => {

            const NotFound = require('./view/notFound').default;

            /*  Return getComponent   */
            cb(null, NotFound);

            /* Webpack named bundle   */
        }, 'not-found')
    }
});
