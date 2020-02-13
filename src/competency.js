import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";

const legend = {

}
const options = {
  title: "Excel Competencies",
  dimensions: {
    datatable: {
      width: "100%",
      height: "0%"
    },
    row: {
      height: "10px"
    }
  },
  keyColumn: "Competency",
  font: "Arial",
  data: {
    columns: [
      {
        id: "Competency",
        label: "Competency",
        colSize: "150px",
        editable: false
      },
      {
        id: "Importance Level",
        label: "Importance Level",
        colSize: "100px",
        editable: true,
        dataType: "text",
        inputType: "input"
      },
      {
        id: "Level",
        label: "Level",
        colSize: "80px",
        editable: true,
        dataType: "number",
        valueVerification: val => {
          let error = val > 100 ? true : false;
          let message = val > 100 ? "Value is too big" : "";
          return {
            error: error,
            message: message
          };
        }
      },
      {
        id: "Active",
        label: "Active",
        colSize: "50px",
        editable: true,
        dataType: "boolean",
        inputType: "checkbox"
      },
      {
        id: "TrackedBy",
        label: "Tracked By",
        colSize: "120px",
        editable: true,
        dataType: "date",
        inputType: "datePicker",
        dateFormat: "YYYY-MM-DDTHH:MM:ss"
      },
      {
        id: "TrackText",
        label: "Text Response in Tracking System",
        colSize: "100px",
        editable: true,
        inputType: "select",
        values: ["green", "blue", "brown"]
      },
      {
        id: "FreqOfTrack" ,
        label: "Frequency of Tracking",
        colSize: "150px",
        editable: true,
        inputType: "input",
        mask: [
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/,
          " ",
          /\d/,
          /\d/,
          /\d/,
          /\d/
        ]
      }
    ],
    rows: [
      {
        Competency: "",
        Level: "",
        Importance : "",
        adult: true,
        TrackedBy: "",
        TrackText: "",
        FreqOfTr: ""
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
    canSelectRow: true,
    canSaveUserConfiguration: true,
    userConfiguration: {
      columnsOrder: ["Competency", "Importance Level", "Level", "TrackedBy", "FreqOfTrack", "TrackText"],
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
