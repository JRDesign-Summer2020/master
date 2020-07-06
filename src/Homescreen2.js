import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from "@material-ui/core/CardMedia";
import Card from '@material-ui/core/Card';
import Copyright from './login.js';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Dashboard from '@material-ui/icons/Dashboard';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import color from "@material-ui/core/colors/red";
import Image from 'material-ui-image';
import logo from '../src/img/georgia-tech-excel-logo.png';
import {yellow} from "@material-ui/core/colors";
import Sidebar from './Sidebar.js';
import HomeIcon from "@material-ui/icons/Home";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import { StepIcon } from '@material-ui/core';
import {BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

import './login.js';
import { API } from 'aws-amplify';
import { invokeApig } from './utils';

const styles = theme => ({
    side: {
      margin: 0,
      padding: 0,
      width: '200px',
      backgroundColor : '#f1f1f1',
      position: 'fixed',
      height: '100%',
    },
    logo: {
      width: '100%',
    },
    centered: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
});


class homescreen extends React.Component {
    constructor(props) {
        super(props);
        invokeApig({
            path: ( '/evaluations'),
            method: "GET",
            headers: {},
            queryParams: {} ,
        }).then(body => {
            console.log(body);
        }).catch(error => {
          console.error(error);
        });

        invokeApig({
            path: ( '/evaluations/nonexistentuser'),
            method: "GET",
            headers: {},
            queryParams: {} ,
        }).then(body => {
            console.log(body);
        }).catch(error => {
          console.error(error);
        });

        invokeApig({
            path: ( '/competencies'),
            method: "GET",
            headers: {},
            queryParams: {} ,
        }).then(body => {
            console.log(body);
        }).catch(error => {
          console.error(error);
        });

        invokeApig({
            // This one doesn't work rn
            path: ( '/competencies/nonexistentuser/nonexistentdomain'),
            method: "GET",
            headers: {},
            queryParams: {} ,
        }).then(body => {
            console.log(body);
        }).catch(error => {
          console.error(error);
        });

      // authorize(requestSettings).then(init =>
        //     API.get('ExcelAPI', '/evaluations', init)
        //         .then(response => {
        //             console.log(response);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         })
        // );
    }

    onClick = (e, item) => {
        window.alert(JSON.stringify(item, null, 2));
    }

    render() {
        const data = [
            {
            name: 'Evaluated', Competencies: 10, amt: 10,
            },
            {
            name: 'Needs evaluation', Competencies: 20, amt: 20,
            }
        ];
        const { classes } = this.props;
        return (
            <Container>
                <div className={classes.centered}>
                    <div className={classes.logo}>
                        <img src= { logo } alt="Logo" />
                    </div>
                    <div className={classes.options}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Competencies" fill="#000080" />
                        </BarChart>
                    </div>
                </div>
            </Container>




            //<Typography component="h1" variant="h5" align = "center">
            //        Welcome Admin!
                //    </Typography>
            //   <Box mt={8}>
            //     <Copyright/>
            //   </Box>
            //<Container>

            //</Container>
        );
    }
}

export default withStyles(styles)(homescreen);
