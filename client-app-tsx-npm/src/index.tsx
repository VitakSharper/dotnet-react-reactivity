import React from 'react';
import ReactDOM from 'react-dom';
import './app/layout/styles.scss';
import App from './app/layout/App';
import * as serviceWorker from './serviceWorker';

const app = (<App/>);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
