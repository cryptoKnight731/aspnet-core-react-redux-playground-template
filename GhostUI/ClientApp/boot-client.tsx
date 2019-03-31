import './css/site.scss';
import './config/fa.config';
import './prototype';
import React from 'react';
import { routes } from './routes';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { AppContainer } from 'react-hot-loader';
import { hydrate, render, Renderer } from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, IApplicationState } from './store';
import { ToastContainer, ToastPosition } from 'react-toastify';
import { configureAxiosInterceptors } from './config/axios.config';

// Create browser history to use in the Redux store / Get the application-wide store instance, prepopulating with state from the server where available.
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(history, initialState);

// Execute any base Axios configurations (e.g. request interceptors)
configureAxiosInterceptors();

// This function starts up the React app when it runs in a browser. It sets up the routing configuration and injects the app into a DOM element.
const renderApp = (domRenderer: Renderer = render) => {
    domRenderer(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history} children={routes} />
                <ToastContainer autoClose={3500} draggable={false} newestOnTop={true} position={ToastPosition.TOP_CENTER} />
            </Provider>
        </AppContainer>,
        document.getElementById('app-root')
    );
};

// Execute function above to patch app to dom
// server-side rendered output should use hydrate method - but only in production builds, so check if module.hot does not apply as well
//renderApp((initialState && !module.hot) ? hydrate : render);

// Need to hydrate in dev, since using SSR, so for now just check if initialState exists
renderApp(initialState ? hydrate : render);

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        renderApp();
    });
}
