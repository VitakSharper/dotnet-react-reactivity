import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './app/styles.scss';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

const app = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
