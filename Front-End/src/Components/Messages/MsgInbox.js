import { useEffect, useState } from "react";
import server from "../../ServerName/ServerName";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import useForceUpdate from "use-force-update";
import MarkunreadIcon from "@material-ui/icons/Markunread";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: 25,
    textAlign: "center",
    color: "black",
    backgroundColor: "#ffffff",
    minHeight: "100vh",
    maxHeihjt: "100vh",
  },
  inline: {
    display: "inline",
  },
  paper: {
    padding: 20,
    marginBottom: 2,
    textAlign: "center",
    color: "black",
  },
}));



export default function MsgInbox(props) {
  const classes = useStyles();

  let usedId = 0;
  const userInfo = JSON.parse(localStorage.getItem("client"));
  if (userInfo) {
    var userRole = userInfo.result.role;
  }

  const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
  if (clientInfo) {
    var clientId = clientInfo.id;
  }

  const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
  if (employeeInfo) {
    var employeeId = employeeInfo.id;
  }
  if (userRole === "client") usedId = clientId;
  else if (userRole === "instructor") usedId = employeeId;
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([1, 2, 3]);

  const markAsRead = async (id) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(server + "markAsRead/" + id, requestOptions);
      const data = await response.json();
      if (data) {
        loadMessages(usedId);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const markAsUnRead = async (id) => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "markAsUnRead/" + id,
        requestOptions
      );
      const data = await response.json();
      if (data) {
        loadMessages(usedId);
      }
    } catch (er) {
      console.log(er);
    }
  };

  const loadMessages = async (id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "getMessages/" + id,
        requestOptions
      );
      const data = await response.json();
      if (data) {
        let newData = [];
        newData = data;
        setData(newData);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    loadMessages(usedId);
  }, [usedId]);



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const forceUpdate = useForceUpdate();
  const deleteNotification = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(
        server + "deleteMessage/" + id,
        requestOptions
      );
      await response.json();
      if (response.status === "200") {
        forceUpdate();
        setOpen(...true);
        loadMessages(usedId);
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Paper
      className={classes.paper}
      style={{
        maxHeight: "90vh",
        overflow: "auto",
        backgroundColor: "#9B9DC0",
      }}
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Notificare ștersă!
        </Alert>
      </Snackbar>
      <List className={classes.root} style={{ overflow: "auto" }}>
        {data.map((elem) =>
          elem.isRead === true ? (
            <div style={{ paddingTop: "1rem" }}>
              <ListItem
                style={{ backgroundColor: "#F6F7F8", borderRadius: "1rem" }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    alt="Sistem"
                    style={{ backgroundColor: "#9B9DC0" }}
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={new Date(elem.createdAt).toLocaleDateString("RO")}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Notificare Sistem
                      </Typography>
                      {" - " + elem.content}
                    </React.Fragment>
                  }
                />

                {window.innerWidth > 700 ? (
                  elem.isRead === true ? (
                    <div>
                      <Button
                        variant="outlined"
                        startIcon={<MarkunreadIcon />}
                        onClick={() => {
                          markAsUnRead(elem.id);
                        }}
                      >
                        Marchează necitit
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        startIcon={<MailOutlineIcon />}
                        onClick={() => {
                          markAsRead(elem.id);
                        }}
                      >
                        machează citit
                      </Button>
                    </div>
                  )
                ) : null}

                {window.innerWidth > 700 ? (
                  <Button
                    variant="outlined"
                    onClick={() => deleteNotification(elem.id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                ) : null}
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          ) : (
            <div style={{ paddingTop: "1rem" }}>
              <ListItem
                style={{ backgroundColor: "#c9cbf2", borderRadius: "1rem" }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar
                    style={{ backgroundColor: "#9B9DC0" }}
                    alt="Sistem"
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={new Date(elem.createdAt).toLocaleDateString("RO")}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Notificare Sistem
                      </Typography>
                      {" - " + elem.content}
                    </React.Fragment>
                  }
                />

                {window.innerWidth > 700 ? (
                  elem.isRead === true ? (
                    <div>
                      <Button
                        onClick={() => {
                          markAsUnRead(elem.id);
                        }}
                      >
                        marchează necitit
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        variant="outlined"
                        startIcon={<MailOutlineIcon />}
                        onClick={() => {
                          markAsRead(elem.id);
                        }}
                      >
                        machează citit
                      </Button>
                    </div>
                  )
                ) : null}
                {window.innerWidth > 700 ? (
                  <Button
                    variant="outlined"
                    onClick={() => deleteNotification(elem.id)}
                  >
                    <DeleteIcon></DeleteIcon>
                  </Button>
                ) : null}
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )
        )}
      </List>
    </Paper>
  );
}
