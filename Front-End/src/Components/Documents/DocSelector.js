import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import DescriptionIcon from "@material-ui/icons/Description";
import "date-fns";
import { Typography } from "@material-ui/core";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import generateContractScolarizare from "./ContractDeScolarizare"
import generateDeclaratieProprieRaspundere from "./DeclaratieProprieRaspundere"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
const tipuriDocumente = [
  {
    id: 1,
    nume: "Contract de școlarizare",
  },
  {
    id: 2,
    nume: "Declarație pe proprie răspundere",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export default function DocumentSelector(props) {
    //pe asta il folosesc ca sa iau datele pentru fiecare user si sa le pun in state si dupa in parametrii functiei de generare
    console.log("props aici")
    console.log(props.clientId);

  let [data1, setData] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState(-1);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (name) => (e) => {
    setName(e.target.value);
  };

  const generateById = (id) => {
    switch (id) {
      case 1:
        generateContractScolarizare();
        break;
      case 2:
        generateDeclaratieProprieRaspundere();
        break;
    
      default:
        alert("alegeti un tip document!");
    }
  };

  return (
    <div>
      <Button
        style={{ marginTop: "1rem" }}
        variant="outlined"
        startIcon={<DescriptionIcon />}
        endIcon={<KeyboardArrowDownIcon/>}
        onClick={handleClickOpen}
      ></Button>
      <br></br>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Generare document</DialogTitle>
        <DialogContent>
          <br></br>
          <div>
            <FormControl style={{ minWidth: 300 }}>
              <InputLabel id="demo-simple-select-label">
                Denumire document
              </InputLabel>
              <Select
                defaultValue={""}
                onChange={handleChange("instructorId")}
                // value={age}
                //onChange={handleChange}
              >
                {tipuriDocumente.map((elem) => (
                  <MenuItem key={elem.id} value={elem.id}>
                    {elem.nume}
                  </MenuItem>
                ))}
              </Select>
              <br></br>
              <Button  variant='outlined' color='primary' onClick={()=>generateById(name)}>Generează acum</Button>
              <Button  color='secondary' onClick={()=>handleClose()}>Renunța</Button>
            </FormControl>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
