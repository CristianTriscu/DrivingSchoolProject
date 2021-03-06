import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import server from "../../ServerName/ServerName";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import "date-fns";

export default function UnavailablePeriodForm(props) {
  const [open, setOpen] = React.useState(false);
  const [valueName, setValueName] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2018-06-27T10:00:00")
  );
  const [selectedDate2, setSelectedDate2] = React.useState(
    new Date("2018-06-27T11:00:00")
  );

  
  console.log(props);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedDate2(date);
  };
  const handleDate1Change = (date) => {
    setSelectedDate(date);
  };
  const handleDate2Change = (date) => {
    setSelectedDate2(date);
  };
  const handleChangeName = (e) => setValueName(e.target.value);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = async (e) => {
    try {
      if (selectedDate2 === "" || selectedDate === "" || valueName === "") {
        alert("Complete all fields!");
        return;
      } else {
        e.preventDefault();
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: valueName,
            employeeId: props.employeeId,
            startDate: new Date(selectedDate).toString(),
            endDate: new Date(selectedDate2).toString(),
            ClientId: null,
            service_id: 1,
            vehicle_id: 99,
           
          }),
        };
        const response = await fetch(server + "unavailablePeriod", requestOptions);
        const data = await response.json();
        console.log(data);
        if (data) {
          handleClose();
          alert("Succes!");
          props.loadData(props.employeeId);
        } else {
          console.log("Something is wrong!");
        }
      }
    } catch (err) {
      alert(err.toString());
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginTop: "1rem" }}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        Adauga perioada indisponibil??
      </Button>

      <Button
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
        variant="contained"
        color="primary"
        onClick={() => props.loadData(props.employeeId)}
      >
        Re??ncarca date
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Adaug?? perioad?? indisponibil??</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChangeName}
            autoFocus
            margin="dense"
            id="name"
            label="Motiv(optional)"
            type="name"
            fullWidth
          />
          <div className="divider"></div>

          <Typography variant="h6" gutterBottom>
            Data ??i intervalul indisponibil
          </Typography>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Data ??edin??ei"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
            <div className="divider"></div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker-final"
              label="Or?? incepere"
              value={selectedDate}
              onChange={handleDate1Change}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
            <div className="divider"></div>
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Or?? finalizare"
              value={selectedDate2}
              onChange={handleDate2Change}
              KeyboardButtonProps={{
                "aria-label": "change time",
              }}
            />
          </MuiPickersUtilsProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Renun????
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Adaug?? solicitare
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
