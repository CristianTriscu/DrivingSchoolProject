import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import server from "../../ServerName/ServerName";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { randomText, randomText2 } from "../../Assets/text";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 20,
    textAlign: "center",
    color: "black",
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
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
            {!this.state.isClient?(
              <Paper className={classes.paper}>
        
                {`Salut "X"! Incă nu te-ai înscris pentru una din categoriile diponibile.Apasă pe butonul de mai joc pentru a face o cerere de înscriere!`}
                <br></br>
                <Button
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/newClientForm",
                      state: this.state.id,
                    })
                  }
                  style={{ backgroundColor: "#343746", color: "white" }}
                >
                    Înscrie-te acum
                </Button>
              </Paper>):
              <Paper className={classes.paper}>

                 Ai trimis deja o cerere!
              </Paper>
              
              }
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{"Status:"}</Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{randomText}</Paper>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>{randomText}</Paper>
            </Grid>
          </Grid>
        </div>
      );
    else return <div>You are not Logged In</div>;
  }
}

export default withStyles(styles)(withRouter(Dashboard));
