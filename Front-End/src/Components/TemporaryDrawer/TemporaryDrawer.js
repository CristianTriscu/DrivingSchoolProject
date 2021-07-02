import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import DriveEtaIcon from "@material-ui/icons/DriveEta";
import EmailIcon from "@material-ui/icons/Email";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InsertInvitationIcon from "@material-ui/icons/InsertInvitation";
import StarsIcon from "@material-ui/icons/Stars";
import DescriptionIcon from "@material-ui/icons/Description";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PeopleIcon from "@material-ui/icons/People";
const useStyles = makeStyles({
  list: {
    paddingTop: 20,
    width: 250,
    height: "100vh",
    backgroundColor: "#282A36",
    color: "#F8F8F2",
  },
  fullList: {
    width: "auto",
  },

  icon: {
    color: "#F8F8F2",
  },
});
const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}
export default function TemporaryDrawer() {
  let userType = null;
  let user = JSON.parse(localStorage.getItem("client"));
  if (user) {
    userType = user.result.role;
  }

  console.log(userType);
  const history = useHistory();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <ListItem button alignItems="center">
        <Typography>
          <CloseIcon
            style={{ paddingLeft: "5vw", color: "#F8F8F2" }}
            fontSize="large"
          />
        </Typography>
      </ListItem>
      <Divider style={{ backgroundColor: "#F8F8F2" }} />
      <List>
        <ListItem
          button
          key={"Welcome Page"}
          onClick={() => history.push("/auth")}
        >
          <ListItemIcon>
            <StarsIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={"Bun venit!"} />
        </ListItem>

        <ListItem
          button
          key={"Dashboard"}
          onClick={() =>
            history.push({
              pathname: "/DashboardAuth",
              state: { email: localStorage.getItem("driverEmail") },
            })
          }
        >
          <ListItemIcon>
            <DashboardIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

        {userType === "client" || userType === "instructor" ? (
          <ListItem
            button
            key={"Rezervă ședință"}
            onClick={() => history.push("/Reservation")}
          >
            <ListItemIcon>
              <InsertInvitationIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Planificator ședințe"} />
          </ListItem>
        ) : null}

        {userType==="instructor" ?(   <ListItem
            button
            key={"Tabel cursanți"}
            onClick={() => history.push("/ClientsTable")}
          >
            <ListItemIcon>
              <InsertInvitationIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Tabel cursanți"} />
          </ListItem>):null}

        {userType === "client" ? (
          <ListItem
            button
            key={"Teste de verificare"}
            onClick={()=> openInNewTab('http://localhost:3001/')}
           
          >
            <ListItemIcon>
              <InsertInvitationIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Teste de verificare"} />
          </ListItem>
        ) : null}
      </List>

      <Divider style={{ backgroundColor: "#F8F8F2" }} />
      <List>
        <ListItem button key={"Notificări"}>
          <ListItemIcon>
            <EmailIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={"Notificări"} />
        </ListItem>

        <ListItem
          onClick={() => history.push("/ParcAuto")}
          button
          key={"Parc auto"}
        >
          <ListItemIcon>
            <DriveEtaIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText primary={"Parc auto"} />
        </ListItem>
      </List>
      <Divider style={{ backgroundColor: "#F8F8F2" }} />
      {userType === "admin" ? (
        <List>
          <ListItem
            button
            key={"Generare documente cursanți"}
            onClick={() => history.push("/Documents")}
          >
            <ListItemIcon>
              <DescriptionIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Generare documente cursanți"} />
          </ListItem>
          <ListItem
            button
            key={"Adaugă/Modifică serii"}
            onClick={() => history.push("/Series")}
          >
            <ListItemIcon>
              <GroupAddIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Adaugă/Modifică serii"} />
          </ListItem>

          <ListItem
            onClick={() => history.push("/Groups-Series")}
            button
            key={"Groups-Series"}
          >
            <ListItemIcon>
              <PeopleIcon className={classes.icon} />
            </ListItemIcon>
            <ListItemText primary={"Vizualizare pe serii/grupe"} />
          </ListItem>
        </List>
      ) : null}
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <MenuIcon onClick={toggleDrawer(anchor, true)}>{anchor}</MenuIcon>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
