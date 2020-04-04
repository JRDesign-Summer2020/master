import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
  },
  content: {
    marginLeft: '200px',
    padding: '1px 16px',
    height: '1000px',
    display: 'flex',
    flexDirection: 'row',
  },
  comp_text: {
    marginLeft: '200px',
    padding: '1px 16px',
    height: '1000px',
    display: 'flex',
    flexDirection: 'column',
  },
  column_view: {
    padding: '15px 15px',
    display: 'flex',
    flexDirection: 'column',
  },
});

const locations = [
  "Taxes and Accounting II",
  "Professionalism I"
];

const details = {
  name:'John Doe',
  id: 'jdoe3',
  sub_details:
    {
      user: 'jdoe3',
      role: 'Student (current)',
      cohort: '1',
      gtid: "903000000",
      email: "jdoe3@gatech.edu",
    }
};

const markup = {
  user: <b> Username</b>,
  role: <b>Role</b>,
  cohort: <b>Cohort</b>,
  gtid: <b> GTID</b>,
  email: <b> Email</b>
};



// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });

function StudentName(props){
  console.log(props.exist);
  return(!props.exist ?
      <Typography variant="h3">
        Student: {props.name}
      </Typography> : <Typography/>
  )
}

class LocationItem extends Component {
  listbutton = {
    border: '1px solid black',
    width: '300px',
  };
  bringToLocation = () => {
    const goTo = '/studentDetails/' + this.props.name;
    console.log(this.props.location.pathname);
    this.props.history.push(goTo);
  };
  render(){
    return(
      <ListItem button onClick={this.bringToLocation} style={this.listbutton}>
        <ListItemText primary={this.props.name}/>
      </ListItem>
    )
  }
}

class StudentDetails extends Component {
  render() {
    const { classes } = this.props;
    const list_of_locations = this.props.location.data ? locations.map((loc) =>
      <LocationItem name={loc} history={this.props.history} location={this.props.location}/>
    ): <ListItem/>;
    console.log(Object.keys(details));
    const list_of_details = (this.props.location.data && (this.props.location.data.id === details.id)) ? Object.keys(details.sub_details).map((key) => {
        return(
          <ListItem>
            <ListItemText>
              {markup[key]} : {details.sub_details[key]}
            </ListItemText>
          </ListItem>
        )
      }
    ) : <ListItem/>;
    return (
      <Container>
        <div className={classes.side}>
          <Sidebar />
        </div>
        <div className={classes.comp_text}>
          <StudentName name={details.name} exist={this.props.location.data == null}/>
          <div className={classes.content}>
            <div className={classes.column_view}>
              <h2>Student Details</h2>
              <List>
              {list_of_details}
            </List>
            </div>
            <div className={classes.column_view}>
              <h2> Classes </h2>
              <List>
                {list_of_locations}
              </List>
            </div>

          </div>
        </div>

      </Container>
    );
  }
}

export default withStyles(styles)(StudentDetails);
