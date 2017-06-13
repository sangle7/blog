import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';

window.onload = () => {
    ReactDOM.render(<Routes/>, document.getElementById('root'));
};
