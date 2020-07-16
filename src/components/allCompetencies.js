import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";
import { invokeApig } from '../helpers/utils';

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

// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });


class allCompetencies extends Component {
  toCompetency(id) {
    this.props.history.push(
      {
        pathname: '/compDetails',
        data: {id}
      }
    );
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  options = {
    title: "All Competencies",
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
          label: "Competencies",
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
      rows: []
      // [
      //   {
      //     allCompetencies: "Understands and demonstrates safe street crossing and other pedestrian laws",
      //     id: '1283',
      //     clickButton: <button onClick={() => this.toCompetency('1283')}>View</button>,
      //   },
      //   {
      //     allCompetencies: "Ability to call an Uber without any guidance.",
      //     id: '837',
      //     clickButton: <button onClick={() => this.toCompetency('837')}>View</button>,
      //   },
      // ]
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
        columnsOrder: ["allCompetencies", "clickButton"], //"PhysicalLocation", "MeetingTime", "Faculty"],
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

  async getRows() {
    let response = await invokeApig({
      path: ( '/competencies'),
      method: "GET",
      headers: {},
      queryParams: {} ,
    });

    let items = response["Items"];

    return items.map(item => ({
      allCompetencies: item['CompetencyTitle'],
      id: item['CompetencyId'],
      clickButton: <button onClick={() => this.toCompetency('1283')}>View</button>,
    }));

    // this.getRows();
    //console.log(items[1]["CompetencyTitle"]);

    // return rows;
  };

  onClick2  = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  }

  componentDidMount() {
  }

  render() {
    const { classes } = this.props;

    return (
      <Container>
        <div className={classes.content}>
          <Datatable
            options={this.options}
            refreshRows={this.getRows}
            actions={this.actionsRow}
          />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(allCompetencies);
