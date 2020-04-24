import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";



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
}
});

// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });


class Locations extends Component {
  toClass(id) {
    this.props.history.push(
      {
        pathname: '/classDetails',
        data: {id}
      }
    );
  }
  options = {
    title: "Classes and Advising",
    dimensions: {
      datatable: {
        width: "100%",
        height: "80%"
      },
      row: {
        height: "60px"
      }
    },
    keyColumn: "LocationName",
    font: "Arial",
    data: {
      columns: [
        {
          id: "LocationName",
          label: "Class or Advising",
          colSize: "90px",
          editable: false
        },
        {
          id: "PhysicalLocation",
          label: "Location on Campus",
          colSize: "100px",
          editable: false,
        },
        {
          id: "MeetingTime",
          label: "Meeting Time",
          colSize: "70px",
          editable: false,
        },
        {
          id: "Faculty",
          label: "Faculty",
          colSize: "70px",
        },
        {
          id: "clickButton",
          label: "View",
          colSize: "20px",
          editable: false
        }
      ],
      rows: [
        {
          LocationName: "Transportation I",
          PhysicalLocation: "College of Business 4321",
          MeetingTime : "12:30pm - 1:15pm",
          Faculty: "Dr. John Doe",
          id: '1283',
          clickButton: <button onClick={() => this.toClass('13')}>View</button>,
        },
        {
          LocationName: "Career Skills II",
          PhysicalLocation: "College of Business 3317",
          MeetingTime : "2:30pm - 3:45pm",
          Faculty: "Prof. Nathan Heald",
          clickButton: <button onClick={() => this.toClass('12')}>View</button>,
        },
      ]
    },
    features: {
      canEdit: true,
      canDelete: true,
      canPrint: true,
      canDownload: true,
      canSearch: true,
      canRefreshRows: true,
      canOrderColumns: true,
      canSaveUserConfiguration: true,
      userConfiguration: {
        columnsOrder: ["LocationName", "PhysicalLocation", "MeetingTime", "Faculty", "clickButton"],
        copyToClipboard: true
      },
      rowsPerPage: {
        available: [10, 25, 50, 100],
        selected: 50
      },
    }
  };
  
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };

  refreshRows = () => {
    const { rows } = this.options.data;
    const randomRows = Math.floor(Math.random() * rows.length) + 1;
    const randomTime = Math.floor(Math.random() * 4000) + 1000;
    const randomResolve = Math.floor(Math.random() * 10) + 1;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (randomResolve > 3) {
          resolve(chunk(rows, randomRows)[0]);
        }
        reject(new Error("err"));
      }, randomTime);
    });
  };

  onClick2  = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  }


  render() {
    const { classes } = this.props;

    return (
      <Container>
        <div className={classes.side}>
          <Sidebar ></Sidebar>
        </div>
        <div className={classes.content}>
          <Datatable
                     options={this.options}
                     refreshRows={this.refreshRows}
                     actions={this.actionsRow}
          />
        </div>







      </Container>
    );
  }
}

export default withStyles(styles)(Locations);
