import React, {Component} from "react";
import Container from '@material-ui/core/Container';
import Sidebar from "./Sidebar";
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { chunk } from "lodash";
import { Datatable } from "@o2xp/react-datatable";
import _ from "lodash";
import DummyEndpoint from './dummy_endpoint';

const styles = () => ({
  side: {
    margin: 0,
    padding: 0,
    width: '200px',
    backgroundColor : '#f1f1f1',
    position: 'fixed',
    height: '100%',
  },
  content: {
    padding: '1px 16px',
    height: '300px',
    display: 'fixed',
    marginBottom: 'inherit',
    inlineBlock: '4px'
    // flexDirection: 'row',
  },
  comp_text: {
    marginLeft: '210px',
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

let datatable_frame = {
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
          id: "Class",
          label: "Class",
          colSize: "200px",
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
      rows: [
      ]
    },
    features: {
      canPrint: true,
      canDownload: true,
      canSearch: true,
      canOrderColumns: true,
      canSaveUserConfiguration: true,
      isUpdatingRows: true,
      userConfiguration: {
        columnsOrder: ["Competency", "Evaluation", "FreqOfTrack", "Class", "Comments", "clickButton"],
      },
      // rowsPerPage: {
      //   available: [10, 25, 50, 100],
      //   selected: 50
      // },
    },

  };


const markup = {
  user: <b> Username</b>,
  role: <b>Role</b>,
  cohort: <b>Cohort</b>,
  email: <b> Email</b>
};



// const styles = theme => ({
//   sideB: {
//     float: left,
//   },
// });

function StudentName(props){
  return(!props.exist ?
      <Typography variant="h5">
        Student: {props.name}
      </Typography> : <Typography/>
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
    details = {
        5:
          {
              name:'John Doe',
              id: 'jdoe3',
              locations : [
                ['13', "Transportation I"],
                ['12', "Career Skills II"],
            ],
            competencies:[
              [1283,
                  {
                      Competency: "12. Understands and demonstrates safe street crossing and other pedestrian laws",
                      Evaluation: "N",
                      Class: "Career Skills II",
                      Comments: "",
                      FreqOfTrack: "Semester",
                      clickButton: <button onClick={() => this.performEval(1283)}>Submit</button>,
                    }
              ],
              [837,
                  {
                      Competency: "13. Understands and demonstrates safe Uber and taxi usage.",
                      Evaluation: "N",
                      Class: "Transportation I",
                      Comments: "",
                      FreqOfTrack: "Semester",
                      clickButton: <button onClick={() => this.performEval(837)}>Submit</button>,
                }
              ],
          ],
          historic_competencies: [],
              sub_details:
              {
                user: 'jdoe3',
                role: 'Student (current)',
                cohort: '1',
                email: "jdoe3@gatech.edu",
              }
          },
      };

    data_id = this.props.location.data ? this.props.location.data.id : null;
    student_data = this.data_id ? DummyEndpoint.get_student(this.data_id) : null;
    //comp_dict = this.data_id ? this.details[this.data_id] : null;
    comp_dict = this.student_data;

    actionsRow = ({ type, payload }) => {
      console.log(type, payload);
        if (type == 'save') {
          // let new_state = [];
          // this.state.comp_info.data.rows.forEach((comp) => {
          //   console.log(comp);
          //   console.log(comp["Competency"]);
          //   if (comp["Competency"] == payload["Competency"]) {
          //       new_state.push(payload);
          //   } else {
          //     new_state.push(comp);
          //   }
          // })
          this.comp_dict["evaluations"][payload["id"]]["eval"] = payload["Evaluation"];
          this.comp_dict["evaluations"][payload["id"]]["comment"] = payload["Comments"];
          this.performTableUpdate();
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

    state = {
       comp_info: _.cloneDeep(datatable_frame),
       comp_history_info: _.cloneDeep(datatable_frame),
       competencies: null,
    }

    performEval(id) {
        console.log(id);
        console.log(this.comp_dict.competencies)
        let current_comps = this.comp_dict.competencies;
        let filtered = current_comps.filter(item => item != id);
        this.comp_dict.competencies = filtered;
        this.comp_dict.historic_competencies.push(id);
        console.log(current_comps);
        console.log(filtered);
        //console.log('calling write');
        //DummyEndpoint.write_to_student(this.data_id, this.comp_dict);
        //console.log('done write');
        this.performTableUpdate();
    }

    performTableUpdate() {
        let competency= DummyEndpoint.get_list_of_comps(this.comp_dict.competencies, this.performEval, this.data_id);
        console.log(competency);
        let historic_competency = DummyEndpoint.get_list_of_comps(this.comp_dict.historic_competencies, null, this.data_id);
        console.log('historic');
        console.log(historic_competency);
        
        this.state.comp_info.data.rows = competency;
        this.state.comp_history_info.data.rows = historic_competency;
        console.log(this.state.comp_info.data.rows);
        console.log(this.state.comp_history_info.data.columns);
        this.forceUpdate();
    }

    componentDidMount() {
      if (this.comp_dict) {
        console.log('component did mount')
        this.performEval = this.performEval.bind(this);
        this.state.comp_history_info.title = "Previously evaluated competencies: ";
        this.state.comp_history_info.features.userConfiguration.columnsOrder.pop();
        this.state.comp_history_info.data.columns.pop();
        this.performTableUpdate();
      }
    }

    render() {
        console.log('yes');
        console.log(this.student_data);
        const { classes } = this.props;
        const list_of_locations = this.data_id ? this.comp_dict.locations.map((loc) =>
            <LocationItem name={loc[1]} endpoint='/classDetails' sub_id={loc[0]} history={this.props.history} location={this.props.location}/>
        ): <ListItem></ListItem>;
        const list_of_details = this.comp_dict ? Object.keys(this.comp_dict.sub_details).map((key) => {
            return(
              <List>
                <ListItem>
                    <ListItemText>
                        {markup[key]} : {this.comp_dict.sub_details[key]}
                    </ListItemText>
                </ListItem>
              </List>
            )
        }
        ) : <ListItem></ListItem>;
        return (
        <Container>
            <div className={classes.side}>
            <Sidebar />
            </div>
            <div className={classes.comp_text}>
            <StudentName name={(this.comp_dict ? this.comp_dict.name : null)} exist={this.props.location.data == null} />

              <div className={classes.column_view}>
                {/* <h2>Student Details</h2> */}
                <List style={flexContainer}>
                {list_of_details}
                </List>
                </div>

                <ListItemText> <b>Classes</b> :</ListItemText>
                <List className={classes.column_view}>
                    {list_of_locations}
                </List>

            <div className={classes.content_displays}>
                <Datatable options={this.state.comp_info} refreshRows={() => this.refreshRows(this.state.comp_info)} actions={this.actionsRow}/>
            </div>
            <div className={classes.content_displays}>
                <Datatable options={this.state.comp_history_info} refreshRows={() => this.refreshRows(this.state.comp_history_info)} actions={this.actionsRow}/>
            </div>
            </div>

        </Container>
        );
    }
}

export default withStyles(styles)(StudentComp);
