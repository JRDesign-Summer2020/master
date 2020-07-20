import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { chunk } from "lodash";
import { Datatable } from "@o2xp/react-datatable";
import _ from "lodash";
import DummyEndpoint from '../legacy/dummy_endpoint';
import { invokeApig } from '../helpers/utils.js';
import { getUsername } from '../helpers/utils.js';

const styles = () => ({
  content: {
    display: 'fixed',
    marginBottom: 'inherit',
    inlineBlock: '4px'
    // flexDirection: 'row',
  },
  comp_text: {
    marginBottom: '20px',
    marginTop: '20px',
    padding: '1px 5px',
    height: '300px',
    display: 'fixed',
    // flexDirection: 'column',
  },
  column_view: {
    padding: '8px 8px',
    display: 'inline-block',
    marginBottom: '20px',
    // flexDirection: 'column',
  },
  content_displays: {
    padding: '1px 16px',
    height: '300px',
    display: 'fixed',
  },
  body: {
    // marginTop: "5px",
  },
});

const flexContainer = {
  display: 'flex',
  flexDirection: 'row',
  padding: 0,
};

const listbutton = {
  border: '2px',
  background: '#CFCFCF',
  transition: "#efefef",
  color: 'solid black',
  textAlign: 'center',
  borderRadius: '5px',
  height: '30px',
  margin: '0 0 3px 0',
  width: '300px',
};

function StudentName(props){
  return(!props.exist ?
      <Typography variant="h5">
        Student: {props.name}
      </Typography>
      : <Typography/>
  )
}

class LocationItem extends Component {
  listbutton = {
    border: '2px',
    background: '#CFCFCF',
    transition: "#efefef",
    color: 'solid black',
    textAlign: 'center',
    borderRadius: '5px',
    height: '30px',
    margin: '0 0 3px 0',
    width: '300px',
  };
  bringToLocation = () => {
    console.log('name: ' + this.props.name);
    console.log('sub: ' + this.props.sub_id);
    const goTo = this.props.endpoint;
    const id = this.props.sub_id;
    console.log(this.props.location.pathname);
    this.props.history.push(
        {
          pathname: goTo,
          data: {id}
        }
      );
};
  render(){
    return(
      <ListItem button onClick={this.bringToLocation} style={this.listbutton}>
        <ListItemText primary={this.props.name}/>
      </ListItem>
    )
  }
}

class StudentComp extends Component {
    constructor(props) {
      super(props);
      this.state = {
        //things that we will need to auto-update
        evaluator_id: [],
        student_id: this.props.location.data ? this.props.location.data.id : null,
        student_name: [],
        student_role: [],
        student_cohort: [],
        unevaluated_competencies: [],
        evaluated_competencies: [],
        classes: [],
      };

    }

    //updates competency for the save button
    actionsRow = ({ type, payload }) => {
      console.log(type, payload);
      if (type == 'save') {
        let currentComps = this.state.unevaluated_competencies
        let index = currentComps.findIndex(comp => comp.Id == payload["Id"]);
        currentComps[index]["Evaluation"] = payload["Evaluation"];
        currentComps[index]["Comments"] = payload["Comments"];
        currentComps[index]["Evidence"] = payload["Evidence"];
        this.setState({unevaluated_competencies: currentComps})
      }
    };

    refreshRows = (information) => {
        const { rows } = information.data;
        const randomRows = Math.floor(Math.random() * rows.length) + 1;
        const randomTime = Math.floor(Math.random() * 4000) + 1000;
        const randomResolve = Math.floor(Math.random() * 10) + 1;
        console.log('refresh rows');
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
    };

    //updates the tables - removes competency from unevaluated table, adds it to evaluated table
    //example of how to set state
    //also responsible for writing to evaluations datababase
    performEval(id) {
      var d = new Date();

      let current_comps = this.state.unevaluated_competencies;
      let index = current_comps.findIndex(comp => comp.Id == id);

      let new_eval = current_comps[index];
      current_comps.splice(index, 1);

      this.state.evaluated_competencies.push(new_eval);
      this.setState({evaluated_competencies: this.state.evaluated_competencies });

      this.setState({unevaluated_competencies: current_comps});

      invokeApig({
        path: ( '/evaluations'),
        method: "POST",
        headers: {},
        queryParams: {} ,
        body:  {
          "UserId": this.state.student_id,
          "CompetencyId": id,
          "Year": d.getFullYear(),
          "Month": d.getMonth() + 1,
          "Day": d.getDate,
          "UserIdEvaluator": this.state.evaluator_id,
          "EvaluationScore": new_eval["Evaluation"],
          "Comments": new_eval["Comments"],
          "Evidence": new_eval["Evidence"],
          "Approved": "False"
       }
      });

    }

    //once all of the components on the page load, this happens
    //responsible for pulling att of the data from the database
    componentDidMount() {
      invokeApig({
        path: ( '/users/' + this.state.student_id),
        method: "GET",
        headers: {},
        queryParams: {} ,
      }).then(response =>
        this.setState(
        {
          student_name: response["Item"]["UserInfo"]["Name"],
          student_role: response["Item"]["Role"],
          student_cohort: response["Item"]["Cohort"],
        }
      ));


      invokeApig({
        path: ( '/users-to-tracking-location'),
        method: "GET",
        headers: {},
        queryParams: {} ,
      }).then(response => {
        console.log(response);
        let users = response['Items'];
        //fix for more than one item in array
        getUsername().then(username => {
          this.setState( {evaluator_id: username} )
          let myUser = users.find(user => user.UserId === username);
          if (myUser === undefined) {
              console.log("No user-to-tracking-location found for " + username);
          }
          let locationId = myUser.LocationIds[0];
          this.setState({classes: locationId})
          invokeApig({
            path: ( '/tracking-locations-to-competencies/' + encodeURIComponent(this.state.classes)),
            method: "GET",
            headers: {},
            queryParams: {} ,
          }).then(response => {
            let c = response["Item"]["CompetencyIds"]
            invokeApig({
              path: ( '/competencies'),
              method: "GET",
              headers: {},
              queryParams: {} ,
            }).then(data => {
              let allComps = data["Items"];
              let comps = []
              for(var i = 0; i < c.length; ++i){
                comps.push(allComps.find(allComp => allComp.CompetencyId === c[i]));
                var cmp = comps.map((comp) => ({
                  Competency: comp.CompetencyTitle,
                  Evaluation: "N",
                  Class: locationId,
                  Evidence: "Assesment",
                  Comments: "",
                  FreqOfTrack: comp.EvaluationFrequency,
                  clickButton: <button onClick={() => this.performEval(comp.CompetencyId)}>Submit</button>,
                  Id: comp.CompetencyId
                }));
              }
              this.setState({unevaluated_competencies: cmp});
            });
          });
        });
      });

    }

    //brings users to the class details page
    //not sure if this is needed
    bringToLocation(classId) {
      this.props.history.push(
        {
          pathname: '/classDetails',
          data: {classId}
        }
      );
    }


    //responsible for rendering everything on the page
    //you want to put your state variables in here so they automatically update
    render() {
        const { classes } = this.props;
        return (
        <Container>
            <div className={classes.comp_text}>
            <Typography variant="h5">
              Student: {this.state.student_name}
            </Typography>
              <div className={classes.column_view}>
                  {/* <h2>Student Details</h2> */}
                  <List style={flexContainer}>
                    <List>
                      <ListItem>
                          <ListItemText>
                              <b>Username</b>: {this.state.student_id}
                          </ListItemText>
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                          <ListItemText>
                            <b>Role</b>: {this.state.student_role}
                          </ListItemText>
                      </ListItem>
                    </List>
                    <List>
                      <ListItem>
                          <ListItemText>
                              <b>Cohort</b>: {this.state.student_cohort}
                          </ListItemText>
                      </ListItem>
                    </List>
                  </List>
              </div>

              <ListItemText> <b>Classes</b>:</ListItemText>
              <List className={classes.column_view}>
                {/* need to make this show multiple buttons when needed */}
                <ListItem button style={listbutton}>
                  <ListItemText primary={this.state.classes}/>
                </ListItem>
              </List>

            <div className={classes.content_displays}>
                <Datatable options={
                  {
                    title: "Competencies that need evaluating:",
                    dimensions: {
                      datatable: {
                        width: "100%",
                        height: "100%"
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
                          id: "Evaluation",
                          label: "Evaluation",
                          colSize: "50px",
                          editable: true,
                          inputType: "select",
                          values: ["N", "0", "1", "2", "3", "4"]
                        },
                        {
                          id: "Evidence",
                          label: "Evidence",
                          colSize: "150px",
                          editable: true,
                          inputType: "select",
                          values: ["Direct observation", "Assessment", "Report from employer", "Report from coach"]
                        },
                        {
                          id: "Class",
                          label: "Class",
                          colSize: "150px",
                          editable: false,
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
                          editable: false,
                          inputType: "select",
                          values: ["Year", "Semester", "Month"]
                        },
                        {
                            id: "clickButton",
                            label: "Submit",
                            colSize: "70px",
                            editable: false
                          }
                      ],
                      rows: this.state.unevaluated_competencies
                    },
                    features: {
                      canEdit: true,
                      canPrint: true,
                      canDownload: true,
                      canSearch: true,
                      canOrderColumns: true,
                      canSaveUserConfiguration: true,
                      isUpdatingRows: true,
                      userConfiguration: {
                        columnsOrder: ["Competency", "Evaluation" ,"FreqOfTrack", "Class", "Evidence", "Comments", "clickButton"],
                      },
                      rowsPerPage: {
                        available: [10, 25, 50, 100],
                        selected: 10
                      },
                    },
                  }
                } refreshRows={() => this.refreshRows(this.state.comp_info)} actions={this.actionsRow}/>
            </div>
            <div className={classes.content_displays}>
                <Datatable options={
                  {
                    title: "Previously evaluated competencies",
                    dimensions: {
                      datatable: {
                        width: "100%",
                        height: "100%"
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
                          id: "Evaluation",
                          label: "Evaluation",
                          colSize: "50px",
                          editable: true,
                          inputType: "select",
                          values: ["N", "0", "1", "2", "3", "4"]
                        },
                        {
                          id: "Evidence",
                          label: "Evidence",
                          colSize: "50px",
                          editable: true,
                          inputType: "select",
                          values: ["Direct observation", "Assessment", "Report from employer", "Report from coach"]
                        },
                        {
                          id: "Class",
                          label: "Class",
                          colSize: "200px",
                          editable: false,
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
                          editable: false,
                          inputType: "select",
                          values: ["Year", "Semester", "Month"]
                        },
                      ],
                      rows: this.state.evaluated_competencies
                    },
                    features: {
                      canEdit: false,
                      canPrint: true,
                      canDownload: true,
                      canSearch: true,
                      canOrderColumns: true,
                      canSaveUserConfiguration: true,
                      isUpdatingRows: true,
                      userConfiguration: {
                        columnsOrder: ["Competency", "Evaluation", "FreqOfTrack", "Class", "Evidence" ,"Comments"],
                      },
                      rowsPerPage: {
                        available: [10, 25, 50, 100],
                        selected: 10
                      },
                    },

                  }
                } refreshRows={() => this.refreshRows(this.state.comp_history_info)} actions={this.actionsRow}/>
            </div>
            </div>

            </Container>
        );
    }
}

export default withStyles(styles)(StudentComp);
