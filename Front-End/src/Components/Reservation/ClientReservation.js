import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withRouter } from "react-router-dom";
import { appointments } from "../../assets/dateProgramariTEST";
import { ViewState,EditingState,IntegratedEditing } from "@devexpress/dx-react-scheduler";
import { withStyles } from "@material-ui/core/styles";
import {
  Scheduler,
  DayView,
  Toolbar,
  DateNavigator,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  
} from "@devexpress/dx-react-scheduler-material-ui";

const styles = (theme) => ({
  container: {
    display: "flex",
    marginBottom: theme.spacing(2),
    justifyContent: "flex-end",
  },
  text: {
    ...theme.typography.h6,
    marginRight: theme.spacing(2),
  },

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
});

class ClientReservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: appointments,
      currentDate: "2018-06-27",
      locale: "en-US",
    };

    this.changeLocale = (event) =>
      this.setState({ locale: event.target.value });
      this.commitChanges = this.commitChanges.bind(this);
 
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }

  render() {
    const { classes } = this.props;
    const { data, currentDate, locale } = this.state;

    return (
      <div className={classes.bg}>
        <Paper>
          <Scheduler data={data} locale={locale} minHeight="100vh">
            <ViewState defaultCurrentDate={currentDate} />
            <EditingState  onCommitChanges={this.commitChanges} />
            
           
            <DayView startDayHour={7} endDayHour={20} />
            <Toolbar />
            <DateNavigator />
    
            <Appointments />
            
            <AppointmentTooltip></AppointmentTooltip>
           
            
           
            <AppointmentForm></AppointmentForm>
            <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <AppointmentForm />
          </Scheduler>
        </Paper>
      </div>
    );
  }
}
export default withStyles(styles)(withRouter(ClientReservation));
