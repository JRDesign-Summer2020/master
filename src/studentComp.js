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
    // flexDirection: 'row',
  },
  comp_text: {
    marginLeft: '210px',
    marginBottom: '20px',
    padding: '1px 5px',
    height: '300px',
    display: 'fixed',
    // flexDirection: 'column',
  },
  column_view: {
    padding: '8px 8px',
    display: 'inline-block',
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
          id: "Domain",
          label: "Domain",
          colSize: "150px",
          editable: false
        },
        {
          id: "Difficulty",
          label: "Difficulty",
          colSize: "50px",
          editable: false,
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
      rows: [
      ]
    },
    features: {
      canEdit: true,
      canDelete: true,
      canPrint: true,
      canDownload: true,
      canSearch: true,
      canOrderColumns: true,
      canSaveUserConfiguration: true,
      userConfiguration: {
        columnsOrder: ["Competency", "Domain", "Difficulty", "Evaluation", "TrackedBy", "FreqOfTrack", "Comments", "clickButton"],
        copyToClipboard: true
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
  gtid: <b> GTID</b>,
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
    border: '1px solid black',
    width: '300px',
  };
  bringToLocation = () => {
    console.log('name: ' + this.props.name);
    console.log('sub: ' + this.props.sub_id)
    const goTo = this.props.endpoint;
    const id = this.props.sub_id;
    console.log(this.props.location.pathname);
    this.props.history.push(
        {
          pathname: goTo,
          data: {id}
        }
      );
}
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
                      Difficulty: "B",
                      Domain: "Technology",
                      Evaluation: "N",
                      TrackedBy: "Social Team",
                      Comments: "",
                      FreqOfTrack: "Semester",
                      clickButton: <button onClick={() => this.performEval(1283)}>Submit</button>,
                    }
              ],
              [837, 
                  {
                      Competency: "13. Understands and demonstrates safe Uber and taxi usage.",
                      Difficulty: "B",
                      Domain: "Technology",
                      Evaluation: "N",
                      TrackedBy: "Social Team",
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
                gtid: "903000000",
                email: "jdoe3@gatech.edu",
              }
          },
      };

    data_id = this.props.location.data ? this.props.location.data.id : null;
    comp_dict = this.data_id ? this.details[this.data_id] : null;

    actionsRow = ({ type, payload }) => {
        console.log(type);
        console.log(payload);
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
    }

    state = {
       comp_info: _.cloneDeep(datatable_frame),
       comp_history_info: _.cloneDeep(datatable_frame)
    }

    performEval(id) {
        console.log(this.comp_dict.competencies.filter(item => item[0] == id))
        let filtered = this.comp_dict.competencies.filter(item => item[0] == id)
        let inter = filtered[0];
        let comp_data = filtered ? (inter ? filtered[0][1] : inter) : null;
        let rest = comp_data ? this.comp_dict.competencies.filter(item => item[0] != id) : this.comp_dict.competencies;
        console.log(comp_data);
        console.log(rest);
        this.state.comp_info.data.rows = (rest ? rest.map((comp) => comp[1]) : null);
        this.comp_dict.historic_competencies.push(inter);
        console.log(this.comp_dict.historic_competencies);
        this.state.comp_history_info.data.rows = this.comp_dict.historic_competencies.map((comp) => comp[1])
        console.log(this.state.comp_history_info.data.rows);
        this.forceUpdate();
        // this.setState({data_table_current:  <Datatable options={this.state.comp_info} refreshRows={this.refreshRows} actions={this.actionsRow} forceRerender={true}/>});
    }

    componentDidMount() {
        this.state.comp_info.data.rows = (this.data_id ? this.comp_dict.competencies.map((comp) => comp[1]) : null);
        this.state.comp_history_info.data.rows = (this.data_id ? this.comp_dict.historic_competencies.map((comp) => comp[1]) : null);
        this.state.comp_history_info.title = "Previously evaluated competencies: ";
        this.state.comp_history_info.features.userConfiguration.columnsOrder.pop();
        this.state.comp_history_info.data.columns.pop();
        console.log(this.state.comp_info.data.rows);
        console.log(this.state.comp_history_info.data.columns);
        this.forceUpdate();
    }

    render() {
        console.log('yes');
        const { classes } = this.props;
        const list_of_locations = this.data_id ? this.comp_dict.locations.map((loc) =>
            <LocationItem name={loc[1]} endpoint='/classDetails' sub_id={loc[0]} history={this.props.history} location={this.props.location}/>
        ): <ListItem></ListItem>;
        const list_of_details = this.comp_dict ? Object.keys(this.comp_dict.sub_details).map((key) => {
            return(
                <ListItem>
                    <ListItemText>
                        {markup[key]} : {this.comp_dict.sub_details[key]}
                    </ListItemText>
                </ListItem>
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
            <div className={classes.content}>
                <div className={classes.column_view}>
                {/* <h2>Student Details</h2> */}
                <List>
                {list_of_details}
                </List>
                </div>
                <div className={classes.column_view}>
                <ListItemText> <b>Classes</b> :</ListItemText>
                <List>
                    {list_of_locations}
                </List>
                </div>
            </div>
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
