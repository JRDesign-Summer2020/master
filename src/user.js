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



const options = {
  title: "Excel Users, evaluated by: ",
  dimensions: {
    datatable: {
      width: "100%",
      height: "40%"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "User",
  font: "Arial",
  data: {
    columns: [
      {
        id: "User",
        label: "User",
        colSize: "350px",
        editable: false
      },
      {
        id: "ImportanceLevel",
        label: "Importance Level",
        colSize: "80px",
        editable: true,
        inputType: "select",
        values: ["High", "Medium", "Low"]
      },
      {
        id: "Level",
        label: "Level",
        colSize: "20px",
        editable: true,
        inputType: "select",
        values: ["B", "I", "A", "E"]
      },
      {
        id: "TrackedBy",
        label: "Tracked By",
        colSize: "80px",
        editable: true,
        inputType: "input",
      },
      {
        id: "TrackText",
        label: "Text Response in Tracking System",
        colSize: "100px",
        editable: true,
        inputType: "input",
      },
      {
        id: "FreqOfTrack" ,
        label: "Frequency of Tracking",
        colSize: "80px",
        editable: true,
        inputType: "select",
        values: ["Year", "Semester", "Month"]
      }
    ],
    rows: [
      {
        Competency: "12. Understands and demonstrates safe street crossing and other pedestrian laws",
        Level: "B",
        ImportanceLevel : "High",
        TrackedBy: "Social Team",
        TrackText: "",
        FreqOfTrack: "Semester"
      },
      {
        Competency: "13. Understands and demonstrates when and where it is safe or unsafe to travel at night",
        Level: "B",
        ImportanceLevel : "Medium",
        TrackedBy: "Social Team",
        TrackText: "",
        FreqOfTrack: "Semester"
      },
      {
        Competency: "14. Able to get to class and other familiar locations",
        Level: "B",
        ImportanceLevel : "High",
        TrackedBy: "Social Team",
        TrackText: "",
        FreqOfTrack: "Semester"
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
    canSelectRow: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["Competency", "ImportanceLevel", "Level", "TrackedBy", "FreqOfTrack", "TrackText"],
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


class App extends Component {
  actionsRow = ({ type, payload }) => {
    console.log(type);
    console.log(payload);
  };
  returnToDash = () => {
    this.props.history.push('/users');
  }

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

  goToCompetencies = (e, item) => {
    this.props.history.push('/competency')
  }

  goHome = (e, item) => {
    this.props.history.push('/homescreen')
  }

  goToUsers = (e, item) => {
      this.props.history.push('/users');
  }



  items = [
    { level: "home",
      label: "Home",
      Icon: HomeIcon,
      onClick: this.goHome
    },
    "divider",
    {
      level: "dashboard",
      label: "Dashboard",
      Icon: Dashboard
    },
    "divider",
    { level: "students",
      label: "Students",
      Icon: PeopleIcon},
    "divider",
    { level: "competencies",
      label: "Competencies",
      Icon: CheckBoxIcon,

      items: [
        "divider",
        { level: "addcompetency", label: "Add Competency", onClick2 : this.onClick2},
        "divider",
        { level: "managecompetencies", label: "Manage Competencies", onClick2: this.goToCompetencies }]
    },
    "divider",
    {
      level: "settings",
      label: "Settings",
      Icon: SettingsIcon
    }
  ];

  render() {
    const { classes } = this.props;

    return (
      <Container>
      <Button style={{float : 'left'}}
        onClick={this.returnToDash}
      >
      Back
      </Button>
        <div className={classes.side}>
          <Sidebar items={this.items} ></Sidebar>
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

export default withStyles(styles)(App);
