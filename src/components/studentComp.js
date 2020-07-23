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
import { getRole, getUsername } from '../helpers/utils.js';
import competency from "./competency";
import { useParams } from "react-router";

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
      let studentId = props.match.params.id;
      console.log(props);
      this.state = {
        //things that we will need to auto-update
        evaluator_id: [],
        student_id: studentId,
        student_name: [],
        student_role: [],
        student_cohort: [],
        unevaluated_competencies: [],
        evaluated_competencies: [],
        classes: [],
        //saved: false
      };

    }

    //updates competency for the save button
    actionsRow = ({ type, payload }) => {
      if (type == 'save') {
        let currentComps = this.state.unevaluated_competencies
        let index = currentComps.findIndex(comp => comp.Id == payload["Id"]);
        currentComps[index]["Evaluation"] = payload["Evaluation"];
        currentComps[index]["Comments"] = payload["Comments"];
        currentComps[index]["Evidence"] = payload["Evidence"];
        currentComps[index]["clickButton"] = <button onClick={() => this.performEval(payload["Id"])}>Submit</button>
        this.setState({unevaluated_competencies: currentComps})
      }
    };

    refreshRows = (information) => {
        const { rows } = information.data;
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
          "Month": d.getMonth(),
          "Day": d.getDate(),
          "UserIdEvaluator": this.state.evaluator_id,
          "EvaluationScore": new_eval["Evaluation"],
          "Comments": new_eval["Comments"],
          "Evidence": new_eval["Evidence"],
          "Approved": "False"
       }
      });
      // .then(response => {
      //   comp = current_comps.find(comp => comp.Id == id)
      //   response.map(item=> ({
      //     Competency: comp.Class,
      //     Evaluation: item.EvaluationScore,
      //     Class: this.state.classes,
      //     Evidence: item.Evidence,
      //     Comments: item.Comments,
      //     FreqOfTrack: comp.EvaluationFrequency,
      //   }));
      // });

    }

    //sorry for this mess
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

      getRole().then(role => 
        {
          //get students based on role - all students for admins and peer mentor coordinators
          //only the students they teach/advise for other rolles
          if (role == 'Admins' || role == "PeerMentorCoordinators") {
            //gets all users and their connected classes
            invokeApig({
              path: ( '/users-to-tracking-location'), 
              method: "GET",
              headers: {},
              queryParams: {} ,
            }).then(response => {
              let users = response['Items'];
              //gets the username of the evaluator
              getUsername().then(username => {
                this.setState( {evaluator_id: username} )
                let myUser = users.find(user => user.UserId == this.state.student_id);
                console.log(myUser)
                //check if the user is connected to any classes, if not do nothing
                if(myUser != undefined) {
                  let locationIds = myUser.LocationIds;
                  this.setState({classes: locationIds})
                  locationIds.forEach(locationId => {
                    //get the competency ids for each class they are in
                    invokeApig({
                      path: ( '/tracking-locations-to-competencies/' + encodeURIComponent(locationId)), 
                      method: "GET",
                      headers: {},
                      queryParams: {} ,
                    }).then(response => {
                      let c = response["Item"]["CompetencyIds"]
                      //pull all of the competency information from the competencies database
                      invokeApig({
                        path: ( '/competencies'), 
                        method: "GET",
                        headers: {},
                        queryParams: {} ,
                      }).then(data => {
                        let allComps = data["Items"];
                        let comps = []
                        //see if they have any previously evaluated competencies
                        invokeApig({
                          path: ( '/evaluations/' + this.state.student_id), 
                          method: "GET",
                          headers: {},
                          queryParams: {} ,
                        }).then(response =>
                          {
                            let items = response["Items"]
                            let evaluated_compIds = [];
                            for(var j = 0; j < items.length; j++) {
                              let competency_id = items[j]["CompetencyId_Timestamp"];
                              competency_id = competency_id.substring(0, competency_id.indexOf('_'));
                              evaluated_compIds.push(competency_id);
                            }
                            //getting all unevaluated comps
                            if(c.length != 0) {
                              for(var i = 0; i < c.length; ++i){
                                comps.push(allComps.find(allComp => allComp.CompetencyId == c[i]));
                                var cmp = comps.map((comp) => ({
                                  Competency: comp.CompetencyTitle,
                                  Evaluation: "N",
                                  Class: locationId,
                                  Evidence: "Assesment",
                                  Comments: "",
                                  FreqOfTrack: comp.EvaluationFrequency,
                                  clickButton: "You must edit before submitting",
                                  Id: comp.CompetencyId
                                }));
                              }
                            }
                            //mapping all evaluted competencies
                            let evaluated_comps = [];
                            if (evaluated_compIds.length > 0) {
                              for(var k = 0; k < evaluated_compIds.length; ++k) {
                                let index = cmp.findIndex(comp => comp.Id == evaluated_compIds[k]);
                                let new_eval = {
                                  Competency: cmp[index].Competency,
                                  Evaluation: items[k].EvaluationScore,
                                  FreqOfTrack: cmp[index].FreqOfTrack,
                                  Class: cmp[index].Class,
                                  Evidence: items[k].Evidence,
                                  Comments: items[k].Comments,
                                  Id: cmp[index].Id,
                                }
                                cmp.splice(index, 1);
                                evaluated_comps.push(new_eval);
                              }
                            }
                            //set the state of unevaluated & evaluuated competencies so they auto-update the tables
                            this.setState({evaluated_competencies: this.state.evaluated_competencies.concat(evaluated_comps)});
                            this.setState({unevaluated_competencies: this.state.unevaluated_competencies.concat(cmp)});
                          });
                      });
                    });
                  });
                }
              });
            });
          } else {
            //repeat from above but for only students they teach/advise
            invokeApig({
              path: ( '/users-to-tracking-location'), 
              method: "GET",
              headers: {},
              queryParams: {} ,
            }).then(response => {
              let users = response['Items'];
              getUsername().then(username => {
                this.setState( {evaluator_id: username} )
                let myUser = users.find(user => user.UserId == username);
                let locationIds = myUser.LocationIds;
                this.setState({classes: locationIds})
                locationIds.forEach(locationId => {
                  invokeApig({
                    path: ( '/tracking-locations-to-competencies/' + encodeURIComponent(locationId)), 
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
                      invokeApig({
                        path: ( '/evaluations/' + this.state.student_id), 
                        method: "GET",
                        headers: {},
                        queryParams: {} ,
                      }).then(response =>
                        {
                          let items = response["Items"]
                          let evaluated_compIds = [];
                          for(var j = 0; j < items.length; j++) {
                            if(items[j].UserIdEvaluator == this.state.evaluator_id) {
                              let competency_id = items[j]["CompetencyId_Timestamp"];
                              competency_id = competency_id.substring(0, competency_id.indexOf('_'));
                              evaluated_compIds.push(competency_id);
                            }
                          }
                          //getting all unevaluated comps
                          for(var i = 0; i < c.length; ++i){
                            comps.push(allComps.find(allComp => allComp.CompetencyId == c[i]));
                            var cmp = comps.map((comp) => ({
                              Competency: comp.CompetencyTitle,
                              Evaluation: "N",
                              Class: locationId,
                              Evidence: "Assesment",
                              Comments: "",
                              FreqOfTrack: comp.EvaluationFrequency,
                              clickButton: "You must edit before submitting",
                              Id: comp.CompetencyId
                            }));
                          }
                          let evaluated_comps = [];
                          if (evaluated_compIds.length > 0) {
                            for(var k = 0; k < evaluated_compIds.length; ++k) {
                              let index = cmp.findIndex(comp => comp.Id == evaluated_compIds[k]);
                              let new_eval = {
                                Competency: cmp[index].Competency,
                                Evaluation: items[k].EvaluationScore,
                                FreqOfTrack: cmp[index].FreqOfTrack,
                                Class: cmp[index].Class,
                                Evidence: items[k].Evidence,
                                Comments: items[k].Comments,
                                Id: cmp[index].Id,
                              };
                              cmp.splice(index, 1);
                              evaluated_comps.push(new_eval);
                            }
                          }

                          this.setState({evaluated_competencies: this.state.evaluated_competencies.concat(evaluated_comps)});
                          this.setState({unevaluated_competencies: this.state.unevaluated_competencies.concat(cmp)});
                        });
                    });
                  });
                });
              });
            });
          }
        }
      );
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
              <Typography display="inline" variant="h5">
                Student: {this.state.student_name}&nbsp;&nbsp;&nbsp;&nbsp;&mdash;&nbsp;&nbsp;&nbsp;&nbsp;Cohort: {this.state.student_cohort}
              </Typography>
              <ListItemText> <b>Classes</b>:</ListItemText>
              <List className={classes.column_view}>
                {/* need to make this show multiple buttons when needed */}
                <ListItem>
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
                          colSize: "130px",
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
                      //state variable
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
                          colSize: "130px",
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
                      ],
                      //state variable
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
