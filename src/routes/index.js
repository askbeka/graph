// We only need to import the modules necessary for initial render
import CoreLayout from '../layout/Core';
import AppRoute from './app';
import notFoundRoute from './not-found';

/*  Note: Instead of using JSX, recommended to use react-router
 PlainRoute objects to build route definitions.   */

export default (store) => ({
    path        : '/',
    component   : CoreLayout,
    childRoutes : [
        AppRoute,
        notFoundRoute(store)
    ]
});
