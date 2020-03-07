import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import login from './login';
import homescreen from './homescreen';
import Navigation from './Navigation';
import Competency from './competency';
import Users from './users';
import Locations from './locations';
import allCompetencies from './allCompetencies';
import locationDetails from './locationDetails';

ReactDOM.render((
    <BrowserRouter>
                <Switch>
                  <Route exact path = "/" component = {login}/>
                  <Route exact path = "/homescreen" component = {homescreen}/>
                  <Route exact path = "/nav" component = {Navigation}/>
                  <Route exact path = "/competency" component = {Competency}/>
                  <Route exact path = "/users" component = {Users}/>
                  <Route exact path = "/alllocations" component = {Locations}/>
                  <Route exact path = "/allCompetencies" component = {allCompetencies}/>
                  <Route exact path = "/locationDetails" component = {locationDetails} />
                </Switch>

    </BrowserRouter>
    ), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
