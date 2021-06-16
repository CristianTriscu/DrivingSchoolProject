import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../Register/RegistrationStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import server from "../../ServerName/ServerName";
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
import { withRouter } from "react-router-dom";

function shoot() {
  alert("succes!");
}
class Login extends Component {
  state = {
    email: "",
    password: "",
    hidePassword: true,
    error: null,
    errorOpen: false,
    isLoggedIn: false,
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

  passwordMatch = () => this.state.password === this.state.passwordConfrim;

  showPassword = () => {
    this.setState((prevState) => ({ hidePassword: !prevState.hidePassword }));
  };

  isValid = () => {
    if (this.state.email === "") {
      return false;
    }
    return true;
  };

  

  submitSignIn = async (e) => {
    try {
      e.preventDefault();
      shoot();
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      };
      const response = await fetch(server + "login", requestOptions);
      const data = await response.json();

      if (data.auth) {
        localStorage.setItem("driverEmail", JSON.stringify(data.result.email));
        localStorage.setItem("client", JSON.stringify(data));

        this.setState({
          isLoggedIn: true,
        });
     
      } else {
        this.setState({
          errorOpen: true,
          error: data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  

  render() {
    const { classes } = this.props;
    if (!this.state.isLoggedIn) {
      return (
        <div id="logInbg" style={{ backgroundColor: "#4F527D" }}>
          <div className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <PeopleAltIcon className={classes.icon} />
              </Avatar>
              <form className={classes.form} onSubmit={() => this.submitSignIn}>
                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="email" className={classes.labels}>
                    e-mail
                  </InputLabel>
                  <Input
                    name="email"
                    type="email"
                    defaultValue="triscu.cristian2@gmail.com"
                    autoComplete="email"
                    className={classes.inputs}
                    disableUnderline={true}
                    onChange={this.handleChange("email")}
                  />
                </FormControl>

                <FormControl required fullWidth margin="normal">
                  <InputLabel htmlFor="password" className={classes.labels}>
                    password
                  </InputLabel>
                  <Input
                    name="password"
                    defaultValue="Parola321"
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

                <Button
                  disabled={!this.isValid()}
                  disableRipple
                  fullWidth
                  variant="outlined"
                  className={classes.button}
                  type="submit"
                  onClick={this.submitSignIn}
                >
                  SIGN IN
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
      this.props.history.push({
        pathname: "/DashboardAuth",
        state: { email: this.state.email },
      });
      return <div></div>;
    }
  }
}

export default withRouter(withStyles(register)(Login));
