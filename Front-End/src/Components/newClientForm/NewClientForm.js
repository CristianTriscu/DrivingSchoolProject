import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { newClientFormStyles } from "../newClientForm/newClientFormStyles";

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

import CloseIcon from "@material-ui/icons/Close";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import FormLabel from "@material-ui/core/FormLabel";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import "../../../src/App.css";
import { withRouter } from "react-router-dom";
import { country_list } from "../Countries/Countries";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

class NewClientForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    fathersName: "",
    mothersName: "",
    previousName: "",
    phone: 0,
    email: "",
    sex: "",
    birthCountry: "",
    birthCounty: "",
    birthLocality: "",
    birthDate: new Date(),
    citizenship:"",
    
    residenceCountry: "",
    residenceCounty: "",
    residenceLocality: "",
    residenceStreet: "",
    buildingNr: "",
    entrance: "",
    floor: "",
    apartamentNr: "",

    //buletin
    type: "",
    series: 0,
    number: 0,
    identityCardissuedBy: "",
    identityCardissuedDate: new Date(),
    identityCardexpirationDate: new Date(),
    socialSecurityNumber: 0,

    //old license

    oldLicenseNumber: 0,
    oldLicenseissued: "",
    oldLicenseissuedDate: new Date(),
    oldLicenseexpirationDate: new Date(),

    hidePassword: true,
    error: null,
    errorOpen: false,
    isLoggedIn: false,
    hasLicense: "NU",
    instructorList: [],
    instructorId: -1,

    selectedDate: new Date(),
  };

  errorClose = (e) => {
    this.setState({
      errorOpen: false,
    });
  };

  handleBirthDateChange = (date) => {
    this.setState({
      birthDate: date,
    });
  };

  handleidentityCardissuedDate = (date) => {
    this.setState((prevState) => ({
      ...prevState,
      identityCardissuedDate: date,
    }));
  };

  handleidentityCardexpirationDate = (date) => {
    this.setState({
      identityCardexpirationDate: date,
    });
  };

  handleoldLicenseissuedDate = (date) => {
    this.setState({
      oldLicenseissuedDate: date,
    });
  };

  handleoldLicenseexpirationDate = (date) => {
    this.setState({
      oldLicenseexpirationDate: date,
    });
  };

  handleChange = (name) => (e) => {
    this.setState({
      [name]: e.target.value,
    });
  };

  async componentDidMount() {
    try {
      const requstOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(server + "employees", requstOptions);
      const data = await response.json();

      if (data) {
        this.setState({
          instructorList: data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  isValid = () => {
    if (
      this.state.email === "" ||
      this.state.last_name === "" ||
      this.state.first_name === "" ||
      this.state.mothersName === "" ||
      this.state.fathersName === "" ||
      this.state.previousName === "" ||
      this.state.phone === 0 ||
      this.state.sex === "" ||
      this.state.birthCountry === "" ||
      this.state.birthCounty === "" ||
      this.state.birthRegion === "" ||
      this.state.residenceCountry === "" ||
      this.state.residenceCounty === "" ||
      this.state.residenceLocality === "" ||
      this.state.residenceStreet === "" ||
      //buletin
      this.state.type === "" ||
      this.state.series === 0 ||
      this.state.number === 0 ||
      this.state.identityCardissuedBy === "" ||
      this.state.socialSecurityNumber === 0
    )
      return false;
    else return true;
  };
  submitSignIn = async (e) => {

    try {
      e.preventDefault();

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            last_name:this.state.last_name,
            first_name:this.state.first_name,
            previous_name:this.state.previousName,
            birth_date:this.state.birthDate,
            phone:this.state.phone,
            email:this.state.email,
            license_type:"B default",
            userId:this.props.history.location.state,
            instructorId:this.state.instructorId,
            is_active:false,

            type:this.state.type,
            series:this.state.series,
            number:this.state.number,
            issuedBy:this.state.identityCardissuedBy,
            issuedDate:this.state.identityCardissuedDate,
            expirationDate:this.state.identityCardexpirationDate,
            socialSecurityNumber:this.state.socialSecurityNumber,

            street:this.state.street+" "+this.state.buildingNr+" "+this.state.entrance+" "+this.state.floor+" "+this.state.apartamentNr,
            city:this.state.residenceLocality,
            county:this.state.residenceCounty,
            country:this.state.residenceCountry,
            zip_code:80300,//de revenit aici


            //si aici
            userRole:"client"
          })
      };
      const response = await fetch(server + "newClient", requestOptions);
      const data = await response.json();
      

     
     
      if (data.message==="Client registered with success") {
        this.setState({
          //TODO
            errorOpen:true,
            error:data.message
        })
      }
      else {
        this.setState({
          errorOpen: true,
          error: data.message
        })

      }
    }
    catch (err) {
    
      console.log(err)
    }


  };

  render() {
    //console.log(this.state.selectedDate)
    //console.log(this.state.instructorId);
    //console.log(this.state.sex);
    //console.log(this.state.tara);
    console.log(this.state);
    console.log("new client form props")
    console.log(this.props)
    
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
                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Date de identificare:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        onChange={this.handleChange("last_name")}
                        fullWidth
                        label="Nume"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        onChange={this.handleChange("first_name")}
                        fullWidth
                        label="Prenume"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("fathersName")}
                        label="Numele Tatalui"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("mothersName")}
                        label="Numele Mamei"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField fullWidth label="NR RNC" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("previousName")}
                        label="Nume din trecut (optional)"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <TextField
                        onChange={this.handleChange("phone")}
                        fullWidth
                        label="Telefon"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        onChange={this.handleChange("email")}
                        fullWidth
                        label="Email"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Container>

                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Locul nașterii:
                  </Typography>
                  <Grid container spacing={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} md={12} container>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Data nasterii"
                          value={this.state.selectedDate}
                          onChange={this.handleBirthDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

                    <FormControl style={{ paddingLeft: 10 }}>
                      <InputLabel style={{ paddingLeft: 10 }}>Sex</InputLabel>
                      <Select
                        defaultValue={''}
                        style={{ minWidth: 200 }}
                        onChange={this.handleChange("sex")}
                      >
                        <MenuItem value="masculin">Masculin</MenuItem>
                        <MenuItem value={"feminin"}>Feminin</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl style={{ paddingLeft: 10 }}>
                      <InputLabel style={{ paddingLeft: 10 }}>Tara</InputLabel>
                      <Select
                        defaultValue={''}
                        style={{ minWidth: 290 }}
                        onChange={this.handleChange("birthCountry")}
                        input={<Input />}
                      >
                        {country_list.map((name) => (
                          <MenuItem key={name} value={name}>
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Grid item xs={6} md={12}>
                      <TextField 
                      onChange={this.handleChange("birthCounty")}
                      fullWidth label="Judetul" variant="outlined" />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("birthLocality")}
                        label="Localitatea"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        label="Cetatenie"
                        onChange={this.handleChange("citizenship")}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Container>

                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Domiciliu/Resedinta:
                  </Typography>
                  <Grid container spacing={2}>

                  <Grid item xs={12} md={6}>
                      <TextField
                        onChange={this.handleChange("residenceCountry")}
                        fullWidth
                        label="Tara"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                        onChange={this.handleChange("residenceCounty")}
                        fullWidth
                        label="Judet/Sector"
                        variant="outlined"
                      />
                    </Grid>

                   
                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("residenceLocality")}
                        label="Localitate"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        onChange={this.handleChange("residenceStreet")}
                        fullWidth
                        label="Stada"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("buildingNr")}
                        fullWidth
                        label="Bloc"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("entrance")}
                        fullWidth
                        label="Scara"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("floor")}
                        fullWidth
                        label="Etaj"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("apartamentNr")}
                        fullWidth
                        label="Ap"
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                </Container>

                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Act de identitate:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <TextField
                        onChange={this.handleChange("type")}
                        fullWidth
                        label="BI/CI"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("series")}
                        fullWidth
                        label="Seria"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <TextField
                        onChange={this.handleChange("number")}
                        fullWidth
                        label="Numar"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <TextField
                        onChange={this.handleChange("socialSecurityNumber")}
                        fullWidth
                        label="CNP"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <TextField
                        fullWidth
                        onChange={this.handleChange("identityCardissuedBy")}
                        label="Eliberat de"
                        variant="outlined"
                      />
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} md={6} container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Eliberat in data de"
                          value={this.state.selectedDate}
                          onChange={this.handleidentityCardissuedDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} md={6} container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Valabil pana la data"
                          value={this.state.selectedDate}
                          onChange={this.handleidentityCardexpirationDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Container>

                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Situatie permis
                  </Typography>
                  <Grid container spacing={2}>
                    <FormControl
                      style={{ paddingLeft: 20, paddingTop: 20 }}
                      component="fieldset"
                    >
                      <FormLabel style={{ paddingTop: 20 }} component="legend">
                        Detineti deja permis pentru o categorie?
                      </FormLabel>
                      <RadioGroup
                        aria-label="Detineti deja permis pentru o categorie?"
                        name="gender1"
                        value={this.state.hasLicense}
                        onChange={this.handleChange("hasLicense")}
                      >
                        <FormControlLabel
                          value="DA"
                          control={<Radio />}
                          label="DA"
                        />
                        <FormControlLabel
                          value="NU"
                          control={<Radio />}
                          label="NU"
                        />
                      </RadioGroup>
                    </FormControl>

                    <Grid container spacing={2}>
                      <Grid item xs={6} md={3}>
                        <TextField
                          disabled={
                            this.state.hasLicense === "DA" ? false : true
                          }
                          fullWidth
                          label="Numar"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={6} md={6}>
                        <TextField
                          fullWidth
                          disabled={
                            this.state.hasLicense === "DA" ? false : true
                          }
                          label="Eliberat de "
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} md={6} container justify="space-around">
                        <KeyboardDatePicker
                          disableToolbar
                          disabled={
                            this.state.hasLicense === "DA" ? false : true
                          }
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Eliberat in data de"
                          value={this.state.selectedDate}
                          onChange={this.handleoldLicenseissuedDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid item xs={6} md={6} container justify="space-around">
                        <KeyboardDatePicker
                          disabled={
                            this.state.hasLicense === "DA" ? false : true
                          }
                          disableToolbar
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="Valabil pana la data de"
                          value={this.state.selectedDate}
                          onChange={this.handleoldLicenseexpirationDate}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </Grid>
                </Container>

                <Container>
                  <Typography
                    style={{ paddingTop: 20 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    Alege instructor dorit. Este posibil sa nu fiti distribuit
                    instructorului dorit in cazul in care instructorul are prea
                    multi cursanti activi.
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <FormControl style={{ minWidth: 300 }}>
                        <InputLabel id="demo-simple-select-label">
                          Nume instuctor
                        </InputLabel>
                        <Select
                          defaultValue={''}
                          onChange={this.handleChange("instructorId")}
                          // value={age}
                          //onChange={handleChange}
                        >
                          {this.state.instructorList.map((elem) => (
                            <MenuItem key={elem.id} value={elem.id}>
                              {elem.last_name + " " + elem.first_name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>

                  <Typography
                    style={{ paddingTop: 20, color: "red" }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    INAINTE DE A TRIMITE DATELE DUMNEAVOSTRA VA RUGAM SA
                    VERIFICATI CORECTITUDINEA ACESTORA PENTRU EVITAREA
                    EVENTUALELOR PROBLEME!
                  </Typography>
                </Container>
                <Button
                  disabled={!this.isValid()}
                  disableRipple
                  fullWidth
                  variant="outlined"
                  className={classes.button}
                  type="submit"
                  onClick={this.submitSignIn}
                >
                  Trimite cerere de inscriere!
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

export default withRouter(withStyles(newClientFormStyles)(NewClientForm));
