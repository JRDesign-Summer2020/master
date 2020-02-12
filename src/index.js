import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import login from './login';
import homescreen from './homescreen';
import Navigation from './Navigation';

ReactDOM.render((
    <BrowserRouter>
                <Switch>
                    <Route exact path = "/" component = {login}/>  
                    <Route exact path = "/homescreen" component = {homescreen}/>
                    <Route exact path = "/nav" component = {Navigation}/>
                </Switch>
        
    </BrowserRouter>
    ), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
