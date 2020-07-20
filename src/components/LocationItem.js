import React, {Component} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    listbutton: {
        border: '1px solid black',
        width: '300px',
    }
});

class LocationItem extends Component {
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
        const { classes } = this.props;
        return(
            <ListItem button onClick={this.bringToLocation} style={classes.listbutton}>
                <ListItemText primary={this.props.name}/>
            </ListItem>
        )
    }
}

export default withStyles(styles)(LocationItem)
