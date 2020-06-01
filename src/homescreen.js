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

import { API } from 'aws-amplify';
import { authorize } from './utils';

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
      marginLeft: '400px',
      height: '100%',
      width: '100%',
    }
});


class homescreen extends React.Component {
    constructor(props) {
        super(props);
        const requestSettings = {
            response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
            queryStringParameters: {},
        };

        authorize(requestSettings).then(init =>
            API.get('ExcelAPI', '/evaluations', init)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error);
                })
        );
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
            <div className={classes.side}>
                    <Sidebar ></Sidebar>
            </div>
            <div className={classes.logo}>
                    <img src= { logo } alt="Logo" classImportance Level={classes.logo} />
            </div>
            <div className={classes.options}>
                <BarChart
                        width={900}
                        height={300}
                        data={data}
                        margin={{
                        top: 5, right: 0, left: 400, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Competencies" fill="#000080" />
                    </BarChart>
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
