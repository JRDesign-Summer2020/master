import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";



const options = {
  title: "Competencies",
  dimensions: {
    datatable: {
      width: "100%",
      height: "80%"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "allCompetencies",
  font: "Arial",
  data: {
    columns: [
      {
        id: "allCompetencies",
        label: "All Competencies",
        colSize: "150px",
        editable: false
      },
      {
        id: "PhysicalLocation",
        label: "Location on Campus",
        colSize: "200px",
        editable: false,
      },
      {
        id: "MeetingTime",
        label: "Meeting Time",
        colSize: "150px",
        editable: false,
      },
      {
        id: "Faculty",
        label: "Faculty",
        colSize: "150px",
      }
    ],
    rows: [
      {
        LocationName: "Career Success II",
        PhysicalLocation: "College of Business 4321",
        MeetingTime : "12:30pm - 1:15pm",
        Faculty: "Dr. John Doe",
      },
      {
        LocationName: "Career Success I",
        PhysicalLocation: "College of Business 3317",
        MeetingTime : "2:30pm - 3:45pm",
        Faculty: "Prof. Nathan Heald",
      },
      {
        LocationName: "Taxes and Accounting I",
        PhysicalLocation: "College of Business 2321",
        MeetingTime : "10:00am - 11:151m",
        Faculty: "Dr. John Doe",
      }
    ]
  },
  features: {
    canEdit: false,
    canDelete: false,
    canPrint: true,
    canDownload: true,
    canSearch: true,
    canRefreshRows: true,
    canOrderColumns: true,
    canSelectRow: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["LocationName", "PhysicalLocation", "MeetingTime", "Faculty"],
      copyToClipboard: true
    },
    rowsPerPage: {
      available: [10, 25, 50, 100],
      selected: 50
    },
  }
};

const styles = theme => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
    overflow: 'auto',
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
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };

  refreshRows = () => {
    const { rows } = options.data;
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
                     options={options}
                     refreshRows={this.refreshRows}
                     actions={this.actionsRow}
          />
        </div>







      </Container>
    );
  }
}

export default withStyles(styles)(Locations);
