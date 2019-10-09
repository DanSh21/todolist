import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './store/reducers';

import { loadState, saveState } from './Storage';

const localStorage = loadState();
console.log('LOCALSTORAGE', localStorage);

const store = createStore(combineReducers(reducers), localStorage, applyMiddleware(thunk));

store.subscribe(() => {
    console.log(store.getState());
    saveState(store.getState().todo.token);
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
