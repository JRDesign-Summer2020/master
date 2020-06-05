import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from "@material-ui/icons/Settings";
import Dashboard from '@material-ui/icons/Dashboard';
import Location from '@material-ui/icons/Place';
import CompetencyIcon from '@material-ui/icons/Notes';
import {Redirect} from 'react-router-dom'
import {withRouter} from "react-router";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { Auth } from 'aws-amplify';

function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}
function SidebarItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
  const [collapsed, setCollapsed] = React.useState(true);
  const { label, items, Icon, onClick: onClickProp } = item;

  function toggleCollapse() {
    setCollapsed(prevValue => !prevValue);
  }

  function onClick(e) {
    if (Array.isArray(items)) {
      toggleCollapse();
    }
    if (onClickProp) {
      onClickProp(e, item);
    }
    return (<Redirect to='/competency' />);
  }

  function getSideBarItem(subItem) {
    // alert(subItem);
    return(<SidebarItem
                    depth={depth + 1}
                    depthStep={depthStep}
                    item={subItem}
                  />)
    }


  let expandIcon;

  if (Array.isArray(items) && items.length) {
    expandIcon = !collapsed ? (
      <ExpandLessIcon
        className={
          "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
        }
      />
    ) : (
      <ExpandMoreIcon className="sidebar-item-expand-arrow" />
    );
  }

  return (
    <>
      <ListItem
        className="sidebar-item"
        onClick={onClick}
        button
        dense
        {...rest}
      >
        <div
          style={{ paddingLeft: depth * depthStep }}
          className="sidebar-item-content"
        >
          {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
          <div className="sidebar-item-text">{label}</div>
        </div>
        {expandIcon}
      </ListItem>
      <Collapse in={!collapsed} timeout="auto" unmountOnExit>
        {Array.isArray(items) ? (
          <List disablePadding dense>
            {items.map((subItem, index) => (
              <React.Fragment key={`${subItem.name}${index}`}>
                {subItem === "divider" ? (
                  <Divider style={{ margin: "6px 0" }} />
                ) : (
                  getSideBarItem(subItem)
                )}
              </React.Fragment>
            ))}
          </List>
        ) : null}
      </Collapse>
    </>
  );
}

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    depthStep = 10;
    depth = 0;
    expanded = false;

    goToCompetencies = () => {
        this.props.history.push('/allCompetencies');
    }

    goToUsers = () => {
        this.props.history.push('/users');
    }

    goToHome = () => {
        this.props.history.push('/homescreen');
    }

    goToAllLocations = () => {
        this.props.history.push('/alllocations');
    }

    goToFacultyStaff = () => {
        this.props.history.push('/facultystaff');
    }

    goToLocationDetails = () => {
        this.props.history.push('/locationDetails');
    }

    goToStudents = () => {
        this.props.history.push('/students');
    }

    signOut = async () => {
        try {
            await Auth.signOut();
            this.props.history.push('/');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    }

    items = [
        { level: "home",
        label: "Home",
        Icon: HomeIcon,
        onClick : this.goToHome
        },
        "divider",
        { level: "competencies",
        label: "Competencies",
        Icon: CompetencyIcon,

        items: [
            "divider",
            { level: "managecompetencies", label: "Evaluate & Review", onClick: this.goToStudents },
            "divider",
        ]
        },
        "divider",
        {
        level: "classandadvising",
        label: "Class & Advising",
        Icon: Location,
        onClick: this.goToAllLocations,
        },
        "divider",
        { level: "adminsettings",
        label: "Admin Settings",
        Icon: PeopleIcon,
        items: [
            "divider",
            { level: "manageusers", label: "Edit Users", onClick:this.goToUsers},
            "divider",
            { level: "managecompetencies", label: "Edit Competencies", onClick : this.goToCompetencies},
            "divider",
            { level: "manageclassesadvising", label: "Edit Class & Advising", onClick: this.goToAllLocations }]
        },
        "divider",
        {
        level: "sign out",
        label: "Sign out",
        Icon: ExitToAppIcon,
        onClick : this.signOut,
        }
    ];

    render() {
        return (
            <div className="sidebar">
            <List disablePadding dense>
                {this.items.map((sidebarItem, index) => (
                <React.Fragment key={`${sidebarItem.name}${index}`}>
                    {sidebarItem === "divider" ? (
                    <Divider style={{margin: "6px 0"}}/>
                    ) : (
                    <SidebarItem
                        depthStep={this.depthStep}
                        depth={this.depth}
                        expanded={this.expanded}
                        item={sidebarItem}
                    />
                    )}
                </React.Fragment>
                ))}
            </List>
            </div>
        );
    }
}

export default withRouter(Sidebar);
