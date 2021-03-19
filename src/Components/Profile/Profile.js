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

class Profile extends Component {
  state = {
    id: 0,
    email: "",
    username: "",
    dateCreated: "",
    dateModified: "",
    isClient: false,
  };


  render() {
    const { classes } = this.props;
    console.log(this.props);

    if (this.props.location.state !== undefined)
      return (
        <div className={classes.paper}>
          <Grid container spacing={3}>
         
            <Grid item xs={12}>
              <Paper className={classes.paper}>Pofiltest</Paper>
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

export default withStyles(styles)(withRouter(Profile));
