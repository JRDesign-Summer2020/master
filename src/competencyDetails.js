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
    name:'Crossing street without guidance.',
    id: '1283',
    sub_details: 
    {
            domain: 'Transportation',
            subcategory: 'Pedestrian Travel',
            importance: 'High',
            difficulty: 'Basic',
            eval_freq: 'Year'
        }
};

const markup = {
    domain: 'Domain',
    subcategory: 'Subcategory',
    importance: 'Importance',
    difficulty: 'Difficulty',
    eval_freq: 'Evaluation Frequency'
}



// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });

function CompetencyName(props){
    console.log(props.exist);
    return(!props.exist ?
            <Typography variant="h3">
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
        const goTo = '/compDetails/' + this.props.name;
        console.log(this.props.location.pathname);
        this.props.history.push(goTo);
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
    const list_of_locations = this.props.location.data ? locations.map((loc) =>
        <LocationItem name={loc} history={this.props.history} location={this.props.location}/>
    ): <ListItem></ListItem>;
    console.log(Object.keys(details));
    const list_of_details = (this.props.location.data && (this.props.location.data.id == details.id)) ? Object.keys(details.sub_details).map((key) => {
        return(
            <ListItem>
                <ListItemText>
                    {markup[key]} : {details.sub_details[key]}
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
            <CompetencyName name={details.name} exist={this.props.location.data == null}></CompetencyName>
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
