import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import color from "@material-ui/core/colors/red";
import Image from 'material-ui-image';
import logo from '../src/img/georgia-tech-excel-logo.png';
import {yellow} from "@material-ui/core/colors";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Redirect } from 'react-router-dom'
import Sidebar from './Sidebar';

const userRoleOptions = [
  'Student (Former)', 'Student (Current)', 'Coach', 'Faculty/Staff'
];

const cohortOptions = [
  '1', '2', '3'
];


class addUserForm extends React.Component {

sayHello = () => {
    alert('Login Successful!');
    this.props.history.push('/homescreen');
    //return (<Redirect to='/homescreen' />);
}

render() {

  return (
    <Container component="main" maxWidth="xs">
    <div>
          <Sidebar ></Sidebar>
    </div>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="UserID"
            label="Username"
            autoComplete="email"
            autoFocus
          />
          <div/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="GTID"
            label="GTID"
            autoFocus
          />
          <div/>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="UserInfo"
            label="Full Name"
            autoFocus
          />
          <div/>
          <FormControl fullWidth='120' /*className={classes.formControl}*/>
            <InputLabel id="role-label">Role</InputLabel>
            <Select>
              <MenuItem>Student (current)</MenuItem>
              <MenuItem>Student (former)</MenuItem>
              <MenuItem>Faculty/Staff</MenuItem>
              <MenuItem>Coach</MenuItem>
            </Select>
          </FormControl>
          <div/>
          <div/>
          <FormControl fullWidth='120' /*className={classes.formControl}*/>
            <InputLabel id="cohortoptions-label">Cohort</InputLabel>
            <Select>

              <MenuItem>1</MenuItem>
              <MenuItem>2</MenuItem>
              <MenuItem>3</MenuItem>
            </Select>
          </FormControl>  
          <div/>
          <div/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={this.sayHello}>
            Add User
          </Button>
        </form>
    </Container>
  );
}
}

export default addUserForm;
