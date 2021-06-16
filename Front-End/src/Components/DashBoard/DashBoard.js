import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import server from "../../ServerName/ServerName";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { randomText, randomText2 } from "../../assets/text";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
//import { clientDetails } from "../../App";
import InfoIcon from "@material-ui/icons/Info";

//export const clientDetails = JSON.parse(localStorage.getItem("client"));
export const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
export const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
export const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: "center",
    color: "black",
  },
  bg: {
    padding: 25,
    textAlign: "center",
    color: "black",
    backgroundColor: "#9B9DC0",
    minHeight: "100vh",
  },

  imageIcon: {
    height: "100%",
  },
  iconRoot: {
    textAlign: "center",
  },
});

class Dashboard extends Component {
  state = {
    id: 0,
    email: "",
    username: "",
    dateCreated: "",
    dateModified: "",
    isClient: false,
  };

  loadUserByEmail = async (email) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "usersByEmail/" + email,
        requestOptions
      );
      const data = await response.json();

      console.log(data);

      this.setState({
        id: data.id,
        username: data.username,
        email: data.email,
        dateCreated: data.createdAt,
        dateModified: data.updatedAt,
      });

      if (data.Client.id) {
        this.setState({
          isClient: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadEmployeeInfo = async (id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(
        server + "employeeByUserId/" + id,
        requestOptions
      );

      const data = await response.json();
      if (response.status === 200) {
        const employeeInfo = localStorage.setItem(
          "employeeInfo",
          JSON.stringify(data)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  loadClientInfo = async (id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(
        server + "ClientByUserId/" + id,
        requestOptions
      );

      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem(
          "clientInfo",
          JSON.stringify(data)
       
        );

      } else if ( data.message === "not found") {
        localStorage.setItem("clientInfo", 'not found')
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {

    const clientDetails = JSON.parse(localStorage.getItem('client'));
    

    this.loadUserByEmail(this.props.location.state.email);
 
    console.log(clientDetails);
    if (clientDetails.result.role === "client") {
      this.loadClientInfo(clientDetails.result.id);
  
      
    } else {
      this.loadEmployeeInfo(clientDetails.result.id);
    }
  }

  render() {

    
    const clientDetails = JSON.parse(localStorage.getItem("client"));
    const { classes } = this.props;
  
  
    if (this.props.location.state !== undefined)
      return (
        <div className={classes.bg}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {!this.state.isClient ? (
                <Paper className={classes.paper}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography align="justify">
                        Incă nu te-ai înscris pentru una din categoriile
                        diponibile. Apasă pe butonul alaturat pentru a face o
                        cerere de înscriere!
                      </Typography>
                    </Grid>
                    <Grid align="right" item xs={6}>
                      <Button
                        endIcon={
                          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                        }
                        size="large"
                        variant="contained"
                        onClick={() =>
                          this.props.history.push({
                            pathname: "/newClientForm",
                            state: this.state.id,
                          })
                        }
                        style={{ backgroundColor: "#388e3c", color: "white" }}
                      >
                        Înscrie-te acum
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ) : (
                <Paper className={classes.paper}>
                  Ai trimis deja o cerere!
                </Paper>
              )}
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography align="left"> {"Status cerere:"}</Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Data trimitere:"
                      secondary="Jan 9, 2014"
                    />

                    <ListItemText primary="Stare:"></ListItemText>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography> {randomText}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <InfoIcon fontSize="large"></InfoIcon>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography> {randomText2}</Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <HourglassEmptyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="În asteptare"
                      secondary="Jan 9, 2014"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "green" }}>
                        <AssignmentTurnedInIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Acceptată" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "red" }}>
                        <NotInterestedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Refuzată" secondary="Jan 9, 2014" />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
    else return <div>You are not Logged In</div>;
  }
}

export default withStyles(styles)(withRouter(Dashboard));
