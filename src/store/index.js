import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware                  from 'redux-thunk';
import createLogger                     from 'redux-logger';

import rootReducer from '../reducers';

export default function configure(initialState) {
    const create = window.devToolsExtension
        ? window.devToolsExtension()(createStore)
        : createStore;

    const middlewares = [ thunkMiddleware ];

    if (process.env.NODE_ENV === 'development') {
        middlewares.push(createLogger());
    }

    const createStoreWithMiddleware = applyMiddleware(...middlewares)(create);

    const store = createStoreWithMiddleware(rootReducer, initialState);

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');

            store.replaceReducer(nextReducer);
        });
    }

    return store;
}
