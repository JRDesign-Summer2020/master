import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import HomeIcon from "@material-ui/icons/Home";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import PeopleIcon from '@material-ui/icons/People';
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import { StepIcon } from '@material-ui/core';
import Dashboard from '@material-ui/icons/Dashboard';
import { Redirect } from 'react-router-dom'
import { withRouter } from "react-router";


function onClick(e, item) {
  window.alert(JSON.stringify(item, null, 2));
}
function onCompClick(){
  window.alert('competency pressed');
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
  depthStep = 10;
  depth = 0;
  expanded = false;
  goToCompetencies = (e, item) => {
    this.props.history.push('/competency')
  }

  goToUsers = (e, item) => {
    this.props.history.push('/users')
  }

  goToHome = (e, item) => {
    this.props.history.push('/homescreen')
  }

  goToAllLocations = (e, item) => {
    this.props.history.push('/alllocations')
  }

  goToLocationDetails = (e, item) => {
    this.props.history.push('/locationDetails')
  }
  items = [
    { level: "home",
    label: "Home",
    Icon: HomeIcon,
    onClick : this.goToHome
    },
    "divider",
    {
      level: "dashboard",
      label: "Dashboard",
      Icon: Dashboard
    },
    "divider",
    { level: "users",
    label: "Users",
    Icon: PeopleIcon,
    onClick : this.goToUsers,
  /*
  implement routing for different pages here
  */
      items: [
        "divider",
        { level: "students", label: "Students", onClick : this.goToUsers},
        "divider",
        { level: "facultystaff", label: "Faculty & Staff", onClick : this.goToUsers},
        "divider",
        { level: "peermentors", label: "Peer Mentors", onClick: this.goToUsers }]
      },
    "divider",
    { level: "competencies",
    label: "Competencies",
    Icon: CheckBoxIcon,

      items: [
        "divider",
        { level: "addcompetency", label: "Add Competency", onClick : this.onClick},
        "divider",
        { level: "managecompetencies", label: "Manage Competencies", onClick: this.goToCompetencies }]
      },
    "divider",
    { level: "locations",
    label: "Locations",
    Icon: CheckBoxIcon,
      items: [
        "divider",
        { level: "alllocations", label: "Locations", onClick : this.goToAllLocations},
        "divider",
        { level: "locationDetails", label: "Location Details", onClick: this.goToLocationDetails }]
    //onClick: this.goToAllLocations
    },
    "divider",
    {
      level: "settings",
      label: "Settings",
      Icon: SettingsIcon
    }
  ];

  render() {
    return (
      <div className="sidebar">
        <List disablePadding dense>
          {this.items.map((sidebarItem, index) => (
            <React.Fragment key={`${sidebarItem.name}${index}`}>
              {sidebarItem === "divider" ? (
                <Divider style={{ margin: "6px 0" }} />
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
