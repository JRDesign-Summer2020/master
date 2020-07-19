import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import DummyEndpoint from '../legacy/dummy_endpoint';

const styles = () => ({
  content: {
    height: '1000px',
  }
});

class Students extends Component {
  toStudent(id) {
    this.props.history.push(
      {
        pathname: '/studentComp',
        data: {id}
      }
    );
  }

  options = {
    title: "Students assigned to compentencies",
    dimensions: {
      datatable: {
        width: "100%",
        height: "80%"
      },
      row: {
        height: "60px"
      }
    },
    keyColumn: "allStudents",
    font: "Arial",
    data: {
      columns: [
        {
          id: "allStudents",
          label: "Students",
          colSize: "150px",
          editable: false
        },
        {
          id: "clickButton",
          label: "View",
          colSize: "20px",
          editable: false
        }
      ],
      rows: [
        // {
        //   allStudents: "John Doe",
        //   id: 'jdoe3',
        //   clickButton: <button onClick={() => this.toStudent(5)}>Evaluate</button>,
        // },
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
        columnsOrder: ["allStudents", "clickButton"],
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

  state = {updated: 0};
  componentDidMount() {
    this.toStudent = this.toStudent.bind(this);
    let stud_list = DummyEndpoint.get_all_students_list(this.toStudent);
    console.log(stud_list);
    this.options.data.rows = stud_list;
    console.log(this.options);
    this.setState({updated: 1});
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
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

export default withStyles(styles)(Students);
