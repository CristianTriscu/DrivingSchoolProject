import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import server from "../../ServerName/ServerName"
import DialogTitle from "@material-ui/core/DialogTitle";
import { country_list } from "../Countries/Countries";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Typography } from "@material-ui/core";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function AppointmentFormv2(props) {
  const [open, setOpen] = React.useState(false);
  const [valueCountry, setValueCountry] = React.useState("");
  const [valueName, setValueName] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const MonthAsString = (date) => {
    const monthIndex = new Date(date).getMonth();
    return monthNames[monthIndex];
  };

  
  const handleChangeCountry = (e) => setValueCountry(e.target.value);
  const handleChangeName = (e) => setValueName(e.target.value);
  const handleChangeStartDate = (e) => setStartDate(e.target.value);
  const handleChangeEndDate = (e) => setEndDate(e.target.value);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleConfirm = async (e) => {
    // try {
    //   if (
    //     valueCountry === "" ||
    //     valueName === ""
        
    //   ) {
    //     alert("Complete all fields!");
    //     return;
    //   } else {
    //     e.preventDefault();
    //     const requestOptions = {
    //       method: "POST",
    //       body: JSON.stringify({
    //         name: valueName,
    //         country: valueCountry,
    //         month: MonthAsString(startDate) + " - " + MonthAsString(endDate),
    //       }),
    //     };
    //     const response = await fetch(server + "spot", requestOptions);
    //     const data = await response.json();

    //     if (data) {
    //       handleClose();
    //       alert("Succes!");
    //       props.loadData();
    //     } else {
    //       alert("Something is wrong!");
    //     }
    //   }
    // } catch (err) {
    //   alert(err.toString());
    // }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{marginTop:"1rem"}}variant="contained" color="secondary" onClick={handleClickOpen}>
         Solicită o ședință
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Solicită o ședință</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChangeName}
            autoFocus
            margin="dense"
            id="name"
            label="Nume complet"
            type="name"
            fullWidth
          />
          <div className="divider"></div>
         
         
          <Typography variant="h6" gutterBottom>
            Data exactă pentru ședință:
          </Typography>

          <TextField
            onClick={handleChangeStartDate}
            id="date"
            views={["month"]}
            label="dată începere"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
            <div className="divider"></div>
          <TextField
            onClick={handleChangeEndDate}
            id="date"
            label="dată finalizare"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Renunță
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Adaugă solicitare
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
