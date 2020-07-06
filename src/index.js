import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './index.css';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import addUserForm from './addUserForm';
import login from './login';
import homescreen from './homescreen';
import Homescreen2 from "./Homescreen2";
import Navigation from './Navigation';
import Competency from './competency';
import Users from './users';
import Locations from './locations';
import FacultyStaff from './facultyAndStaff';
import allCompetencies from './allCompetencies';
import locationDetails from './locationDetails';
import competencyDetails from './competencyDetails';
import Sidebar from "./Sidebar";
import students from './students';
import studentComp from "./studentComp";
import studentDetails from "./studentDetails";
import classDetails from './classDetails';

import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:5d742d2a-b8bd-4caf-8ce5-1f251f107091',
        region: 'us-east-1',
        userPoolId: 'us-east-1_ukWqeyhM4',
        userPoolWebClientId: '1lr290tbgl9c533rklc7ncgvhg',

        cookieStorage: {
            domain: 'master.d19x1ye7qes4du.amplifyapp.com',
            path: '/',
            expires: 365,
            secure: false
        }
    },

    API: {
        endpoints: [
            {
                name: 'ExcelAPI',
                endpoint: 'https://6z0glw5vac.execute-api.us-east-1.amazonaws.com/Prod'
            }
        ]
    }
})

const authConfig = Auth.configure();
const apiConfig = API.configure();

ReactDOM.render((
    <BrowserRouter>
                <Switch>
                  <Route exact path = "/" component = {login}/>
                  <Route exact path = "/register" component = {addUserForm}/>
                  <Route exact path = "/homescreen" component = {homescreen}/>
                  <Route exact path = "/nav" component = {Navigation}/>
                  <Route exact path = "/competency" component = {Competency}/>
                  <Route exact path = "/users" component = {Users}/>
                  <Route exact path = "/alllocations" component = {Locations}/>
                  <Route exact path = "/allCompetencies" component = {allCompetencies}/>
                  <Route exact path = "/locationDetails" component = {locationDetails} />
                  <Route exact path = "/compDetails" component = {competencyDetails} />
                  <Route exact path = "/students" component={students} />
                  <Route exact path = "/studentComp" component={studentComp} />
                  <Route exact path = "/classDetails" component = {classDetails}/>
                  <Route exact path = "/facultystaff" component = {FacultyStaff} />
                </Switch>

    </BrowserRouter>
    ), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
