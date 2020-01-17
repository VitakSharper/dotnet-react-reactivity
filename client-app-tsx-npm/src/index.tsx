import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import './styles.scss';
import App from './app/App';
import ScrollToTop from "./app/components/ScrollToTop.component";
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
