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
//DUMMY DATA
import DummyEndpoint from './dummy_endpoint';

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

const details = {
    1283:
    {
        name:'Crossing street without guidance.',
        id: '1283',
        locations : [
            ['13', "Transportation I"],
            ['12', "Career Skills II"],
        ],
        sub_details:
        {
            domain: 'Transportation',
            subcategory: 'Pedestrian Travel',
            importance: 'High',
            difficulty: 'Basic',
            eval_freq: 'Year'
        }
    },
    837:
    {
        name:'Calling an uber with no guidance.',
        id: '837',
        locations : [
            ['13', "Transportation I"],
            ['12', "Professionalism II"],
        ],
        sub_details:
        {
            domain: 'Transportation',
            subcategory: 'Pedestrian Travel',
            importance: 'High',
            difficulty: 'Intermediate',
            eval_freq: 'Year'
        }
    },
};

const markup = {
    domain: <b>Domain</b>,
    subcategory: <b>Subcategory</b>,
    importance: <b>Importance</b>,
    difficulty: <b>Difficulty</b>,
    eval_freq: <b>Evaluation Frequency</b>
}



// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });

function CompetencyName(props){
    console.log(props.exist);
    return(!props.exist ?
            <Typography variant="h4">
                Competency: {props.name}
            </Typography> : <Typography></Typography>
    )
}

class LocationItem extends Component {
    listbutton = {
        border: '1px solid black',
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

class CompetencyDetails extends Component {

  render() {
    const { classes } = this.props;
    const data_id = this.props.location.data ? this.props.location.data.id : null;
    console.log(data_id);
    const tracking_classes = data_id ? DummyEndpoint.get_classes_for_competencies(data_id) : null;
    console.log(tracking_classes);
    //const comp_dict = data_id ? details[data_id] : null;
    const comp_dict = data_id ? DummyEndpoint.get_simple_comp(data_id) : null;
    console.log(comp_dict);
    console.log(comp_dict["Competency"]);

    const list_of_locations = data_id ? tracking_classes.map((loc) =>
        <LocationItem name={loc[0]} endpoint='/classDetails' sub_id={loc[1]} history={this.props.history} location={this.props.location}/>
    ): <ListItem></ListItem>;
    //console.log(Object.keys(details[data_id]));
    const list_of_details = comp_dict ? Object.keys(comp_dict.sub_details).map((key) => {
        return(
            <ListItem>
                <ListItemText>
                    {markup[key]} : {comp_dict.sub_details[key]}
                </ListItemText>
            </ListItem>
        )
    }
    ) : <ListItem></ListItem>;
    return (
      <Container>
        <div className={classes.side}>
          <Sidebar ></Sidebar>
        </div>
        <div className={classes.comp_text}>
            <CompetencyName name={comp_dict["Competency"]} exist={this.props.location.data == null}></CompetencyName>
            <div className={classes.content}>
                <div className={classes.column_view}>
                    <h2>Details</h2>
                    <List>
                    {list_of_details}
                    </List>
                </div>
                <div className={classes.column_view}>
                    <h2> Evaluated by Locations</h2>
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

export default withStyles(styles)(CompetencyDetails);
