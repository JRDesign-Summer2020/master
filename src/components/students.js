import React, { Component } from "react";
import { Datatable } from "@o2xp/react-datatable";
import { chunk } from "lodash";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import DummyEndpoint from '../legacy/dummy_endpoint';
import { getRole, getUsername, invokeApig } from '../helpers/utils.js';

const styles = () => ({
  content: {
    height: '1000px',
  }
});

//give a unique pathname to each user
//would look like this .../studentComp/janedoe
class Students extends Component {
  toStudent(id) {
    this.props.history.push(
      {
        pathname: '/studentComp/' + id,
      }
    );
  }


//initializes the state to have no data
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

  }

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

  //once all of the tables have loaded, this will be called
  //it will get the data from the api and map it to the columns of the table
  componentDidMount() {
    //get your students based on role
    getRole().then(role => {
        if (role === 'Admins' || role === "PeerMentorCoordinators") {
          invokeApig({
            path: ( '/users/students'),
            method: "GET",
            headers: {},
            queryParams: {} ,
          }).then(response => response["Items"].map(item => ({
            allStudents: item['UserInfo']['Name'],
            id: item['UserId'],
            clickButton: <button onClick={() => this.toStudent(item.UserId)}>Evaluations</button>,
            }))).then(students => {
            this.setState({ data: students });
            });
        } else if(role === "FacultyStaff" || role === "Mentors" || role === "Coaches") {
          getUsername().then(userId => {
            invokeApig({
              path: ( '/users/mentors/' + userId +'/students'),
              method: "GET",
              headers: {},
              queryParams: {} ,
            }).then(items => items.map(item => ({
              allStudents: item['UserInfo']['Name'],
              id: item['UserId'],
              clickButton: <button onClick={() => this.toStudent(item.UserId)}>Evaluations</button>,
              }))).then(students => {
              this.setState({ data: students });
              });
          });
        }
    });
  }

  //responsible for rendering everything on the page
  //you want to put your state variables in here so they automatically update
  render() {
    const { classes } = this.props;

    return (
      <Container>
        <div className={classes.content}>
          <Datatable
            options= {
              {
                title: "Students assigned to you",
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
                  //this is how the rows change dynamically (it does not seem to work outside of the render function)
                  rows: this.state.data 
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
                    columnsOrder: ["allStudents", "clickButton"],
                    copyToClipboard: true
                  },
                  rowsPerPage: {
                    available: [10, 25, 50, 100],
                    selected: 50
                  },
                }
              }
            }
            refreshRows={this.refreshRows}
            actions={this.actionsRow}
          />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Students);
