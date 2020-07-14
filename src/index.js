import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';


import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import addUserForm from './components/addUserForm';
import login from './components/login';
import homescreen from './legacy/homescreen';
import Homescreen2 from "./components/Homescreen2";
import Navigation from './legacy/Navigation';
import Competency from './components/competency';
import Users from './components/users';
import Locations from './components/locations';
import FacultyStaff from './components/facultyAndStaff';
import allCompetencies from './components/allCompetencies';
import locationDetails from './components/locationDetails';
import competencyDetails from './components/competencyDetails';
import Sidebar from "./components/Sidebar";
import students from './components/students';
import studentComp from "./components/studentComp";
import studentDetails from "./components/studentDetails";
import classDetails from './components/classDetails';

import Amplify, { Auth, API } from 'aws-amplify';
import awsconfig from './helpers/aws-exports';
Amplify.configure(awsconfig);

Amplify.configure({
    Auth: {
        identityPoolId: 'us-east-1:5d742d2a-b8bd-4caf-8ce5-1f251f107091',
        region: 'us-east-1',
        userPoolId: 'us-east-1_ukWqeyhM4',
        userPoolWebClientId: '1lr290tbgl9c533rklc7ncgvhg',

        cookieStorage: {
            domain: 'zhussin.d19x1ye7qes4du.amplifyapp.com',
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

const flexRow = {
    display: "flex"
};

const LoginContainer = () => (
  <div>
    <Route exact path = "/" component={login} />
  </div>
)

const MainContainer = () => (
    <div style={flexRow}>
        <Sidebar />
        <Route exact path = "/register" component = {addUserForm}/>
        <Route exact path = "/homescreen" component = {Homescreen2}/>
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
    </div>
)

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path = "/" component={login} />
            <Route component={MainContainer} />
        </Switch>
    </BrowserRouter>
    ), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
