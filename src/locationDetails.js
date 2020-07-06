import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";

const options = {
  title: "Location Details for College of Business 2321",
  dimensions: {
    datatable: {
      width: "100%",
      height: "80%"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "ClassName",
  font: "Arial",
  data: {
    columns: [
      {
        id: "ClassName",
        label: "Class Name",
        colSize: "100px",
        editable: false
      },
      // {
      //   id: "PhysicalLocation",
      //   label: "Location on Campus",
      //   colSize: "200px",
      //   editable: false,
      // },
      {
        id: "MeetingTime",
        label: "Meeting Time",
        colSize: "100px",
        editable: false,
      },
      {
        id: "Faculty",
        label: "Faculty",
        colSize: "100px",
      },
      {
        id: "Students",
        label: "Students",
        colSize: "200px",
      }
    ],
    rows: [
      {
        ClassName: "Transport Modes II",
        PhysicalLocation: "College of Business 2321",
        MeetingTime : "2:30pm - 3:45pm",
        Faculty: "Dr. John Doe",
        Students: "Mark A., Will F., Katie L., Mitch A., Adam F., Lauren L., Bill A., Andrew F., " +
          "Jessica L., Colleen A., Ned F., Keith L."
      },
      {
        ClassName: "Career Success II",
        PhysicalLocation: "College of Business 2321",
        MeetingTime : "12:30pm - 1:15pm",
        Faculty: "Prof. Nathan Heald",
        Students: "Sophia B., Jessica L., Colleen A., Ned F., Keith L.," +
          "Mark A., Will F., Katie L., Mitch A., Adam F., Lauren L., Bill A., Andrew F.,"
      },
      {
        ClassName: "Taxes and Accounting II",
        PhysicalLocation: "College of Business 2321",
        MeetingTime : "10:00am - 11:15am",
        Faculty: "Dr. Jane Doe",
        Students: "Sarah W., Adam F., Lauren L., Bill A.,Mark A., Will F., Katie L., Mitch A.,  Andrew F., "+
                    "Jessica L., Colleen A., Ned F., Keith L."
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
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["ClassName","MeetingTime", "Faculty", "Students"],
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


class LocationDetails extends Component {
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

export default withStyles(styles)(LocationDetails);
