import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-widgets/lib/scss/react-widgets.scss';
import './styles.scss';
import App from './app/App';
import ScrollToTop from "./app/components/helpers/ScrollToTop.component";
import * as serviceWorker from './serviceWorker';

import dateFnsLocalizer from 'react-widgets-date-fns';

dateFnsLocalizer();

export const history = createBrowserHistory();

const app = (
    <Router history={history}>
        <ScrollToTop>
            <App/>
        </ScrollToTop>
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
