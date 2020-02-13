import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";

const options = {
  title: "Excel Competencies, evaluated by: ",
  dimensions: {
    datatable: {
      width: "100%",
      height: "40%"
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

  render() {
    return (
      <Datatable
        options={options}
        refreshRows={this.refreshRows}
        actions={this.actionsRow}
      />
    );
  }
}

export default App;
