import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
//DUMMY DATA
import DummyEndpoint from '../legacy/dummy_endpoint';

const styles = theme => ({
  content: {
  height: '1000px',
  display: 'flex',
  flexDirection: 'row',
  },
  comp_text: {
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

function LocationName(props){
    console.log(props.exist);
    return(!props.exist ?
            <Typography variant="h5">
                Class: {props.name}
            </Typography> : <Typography />
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
    //DUMMY DATA
    const details = id ? DummyEndpoint.get_location(id) : null;
    //DUMMY DATA
    const competencies_tracked = details ? DummyEndpoint.get_simple_list_of_comps(details.competencies) : null;
    const comp_name = details ? details.name : null;
    const list_of_competencies = id ? competencies_tracked.map((comp) =>
        <LocationItem key={comp.id}
            name={comp["QuickName"]}
            sub_id={comp["id"]}
            endpoint = '/compDetails'
            history={this.props.history}
            location={this.props.location}
        />
    ): <ListItem />;
    console.log(details);
    // console.log(details["students"]);
    //DUMMY DATA
    console.log(details["students"].forEach((comp) => console.log(DummyEndpoint.get_student(comp))));
    //DUMMY DATA
    const list_of_students = id ? details["students"].map((comp) =>
        <LocationItem key={comp.id}
            name={DummyEndpoint.get_student(comp)["name"]}
            sub_id={comp}
            endpoint = '/studentComp'
            history={this.props.history}
            location={this.props.location}
        />
    ): <ListItem />;

    const list_of_profs = id ? details.profs.map((prof) =>
        <LocationItem key={prof}
            name={prof}
            history={this.props.history}
            location={this.props.location}
        />
    ): <ListItem />;

    return (
      <Container>
        <div className={classes.comp_text}>
            <LocationName
                name={comp_name}
                exist={id == null}
            />
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
