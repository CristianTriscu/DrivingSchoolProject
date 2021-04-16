import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  MonthView,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  EditRecurrenceMenu,
  DayView,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import { clientDetails } from "../../App";
import AppointmentFormv2 from "./AppointmentFormv2";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import AppointmentFormContainer from "./AppointmentForm";
import { appointments } from "../../assets/dateProgramariTEST";
import server from "../../ServerName/ServerName"

console.log(appointments)

const styles = (theme) => ({
  addButton: {
    bottom: theme.spacing(1) * 2,
    left: "35vw",
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

const CustomAppointment = ({ style, ...restProps }) => {
  if (restProps.data.state === "unavailable")
    return (
      <Appointments.Appointment
        {...restProps}
        style={{ ...style, backgroundColor: "red" }}
        className="unavailable"
      />
    );
  if (restProps.data.state === "accepted")
    return (
      <Appointments.Appointment
        {...restProps}
        style={{ ...style, backgroundColor: "green" }}
        className="accepted"
      />
    );
  return (
    <Appointments.Appointment
      {...restProps}
      
      style={{ ...style, backgroundColor: "orange" }}
      className="waiting"
    ></Appointments.Appointment>
  );
};

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentViewName: "Day",
      currentDate: "2018-06-27",
      confirmationVisible: false,
      editingFormVisible: false,
      deletedAppointmentId: undefined,
      editingAppointment: undefined,
      previousAppointment: undefined,
      addedAppointment: {},
      startDayHour: 7,
      endDayHour: 20,
      isNewAppointment: false,
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility = this.toggleEditingFormVisibility.bind(
      this
    );
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };

    this.loadData = async (instructorId) => {
      try{
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
        const response = await fetch(server+"reservationsaAndrequestsByInstructor/"+instructorId,requestOptions);
        const data = await response.json();
  
        if(data){
          this.setState({
            data:data
          })
          console.log(data)
        }else
        console.log("ceva nu e bine")
      }
      catch(err){
        alert(err.toString());
      }
  
    };
  

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange = this.onEditingAppointmentChange.bind(
      this
    );
    this.onAddedAppointmentChange = this.onAddedAppointmentChange.bind(this);
    this.appointmentForm = connectProps(AppointmentFormContainer, () => {
      const {
        editingFormVisible,
        editingAppointment,
        data,
        addedAppointment,
        isNewAppointment,
        previousAppointment,
      } = this.state;

      const currentAppointment =
        data.filter(
          (appointment) =>
            editingAppointment && appointment.id === editingAppointment.id
        )[0] || addedAppointment;
      const cancelAppointment = () => {
        if (isNewAppointment) {
          this.setState({
            editingAppointment: previousAppointment,
            isNewAppointment: false,
          });
        }
      };

      return {
        visible: editingFormVisible,
        appointmentData: currentAppointment,
        commitChanges: this.commitChanges,
        visibleChange: this.toggleEditingFormVisibility,
        onEditingAppointmentChange: this.onEditingAppointmentChange,
        cancelAppointment,
      };
    });
  }

  componentDidMount(){
    this.loadData(6);
  }
 
  componentDidUpdate() {
    this.appointmentForm.update();
  }

  onEditingAppointmentChange(editingAppointment) {
    this.setState({ editingAppointment });
  }

  onAddedAppointmentChange(addedAppointment) {
    this.setState({ addedAppointment });
    const { editingAppointment } = this.state;
    if (editingAppointment !== undefined) {
      this.setState({
        previousAppointment: editingAppointment,
      });
    }
    this.setState({ editingAppointment: undefined, isNewAppointment: true });
  }

  setDeletedAppointmentId(id) {
    this.setState({ deletedAppointmentId: id });
  }

  toggleEditingFormVisibility() {
    const { editingFormVisible } = this.state;
    this.setState({
      editingFormVisible: !editingFormVisible,
    });
  }

  toggleConfirmationVisible() {
    const { confirmationVisible } = this.state;
    this.setState({ confirmationVisible: !confirmationVisible });
  }

  commitDeletedAppointment() {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  }

  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        this.setDeletedAppointmentId(deleted);
        this.toggleConfirmationVisible();
      }
      return { data, addedAppointment: {} };
    });
  }

  render() {
    console.log(clientDetails);
    const {
      currentDate,
      data,
      confirmationVisible,
      editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.bg}>
        <Paper>
          <Scheduler data={data} locale={"en-US"} minHeight="100vh">
            <AppointmentFormv2></AppointmentFormv2>
            <ViewState
              currentDate={currentDate}
              currentViewName={this.state.currentViewName}
              onCurrentViewNameChange={this.currentViewNameChange}
              onCurrentDateChange={this.currentDateChange}
            />
            <EditingState
              onCommitChanges={this.commitChanges}
              onEditingAppointmentChange={this.onEditingAppointmentChange}
              onAddedAppointmentChange={this.onAddedAppointmentChange}
            />
            <DayView startDayHour={startDayHour} endDayHour={endDayHour} />
            <WeekView startDayHour={startDayHour} endDayHour={endDayHour} />

            <EditRecurrenceMenu />
            <Appointments appointmentComponent={CustomAppointment} />
            
            {/*de revenit aici*/}
            <AppointmentTooltip
              showOpenButton
              showCloseButton
              showDeleteButton
            />
            <Toolbar />
            <DateNavigator></DateNavigator>
            <ViewSwitcher />

            {clientDetails.result.role === "client"
              ? // <AppointmentForm
                //   overlayComponent={this.appointmentForm}
                //   visible={editingFormVisible}
                //   onVisibilityChange={this.toggleEditingFormVisibility}
                // />
                null
              : null}
          </Scheduler>

          <Dialog open={confirmationVisible} onClose={this.cancelDelete}>
            <DialogTitle>Delete Appointment</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this appointment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.toggleConfirmationVisible}
                color="primary"
                variant="outlined"
              >
                Cancel
              </Button>
              <Button
                onClick={this.commitDeletedAppointment}
                color="secondary"
                variant="outlined"
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          <Fab
            color="secondary"
            className={classes.addButton}
            onClick={() => {
              this.setState({ editingFormVisible: true });
              this.onEditingAppointmentChange(undefined);
              this.onAddedAppointmentChange({
                startDate: new Date(currentDate).setHours(startDayHour),
                endDate: new Date(currentDate).setHours(startDayHour + 1),
              });
            }}
          >
            <AddIcon />
          </Fab>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { name: "EditingDemo" })(Demo);
