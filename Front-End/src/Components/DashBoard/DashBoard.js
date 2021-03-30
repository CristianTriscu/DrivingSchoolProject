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
import {ReactComponent as dashIcon1} from "../../assets/dashIcon1.svg";
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import InfoIcon from '@material-ui/icons/Info';
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

  async componentDidMount() {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "usersByEmail/" + this.props.location.state.email,
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
  }

  render() {
    const { classes } = this.props;
    console.log(this.props);

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
                    <Grid  align="right" item xs={6}>
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
                      style={{ backgroundColor:"#388e3c", color: "white" }}
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
