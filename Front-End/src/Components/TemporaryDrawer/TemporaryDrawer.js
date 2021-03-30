import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import { useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import { Typography } from "@material-ui/core";
import {Link} from "@material-ui/core"

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
});

export default function TemporaryDrawer() {
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
       <ListItem button alignItems='center' >
          <Typography >
          <CloseIcon style={{paddingLeft:"5vw", color: "#F8F8F2"}} fontSize="large" />
          </Typography>
          </ListItem>
          <Divider style={{ backgroundColor: "#F8F8F2" }}/>
      <List>
     
        <ListItem
          button
          key={"Welcome Page"}
          onClick={() => history.push("/auth")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Welcome Page"} />
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
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>

        <ListItem button key={"Rezervă ședință"}
         onClick={() => history.push("/Reservation")}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Rezervă ședință"} />
        </ListItem>
      </List>

      <Divider style={{ backgroundColor: "#F8F8F2" }} />
      <List>
        <ListItem button key={"Teste de verificare"}>
          <ListItemIcon>
            <InboxIcon style={{ color: "#F8F8F2" }} />
          </ListItemIcon>
          <ListItemText primary={"Teste de verificare"} />
        </ListItem>

        <ListItem button key={"Notificări"}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Notificări"} />
        </ListItem>

        <ListItem
          onClick={() => history.push("/ParcAuto")}
          button
          key={"Parc auto"}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={"Parc auto"} />
        </ListItem>
      </List>
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
