import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './app/layout/styles.scss';
import App from './app/layout/App';
import ScrollToTop from "./app/layout/ScrollToTop";
import * as serviceWorker from './serviceWorker';

const app = (
    <BrowserRouter>
        <ScrollToTop>
            <App/>
        </ScrollToTop>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
