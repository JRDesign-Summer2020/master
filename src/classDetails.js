import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import HomeIcon from "@material-ui/icons/Home";
import Dashboard from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import SettingsIcon from "@material-ui/icons/Settings";
import color from "@material-ui/core/colors/red";
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const styles = theme => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
  },
  content: {
  padding: '1px 5px',
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
      padding: '0px 15px',
      display: 'flex',
      flexDirection: 'column',
  },
});

 
//gonna have to make API call to get comp ID then another to get comp name
const details = {
    '13': 
    {
        name: 'Transportation 1',
        competencies:[
            [1283, 'Crossing street without guidance.'],
            [837, 'Calling an Uber without guidance.' ],
        ]
        ,
        profs: [
            'Dr. John Doe',
            'Prof. Nathan Heald'
        ],
        students: [
          [5, 'John Doe'],
          [928, 'Bobby Bobberson'],
        ]
    }
};


function LocationName(props){
    console.log(props.exist);
    return(!props.exist ?
            <Typography variant="h5">
                Class: {props.name}
            </Typography> : <Typography></Typography>
    )
}

class LocationItem extends Component {
    listbutton = {
        border: '2px',
        background: '#CFCFCF',
        transition: "#efefef",
        color: 'solid black',
        textAlign: 'center',
        borderRadius: '5px',
        height: '30px',
        margin: '0 0 3px 0',
        width: '300px',
      };
    bringToLocation = () => {
        console.log('name: ' + this.props.name);
        console.log('sub: ' + this.props.sub_id)
        const goTo = this.props.endpoint;
        const id = this.props.sub_id;
        console.log(this.props.location.pathname);
        this.props.history.push(
            {
              pathname: goTo,
              data: {id}
            }
          );
    }
    render(){
        return(
            <ListItem button onClick={this.bringToLocation} style={this.listbutton}>
                <ListItemText primary={this.props.name}/>
            </ListItem>
        )
    }
}

class ClassDetails extends Component {
  render() {
    const { classes } = this.props;
    const passed = this.props.location.data;
    const id = passed ? passed.id : null;
    const comp_name = id ? details[id].name : '';
    const list_of_competencies = id ? details[id].competencies.map((comp) =>
        <LocationItem name={comp[1]} sub_id={comp[0]} endpoint = '/compDetails' history={this.props.history} location={this.props.location}/>
    ): <ListItem></ListItem>;

    const list_of_students = id ? details[id].students.map((comp) => 
        <LocationItem name={comp[1]} sub_id={comp[0]} endpoint = '/studentComp' history={this.props.history} location={this.props.location}/>
    ): <ListItem></ListItem>;

    const list_of_profs = id ? details[id].profs.map((prof) =>
        <LocationItem name={prof} history={this.props.history} location={this.props.location}/>
    ): <ListItem></ListItem>;
   
    return (
      <Container>
        <div className={classes.side}>
          <Sidebar ></Sidebar>
        </div>
        <div className={classes.comp_text}>
            <LocationName name={comp_name} exist={id == null}></LocationName>
            <div className={classes.content}>
                <div className={classes.column_view}>
                    <h4>Competencies Tracked</h4>
                    <List>
                    {list_of_competencies}
                    </List>
                </div>
                <div className={classes.column_view}>
                    <h4> Professors</h4>
                    <List>
                    {list_of_profs}
                    </List>
                </div>
                <div className={classes.column_view}>
                    <h4> Students</h4>
                    <List>
                    {list_of_students}
                    </List>
                </div>

            </div>
        </div>

      </Container>
    );
  }
}

export default withStyles(styles)(ClassDetails);
