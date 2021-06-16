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

const customDate = (date) => {
  let x = "";
  x = date.substring(0, 20);
  return x;
};

export default function MsgInbox(props) {
  const classes = useStyles();

  let usedId = 0;
  const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
  if (clientInfo) {
    var clientId = clientInfo.id;
  }

  const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
  if (employeeInfo) {
    var employeeId = employeeInfo.id;
  }
  if (clientId) usedId = clientId;
  else if (employeeId) usedId = employeeId;
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([1, 2, 3]);
  console.log("aici bro");
  console.log(clientId);
  console.log(data);

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
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

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
      const data = await response.json();
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
    // <div>
    //  {data.map((elem) => (
    //          <div>{elem.content}</div>
    //           ))}
    // </div>

    <Paper
      className={classes.paper}
      style={{ maxHeight: "90vh", overflow: "auto" }}
    >
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Notificare ștersă!
        </Alert>
      </Snackbar>
      <List className={classes.root} style={{ overflow: "auto" }}>
        {data.map((elem) => (
          <div>
            {"-"}

            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Sistem" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  (elem.createdAt + "").substring(0, 10)
                 
                }
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
              <Button onClick={() => deleteNotification(elem.id)}>
                <DeleteIcon></DeleteIcon>
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
}
