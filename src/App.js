import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Route, BrowserRouter as Router } from 'react-router-dom';

import TodoList from './containers/TodoList';
import Auth from './containers/Auth';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    backgroundColor: '#503ab7',
  },
  authButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#fff',
  }
}))

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Route exact path="/" component={Auth} />
        <Route exact path="/list" component={TodoList} />
      </Router>
    </div>
  );
}

export default App;
