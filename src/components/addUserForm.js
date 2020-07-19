import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

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
