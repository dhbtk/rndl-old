import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import 'moment/locale/pt-br';
moment.locale('pt-br');

window.react = React;

import App from '../components/App.jsx';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App/>, document.getElementById('app'));
});
