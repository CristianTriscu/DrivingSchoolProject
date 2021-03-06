import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  Toolbar,
  WeekView,
  ViewSwitcher,
  Appointments,
  AppointmentTooltip,
  EditRecurrenceMenu,
  DayView,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { connectProps } from "@devexpress/dx-react-core";
import AppointmentFormv2 from "./AppointmentFormv2";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AppointmentFormContainer from "./AppointmentForm";
import server from "../../ServerName/ServerName";
import WaitingList from "./WaitingList";
import { Typography } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import UnavailablePeriodForm from "./UnavailablePeriodForm";

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
    marginBottom: 2,
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

// const Header = withStyles(style, { name: "Header" })(
//   ({ appointmentData, ...restProps }) => (
//     <AppointmentTooltip.Header {...restProps} appointmentData={appointmentData}>
//       {clientDetails.result.role === "client" ? (
//         <div>
//           <IconButton
//             /* eslint-disable-next-line no-alert */
//             onClick={() => alert("accepted")}
//           >
//             <CheckCircleIcon />
//           </IconButton>
//           <IconButton
//             /* eslint-disable-next-line no-alert */
//             onClick={() => alert("denied")}
//           >
//             <HighlightOffIcon />
//           </IconButton>
//         </div>
//       ) : (
//         <IconButton
//           /* eslint-disable-next-line no-alert */
//           onClick={() => alert("implementeaza delete")}
//         >
//           <DeleteIcon />
//         </IconButton>
//       )}
//     </AppointmentTooltip.Header>
//   )
// );

const CustomAppointment = ({ style, ...restProps }) => {
  if (restProps.data.state === "unavailable")
    return (
      <Appointments.Appointment
        {...restProps}
        style={{ ...style, backgroundColor: "red" }}
        className="unavailable"
      ></Appointments.Appointment>
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
      employeeInfo: {},
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
      employeeId: 0,
    };

    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.toggleConfirmationVisible = this.toggleConfirmationVisible.bind(this);
    this.commitDeletedAppointment = this.commitDeletedAppointment.bind(this);
    this.toggleEditingFormVisibility =
      this.toggleEditingFormVisibility.bind(this);
    this.currentDateChange = (currentDate) => {
      this.setState({ currentDate });
    };

    this.loadData = async (instructorId) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "reservationsaAndrequestsByInstructor/" + instructorId,
          requestOptions
        );
        const data = await response.json();

        if (data) {
          this.setState({
            data: data,
          });
        } else console.log("connot load data");
      } catch (err) {
        alert(err.toString());
      }
    };

    this.loadEmployeeData = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          header: { "Content-Type": "application/json" },
        };
        const request = await fetch(server + "employees/" + id, requestOptions);
        const data = await request.json();
        if (data) {
          this.setState({
            employeeInfo: data,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    this.commitChanges = this.commitChanges.bind(this);
    this.onEditingAppointmentChange =
      this.onEditingAppointmentChange.bind(this);
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

  componentDidMount() {
    const client = JSON.parse(localStorage.getItem("client"));
    // this.loadEmployeeData(6);
    // this.loadData(6);

    if (client.result.role === "client") {
      const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
    
      this.loadEmployeeData(clientInfo.employeeId);
      this.loadData(clientInfo.employeeId);
    } else {
      const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
    
      this.loadEmployeeData(employeeInfo.id);
      this.loadData(employeeInfo.id);
    }

    // if (clientDetails.result.role === "client") {
    //   this.loadEmployeeData(clientInfo.employeeId);
    //   this.loadData(clientInfo.employeeId);
    // } else {
    //   this.loadData(employeeInfo.id);
    // }
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

  DeleteAppointmentById = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(server + "requests/" + id, requestOptions);
      const data = await response.json();

      if (data.message === "deleted" && response.status === 200) {
        this.loadData(this.state.employeeInfo.id);
      } else {
        alert("Server error");
      }
    } catch (e) {
      console.log(e);
    }
  };

  acceptRequest = async (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "makeRequestReservation/" + id,
        requestOptions
      );
      const data = await response.json();

      if (data.message === "accepted" && response.status === 200) {
        this.loadData(this.state.employeeId);
      } else {
        alert("Server error");
      }
    } catch (e) {
      console.log(e);
    }
  };

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

  commitDeletedAppointment = async () => {
    this.setState((state) => {
      const { data, deletedAppointmentId } = state;

      this.DeleteAppointmentById(deletedAppointmentId);
      const nextData = data.filter(
        (appointment) => appointment.id !== deletedAppointmentId
      );

      return { data: nextData, deletedAppointmentId: null };
    });
    this.toggleConfirmationVisible();
  };

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
    const clientDetails = JSON.parse(localStorage.getItem("client"));
    //const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
    const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
    
    const clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
    
    const {
      currentDate,
      data,
      confirmationVisible,
      //editingFormVisible,
      startDayHour,
      endDayHour,
    } = this.state;
    const { classes } = this.props;

    if (Object.keys(clientInfo).length === 0) {
      return (
        <div style={{ minHeight: "90vh" }}>
          <Typography variant="h2" style={{ paddingTop: "15rem" }}>
            ??nc?? nu ave??i acces la aceast?? func??ionalitate.
          </Typography>
        </div>
      );
    } else {
      return (
        <div className={classes.bg}>
          {clientDetails.result.role === "client" ? (
            <Paper className={classes.paper}>
              <Typography>{`Bun venit, ${"Cristian"} ${"Triscu"}!`}</Typography>
              <Typography>{`Pute??i folosi urm??toarea rubric?? pentru a solicita o ??edin????`}</Typography>
              <Typography displayInline variant="h8" color="primary">
                {`Instructor: ${this.state.employeeInfo.first_name} ${this.state.employeeInfo.last_name} `}
                <span itemprop="telephone">
                  <Button
                    style={{ marginLeft: "1rem", backgroundColor: "#9B9DC0" }}
                  >
                    <CallIcon color="primary" />
                    <div style={{ width: "0.3rem" }}></div>
                    <a href="tel:123-456-7890">
                      {this.state.employeeInfo.phone}
                    </a>
                  </Button>
                </span>
              </Typography>
            </Paper>
          ) : (
            <Paper className={classes.paper}>
              <Typography>{`Bun venit, ${employeeInfo.last_name} ${employeeInfo.first_name}`}</Typography>
              <Typography variant="h8" color="secondary">
                Accesa??i lista de a??teptare pentru a accepta/respinge
                solicitarile cursan??ilor
              </Typography>
            </Paper>
          )}
          <Paper>
            <Scheduler data={data} locale={"en-US"} minHeight="100vh">
              {clientDetails.result.role === "client" ? (
                <AppointmentFormv2 
                employeeId={this.state.employeeInfo.id}
                loadData={this.loadData}></AppointmentFormv2>
              ) : (
                <div>
                  <WaitingList
                    employeeId={this.state.employeeInfo.id}
                    acceptRequest={this.acceptRequest}
                    deleteRequest={()=>this.DeleteAppointmentById(this.state.deletedAppointmentId)}
                    data={data}
                  ></WaitingList>
                  <br></br>
                  <UnavailablePeriodForm
                    employeeId={this.state.employeeInfo.id}
                    loadData={this.loadData}
                  />
                </div>
              )}

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
              <Appointments
                loadData={this.loadData}
                appointmentComponent={CustomAppointment}
              />

              {!clientDetails.result.role === "client" ? (
                <AppointmentTooltip
                  showDeleteButton
                  showCloseButton
                ></AppointmentTooltip>
              ) : (
                <AppointmentTooltip
                  showCloseButton
                  showDeleteButton
                ></AppointmentTooltip>
              )}
              <Toolbar />
              <DateNavigator></DateNavigator>
              <ViewSwitcher />
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
          </Paper>
        </div>
      );
    }
  }
}

export default withStyles(styles, { name: "EditingDemo" })(Demo);
