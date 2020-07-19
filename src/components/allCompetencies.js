import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import { invokeApig } from '../helpers/utils';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
  content: {
    height: '1000px',
  }
});




class allCompetencies extends Component {
  toCompetency(id) {
    this.props.history.push(
      {
        pathname: '/compDetails',
        id: '1283'
      }
    );
  }


  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

  }

  componentWillMount(){
    console.log('First this called');
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
      additionalIcons: [
        {
            tooltip: 'Add',
            icon: <AddIcon/>,
            onClick: () => alert('Add!')
        }
    ],
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
      clickButton: <button onClick={() => this.toCompetency(item['CompetencyId'])}>View</button>,
    }));

  };

  onClick2  = (e, item) => {
    window.alert(JSON.stringify(item, null, 2));
  }


  componentDidMount() {
    console.log("then this");
    invokeApig({
      path: ( '/competencies'),
      method: "GET",
      headers: {},
      queryParams: {} ,
    }).then(response => response["Items"]).then(items => items.map(item => ({
      allCompetencies: item['CompetencyTitle'],
      id: item['CompetencyId'],
      clickButton: <button onClick={() => this.toCompetency(item.CompetencyId)}>View</button>,
    }))).then(comps => {
      this.setState({ data: comps });
    });
  }


  render() {
    const { classes } = this.props;
    return (
      <Container>
        <div className={classes.content}>
          <Datatable
            options={{
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
                rows: this.state.data
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
                additionalIcons: [
                  {
                      tooltip: 'Add',
                      icon: <AddIcon/>,
                      onClick: () => alert('Add!')
                  }
              ],
              }
            }}
            refreshRows={this.getRows}
            actions={this.actionsRow}
          />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(allCompetencies);
