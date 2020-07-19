import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";



const options = {
  title: "Users",
  dimensions: {
    datatable: {
      width: "100%",
      height: "80%"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "UserID",
  font: "Arial",
  data: {
    columns: [
      {
        id: "UserID",
        label: "Username",
        colSize: "150px",
        editable: true,
      },
      {
        id: "UserInfo",
        label: "Full Name",
        colSize: "200px",
        editable: true,
      },
      {
        id: "Role",
        label: "Role",
        colSize: "150px",
        editable: true,
      },
      {
        id: "Cohort",
        label: "Cohort",
        colSize: "150px",
      }
    ],
    rows: [
      {
        UserID: "jdoe3",
        UserInfo: "John Doe",
        Role: "Student (current)",
        Cohort: "1"
      },
      {
        UserID: "lsmith5",
        UserInfo: "Lane Smith",
        Role: "Coach",
        Cohort: "2"
      },
      {
        UserID: "troberts7",
        UserInfo: "Ty Roberts",
        Role: "Faculty/Staff",
        Cohort: "3"
      }
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
    isUpdatingRows: true,
    userConfiguration: {
      columnsOrder: ["UserID", "UserInfo", "Role", "Cohort"],
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
  height: '1000px',
}
});


class Users extends Component {
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

export default withStyles(styles)(Users);
