import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";
import getEvaluations from "./getEvaluations";

const evaluationsFromApi = getEvaluations();

const evalU  = {
  title: "Evaluation Scale",
  keyColumn: 'id',
  data: {
      columns: [
          {
              id: "score",
              label: "Score",
              colSize: "10px"
          },
          {
              id: "perfcompl",
              label: "Performance/Completion",
              colSize: "110px"
          },
          {
              id: "frequency",
              label: "Frequency",
              colSize: "60px"
          },
          {
            id: "supportprompt",
            label: "Support or prompt needed",
            colSize: "80px"
        },
      ],
      rows: [
          {
            score: "4",
            perfcompl: "Does Well / Has mastered",
            frequency: "Almost all the time",
            supportprompt: "with no support",
          },
          {
            score: "3",
            perfcompl: "Can do by self and completes fairly well",
            frequency: "Some (3/4) of the time",
            supportprompt: "needs minimal support or prompt",
          },
          {
            score: "2",
            perfcompl: "Can do, but not well",
            frequency: "1/4 of the time",
            supportprompt: "needs partial support to complete",
          },
          {
            score: "1",
            perfcompl: "Unable or cannot do",
            frequency: "Almost never",
            supportprompt: "full support required",
          },
          {
            score: "0",
            perfcompl: "Unwilling (Can do but chooses not to)",
            supportprompt: "Student expresses no interest in performing even with supports (Comment required)",
          },
          {
            score: "N",
            perfcompl: "Not evaluated by observation or not applicable"
          },
      ],
  },
  features: {
    userConfiguration: {
      copyToClipboard: true,
    },
  }
}



const options = {
  title: "Competencies Evaluation for jsmith43:",
  dimensions: {
    datatable: {
      width: "100%",
      height: "80%"
    },
    row: {
      height: "60px"
    }
  },
  keyColumn: "Competency",
  font: "Arial",
  data: {
    columns: [
      {
        id: "Competency",
        label: "Competency",
        colSize: "350px",
        editable: false
      },
      {
        id: "Domain",
        label: "Domain",
        colSize: "150px",
        editable: false
      },
      {
        id: "Difficulty",
        label: "Difficulty",
        colSize: "50px",
        editable: true,
        inputType: "select",
        values: ["B", "I", "A", "E"]
      },
      {
        id: "Evaluation",
        label: "Evaluation",
        colSize: "50px",
        editable: true,
        inputType: "select",
        values: ["N", "0", "1", "2", "3", "4"]
      },
      {
        id: "TrackedBy",
        label: "Tracked By",
        colSize: "80px",
        editable: true,
        inputType: "input",
      },
      {
        id: "Comments",
        label: "Comments",
        colSize: "200px",
        editable: true,
        inputType: "input",
      },
      {
        id: "FreqOfTrack" ,
        label: "Tracking Frequency",
        colSize: "80px",
        editable: true,
        inputType: "select",
        values: ["Year", "Semester", "Month"]
      }
    ],
    rows: [
      {
        Competency: "12. Understands and demonstrates safe street crossing and other pedestrian laws",
        Difficulty: "B",
        Domain: "Technology",
        Evaluation: "N",
        TrackedBy: "Social Team",
        Comments: "",
        FreqOfTrack: "Semester"
      },
      {
        Competency: "13. Understands and demonstrates when and where it is safe or unsafe to travel at night",
        Difficulty: "B",
        Domain: "Housing",
        Evaluation: "N",
        TrackedBy: "Social Team",
        Comments: "",
        FreqOfTrack: "Semester"
      },
      {
        Competency: "14. Able to get to class and other familiar locations",
        Difficulty: "B",
        Domain: "Health and Wellness",
        Evaluation: "N",
        TrackedBy: "Social Team",
        Comments: "",
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
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["Competency", "Domain", "Difficulty", "Evaluation", "TrackedBy", "FreqOfTrack", "Comments"],
      copyToClipboard: true
    },
    pagination: false,
    // rowsPerPage: {
    //   available: [10, 25, 50, 100],
    //   selected: 50
    // },
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
  marginLeft: '190px',
  padding: '1px 16px',
  height: '1000px',
}
});


class App extends Component {
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
          <Datatable options={evalU}/>
        </div>



      </Container>
    );
  }
}

export default withStyles(styles)(App);
