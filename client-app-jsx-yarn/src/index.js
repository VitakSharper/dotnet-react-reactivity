import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";

import {Provider} from 'react-redux';

import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./app/redux/store";

import './app/styles.scss';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
