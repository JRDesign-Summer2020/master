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



const styles = theme => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
  }
  logo: {
      margin: theme.spacing(1),
      height: '80%',
      width: '80%'
    }
});

class homescreen extends React.Component {
  onClick  = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  }



render() {
  // const { classes } = this.props;
  const { classes } = this.props;
  return (
     <Container component="main" maxWidth="xs">
       <CssBaseline/>
       <div classImportance Level={classes.paper}>
         <img src= { logo } alt="Logo" classImportance Level={classes.logo} />

    //     <Typography component="h1" variant="h5">
    //       Welcome, Admin User!
    //     </Typography>

       </div>
    //   <Box mt={8}>
    //     <Copyright/>
    //   </Box>
    <Container>
      <div className={classes.side}>
        <Sidebar ></Sidebar>
      </div>
    </Container>
  );
}
}


export default withStyles(styles)(homescreen);


