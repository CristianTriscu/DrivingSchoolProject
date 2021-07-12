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
import CropSquareIcon from "@material-ui/icons/CropSquare";

import CheckIcon from "@material-ui/icons/Check";

export const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
export const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },

  container2: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    "& > *": {
      margin: "0.5rem",
      width: "7rem",
      height: "7rem",
    },
  },
  container3: {
    paddingTop: "1rem",
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    "& > *": {
      margin: "0.5rem",
      width: "100%",
      height: "100%",
    },
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

      //console.log(data);

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
        localStorage.setItem("employeeInfo", JSON.stringify(data));
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
        localStorage.setItem("clientInfo", JSON.stringify(data));
      } else if (data.message === "not found") {
        localStorage.setItem("clientInfo", JSON.stringify({}));
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount() {
    const clientDetails = JSON.parse(localStorage.getItem("client"));

    this.loadUserByEmail(this.props.location.state.email);

    if (clientDetails.result.role === "client") {
      this.loadClientInfo(clientDetails.result.id);
    } else {
      this.loadEmployeeInfo(clientDetails.result.id);
    }
  }

  render() {
    //const clientDetails = JSON.parse(localStorage.getItem("client"));
    const client = JSON.parse(localStorage.getItem("client"));
    const { classes } = this.props;
    const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));

    if (client.result.role === "admin")
      return (
        <div className={classes.bg}>
          <Paper className={classes.paper}>
            <Typography variant="h4"> Bun venit,</Typography>
            <Typography variant="h5" style={{ color: "gray" }}>
              {client.result.username} - "MANAGER"
            </Typography>
            <div style={{paddingTop:"2rem"}}className={classes.container2}>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/3GKKPpo.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/FAFYicv.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/FzVUMzs.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/o8yn9Yo.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/Xci4I9E.png"}
                  ></img>
                }{" "}
              </Paper>
            </div>
          </Paper>
          <Paper style={{ marginTop: "3rem" }} className={classes.paper}>
            <Typography variant="h5">
              {" "}
              Pentru a accesa funcționalitățile disponibile, utilizați meniul
              din stânga sus
            </Typography>
            <div className={classes.container3}>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/kjsD5Ru.png"}
                  ></img>
                }{" "}
              </Paper>
            </div>
          </Paper>
        </div>
      );
    else if (client.result.role === "instructor")
      return    ( <div className={classes.bg}>
      <Paper className={classes.paper}>
        <Typography variant="h4"> Bun venit,</Typography>
        <Typography variant="h5" style={{ color: "gray" }}>
          {client.result.username} - "INSTUCTOR"
        </Typography>
        <div style={{paddingTop:"2rem"}}className={classes.container2}>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/3GKKPpo.png"}
              ></img>
            }{" "}
          </Paper>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/FAFYicv.png"}
              ></img>
            }{" "}
          </Paper>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/FzVUMzs.png"}
              ></img>
            }{" "}
          </Paper>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/o8yn9Yo.png"}
              ></img>
            }{" "}
          </Paper>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/Xci4I9E.png"}
              ></img>
            }{" "}
          </Paper>
        </div>
      </Paper>
      <Paper style={{ marginTop: "3rem" }} className={classes.paper}>
        <Typography variant="h5">
          {" "}
          Pentru a accesa funcționalitățile disponibile, utilizați meniul
          din stânga sus
        </Typography>
        <div className={classes.container3}>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/kjsD5Ru.png"}
              ></img>
            }{" "}
          </Paper>
        </div>
      </Paper>
    </div>)
    else if (this.props.location.state !== undefined)
      return (
        <div className={classes.bg}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {!this.state.isClient ? (
                <Paper className={classes.paper}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Typography align="justify">
                        Incă nu v-ați înscris pentru una din categoriile
                        diponibile. Folosiți butonul alaturat pentru a face o
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
                  <Button endIcon={<CheckIcon />}>
                    {" "}
                    Ai trimis deja o cerere!
                  </Button>
                </Paper>
              )}
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper} >
                <Typography align="middle">
                  {" "}
                  {Object.keys(clientInfo).length === 0
                    ? "Status cerere: NETRIMISĂ"
                    : "Status cerere: ACCEPTATĂ"}
                </Typography>

                <Paper
                  style={{
                    padding: "5px",
                    marginInline: "auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: "fit-content",
                  }}
                  className={classes.paper}
                >
                  {Object.keys(clientInfo).length === 0 ? (
                    <Avatar
                      align="middle"
                      style={{
                        align: "center",

                        height: "3rem",
                        width: "3rem",
                      }}
                    >
                      <CropSquareIcon
                        style={{ height: "2rem", width: "2rem" }}
                      />
                    </Avatar>
                  ) : (
                    <Avatar
                      align="middle"
                      style={{
                        align: "center",
                        backgroundColor: "green",
                        height: "3rem",
                        width: "3rem",
                      }}
                    >
                      <AssignmentTurnedInIcon
                        style={{ height: "2rem", width: "2rem" }}
                      />
                    </Avatar>
                  )}
                </Paper>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="Data trimitere:"
                      secondary="08/06/2021"
                      align="middle"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      align="middle"
                      primary="Cerearea dumneavoastră a fost acceptată în data de 9/06/2021"
                    ></ListItemText>
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ margin: "1rem" }} className={classes.paper}>
                <Typography align="justify"> {randomText}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                className={classes.paper}
                style={{
                  width: "fit-content",
                  height: "auto",
                  display: "flex",
                }}
              >
                <div className={classes.container2}>
                  <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                    {
                      <img
                        alt="2"
                        height="100%"
                        width="100%"
                        src={"https://i.imgur.com/3GKKPpo.png"}
                      ></img>
                    }{" "}
                  </Paper>
                  <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                    {
                      <img
                        alt="2"
                        height="100%"
                        width="100%"
                        src={"https://i.imgur.com/FAFYicv.png"}
                      ></img>
                    }{" "}
                  </Paper>
                  <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                    {
                      <img
                        alt="2"
                        height="100%"
                        width="100%"
                        src={"https://i.imgur.com/FzVUMzs.png"}
                      ></img>
                    }{" "}
                  </Paper>
                  <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                    {
                      <img
                        alt="2"
                        height="100%"
                        width="100%"
                        src={"https://i.imgur.com/o8yn9Yo.png"}
                      ></img>
                    }{" "}
                  </Paper>
                  <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                    {
                      <img
                        alt="2"
                        height="100%"
                        width="100%"
                        src={"https://i.imgur.com/Xci4I9E.png"}
                      ></img>
                    }{" "}
                  </Paper>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography> {randomText2}</Typography>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar s>
                        <CropSquareIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cerere netrimisă - Nu a fost trimisă o cerere de înscriere către sistem."
                      secondary="Accesați formularul de înscriere din prima secțiune a paginii."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "#CDA466" }}>
                        <HourglassEmptyIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cerere în așteptare - Cererea trimisă este evaluată de personalul autorizat."
                      secondary="Durata de evaluare poate poate dura până la 3 zile de la trimiterea cererii."
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "green" }}>
                        <AssignmentTurnedInIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cerere acceptată - Puteți accesa planificatorul de ședințe și testele de verificare."
                      secondary="Ați fost înregistrat în sistem. "
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar style={{ backgroundColor: "red" }}>
                        <NotInterestedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cerere refuzată - Anumite informații au fost completate incorect sau reprezintă o problemă."
                      secondary="Puteți trimite o altă cerere dacă informațiile au fost incorecte."
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </div>
      );
  }
}

export default withStyles(styles)(withRouter(Dashboard));
