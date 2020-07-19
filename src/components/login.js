import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import color from "@material-ui/core/colors/red";
import logo from '../img/georgia-tech-excel-logo.png';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import { CognitoUser } from 'amazon-cognito-identity-js'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import {AuthenticationDetails} from 'amazon-cognito-identity-js'
import { API } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
import { setCookie } from '../helpers/utils';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'Georgia Institute of Technology'}
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: color.A100,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#AC9A58',
    '&:hover': {
      background: "#335161",
    }
  },

  logo: {
    margin: theme.spacing(1),
    height: '80%',
    width: '80%'
  }
});


class login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
      const target = event.target;

      this.setState({
        [target.name]: target.value
      });
    }

    async handleSubmit(event) {
      event.preventDefault();
      this.signIn(this.state.email, this.state.password);
    }

    // async login(username, password) {
    //   let currentUser = await Auth.currentUserPoolUser();
    //   console.log(currentUser);
    //   const userPool = new CognitoUserPool({
    //     UserPoolId: 'us-east-1_ukWqeyhM4',
    //     ClientId: '1lr290tbgl9c533rklc7ncgvhg'
    //   });
    //   const user = new CognitoUser({ Username: username, Pool: userPool });
    //   const authenticationData = { Username: username, Password: password };
    //   const authenticationDetails = new AuthenticationDetails(authenticationData);

    //   //this.props.history.push('/homescreen');
    //   return new Promise((resolve, reject) =>
    //     user.authenticateUser(authenticationDetails, {
    //       onSuccess: result => resolve(),
    //       onFailure: err => reject(err)
    //     })
    //   );
  //}

    async signIn(username, password) {
      try {
        let user = await Auth.signIn(username, password)
        let authConfig = Auth.configure();

        user.getSession((err, session) => {
          if (err) {
            console.error(err);
            return;
          }

          let providerName = `cognito-idp.${authConfig.region}.amazonaws.com/${authConfig.userPoolId}`;
          let token = session.getIdToken().getJwtToken();

          AWS.config.region = authConfig.region;

          let logins = {};
          logins[providerName] = token;

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: authConfig.identityPoolId,
            Logins: logins
          });

          AWS.config.credentials.get(err => {
            if (err) {
              console.error(err);
              return;
            }

            let d = new Date();
            d.setTime(d.getTime() + (1 * 60 * 60 * 1000));
            let extime = d.getTime();

            setCookie('accesskey', AWS.config.credentials.accessKeyId, extime);
            setCookie('secretkey', AWS.config.credentials.secretAccessKey, extime);
            setCookie('sessiontoken', AWS.config.credentials.sessionToken, extime);

            // creds.get(function(){
            //   // Credentials will be available when this function is called.
            //   var accessKeyId = AWS.config.credentials.accessKeyId;
            //   var secretAccessKey = AWS.config.credentials.secretAccessKey;
            //   var sessionToken = AWS.config.credentials.sessionToken;
            //   //console.log(AWS.config.credentials);
            // });

            //creds.getPromise()

            console.log(AWS.config.credentials);

            this.props.history.push('/homescreen');
          });
        });
      } catch (error) {
        console.error('Error signing in:', error);
        document.getElementById('login-form').reset();
      }
    }

    render() {
        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <img src= { logo } alt="Logo" className={classes.logo} />
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={this.handleSubmit} id="login-form">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={this.handleInputChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/register" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            </Container>
        );
    }
}

export default withStyles(styles)(login);
