import React from 'react';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import logo from '../img/georgia-tech-excel-logo.png';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

import './login.js';
// import { API } from 'aws-amplify';
// import { invokeApig } from '../helpers/utils';

const styles = theme => ({
    logo: {
      width: '504px',
      height: '197px',
    },
    centered: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
});


class homescreen extends React.Component {
    constructor(props) {
        super(props);

        // Auth.currentAuthenticatedUser().then(user => user.signInUserSession.accessToken.payload['cognito:groups'][0])
        // .then(data => console.log(data));

        // invokeApig({
        //     path: ( '/competencies'), 
        //     method: 'GET',
        //     headers: {},
        //     queryParams: {},
        // });

        // let userId = 'test2'
        // invokeApig({
        //     path: ( '/users-to-tracking-location/users/' + userId), 
        //     method: "DELETE",
        //     headers: {},
        //     queryParams: {} ,
        // });

         /**
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
         **/
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
        );
    }
}

export default withStyles(styles)(homescreen);
