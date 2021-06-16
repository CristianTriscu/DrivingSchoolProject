import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "./RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { FormControl, Input, InputLabel, Button } from "@material-ui/core";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import ErrorIcon from "@material-ui/icons/Error";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@material-ui/icons/VisibilityOffTwoTone";
import CloseIcon from "@material-ui/icons/Close";
import server from "../../ServerName/ServerName";
import "../../../src/App.css";

class Registration extends Component {
  state = {
    email: "",
    password: "",
    username: "",
    passwordConfirm: "",
    hidePassword: true,
    error: null,
    matchPasswords: false,
    errorOpen: false,
    registerCompleted: false,
  };

  errorClose = (e) => {
    this.setState({
      errorOpen: false,
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  passwordMatch = () => this.state.password === this.state.passwordConfirm;

  showPassword = () => {
    this.setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };
  submitRegistration = async (e) => {
    e.preventDefault();
    if (!this.passwordMatch()) {
      this.setState({
        errorOpen: true,
        error: "Passwords don't match",
      });
      return;
    }
    const newUserCredentials = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      passwordConfirm: this.state.passwordConfirm,
    };
    console.log("this.props.newUserCredentials", newUserCredentials);
    //dispath to userActions

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      }),
    };
    const response = await fetch(server + "users", requestOptions);
    const data = await response.json();

    if (data.message === "Registration successfully") {
      this.setState({
        registerCompleted: true,
      });
    } else {
      this.setState({
        registerCompleted: false,
        errorOpen: true,
        error: data.message,
      });
    }
  };

  render() {
    const { classes } = this.props;
    if (!this.state.registerCompleted) {
      return (
        <div id="registerBg" style={{ backgroundColor: "#4F527D" }}>
          <div className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PeopleAltIcon className={classes.icon} />
              </Avatar>
              <form
                className={classes.form}
                onSubmit={() => this.submitRegistration}
              >
                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="email" className={classes.labels}>
                    e-mail
                  </InputLabel>
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={this.handleChange("email")}
                  />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="Username" className={classes.labels}>
                    username
                  </InputLabel>
                  <Input
                    name="Username"
                    type="Username"
                    autoComplete="Username"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={this.handleChange("username")}
                  />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="password" className={classes.labels}>
                    password
                  </InputLabel>
                  <Input
                    name="password"
                    autoComplete="password"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={this.handleChange("password")}
                    type={this.state.hidePassword ? "password" : "input"}
                    endAdornment={
                      this.state.hidePassword ? (
                        <InputAdornment position="end">
                          <VisibilityOffTwoToneIcon
                            fontSize="default"
                            className={classes.passwordEye}
                            onClick={this.showPassword}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          <VisibilityTwoToneIcon
                            fontSize="default"
                            className={classes.passwordEye}
                            onClick={this.showPassword}
                          />
                        </InputAdornment>
                      )
                    }
                  />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                  <InputLabel
                    htmlFor="passwordConfirm"
                    className={classes.labels}
                  >
                    confirm password
                  </InputLabel>
                  <Input
                    name="passwordConfirm"
                    autoComplete="passwordConfirm"
                    className={classes.inputs}
                    disableUnderline={true}
                    onClick={this.state.showPassword}
                    onChange={this.handleChange("passwordConfirm")}
                    type={this.state.hidePassword ? "password" : "input"}
                    endAdornment={
                      this.state.hidePassword ? (
                        <InputAdornment position="end">
                          <VisibilityOffTwoToneIcon
                            fontSize="default"
                            className={classes.passwordEye}
                            onClick={this.showPassword}
                          />
                        </InputAdornment>
                      ) : (
                        <InputAdornment position="end">
                          <VisibilityTwoToneIcon
                            fontSize="default"
                            className={classes.passwordEye}
                            onClick={this.showPassword}
                          />
                        </InputAdornment>
                      )
                    }
                  />
                </FormControl>
                <Button
                  disabled={!this.isValid()}
                  disableRipple
                  fullWidth
                  variant="outlined"
                  className={classes.button}
                  type="submit"
                  onClick={this.submitRegistration}
                >
                  Join
                </Button>
              </form>
              {this.state.error ? (
                <Snackbar
                  variant="error"
                  key={this.state.error}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  open={this.state.errorOpen}
                  onClose={this.errorClose}
                  autoHideDuration={3000}
                >
                  <SnackbarContent
                    className={classes.error}
                    message={
                      <div>
                        <span style={{ marginRight: "8px" }}>
                          <ErrorIcon fontSize="large" color="error" />
                        </span>
                        <span> {this.state.error} </span>
                      </div>
                    }
                    action={[
                      <IconButton
                        key="close"
                        aria-label="close"
                        onClick={this.errorClose}
                      >
                        <CloseIcon color="error" />
                      </IconButton>,
                    ]}
                  />
                </Snackbar>
              ) : null}
            </Paper>
          </div>
        </div>
      );
    } else {
      return <div>Registered successfully</div>;
    }
  }
}

export default withStyles(register)(Registration);
