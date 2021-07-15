import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DescriptionIcon from "@material-ui/icons/Description";
import "date-fns";
import { useEffect } from "react";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
import generateContractScolarizare from "./ContractDeScolarizare";
import generateDeclaratieProprieRaspundere from "./DeclaratieProprieRaspundere";
import generateCerereExaminare from "./CerereExaminare";
import generateFisaDeTransfer from "./FisaDeTransfer";
import generateAdeveritaRemorca from "./AdeverintaRemorca";
import generateAdeveritaOreSuplimentare from "./AdeverintaOraSuplimentare";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import generateFisaDeScolarizare from "./FisaDeScolarizare";
import server from "../../ServerName/ServerName";
const tipuriDocumente = [
  {
    id: 1,
    nume: "Contract de școlarizare",
  },
  {
    id: 2,
    nume: "Declarație pe proprie răspundere",
  },
  {
    id: 3,
    nume: "Cerere Examinare",
  },
  {
    id: 4,
    nume: "Fișa de transfer",
  },
  {
    id: 5,
    nume: "Adeveriță remorcă",
  },
  {
    id: 6,
    nume: "Adeverință ore suplimentare",
  },
  {
    id: 7,
    nume: "Fișă de școlarizare",
  },
];

export default function DocumentSelector(props) {
  //pe asta il folosesc ca sa iau datele pentru fiecare user si sa le pun in state si dupa in parametrii functiei de generare


  const [data, setData] = React.useState({});
  const [clientData, setClientData] = React.useState({});

  useEffect(() => {
    async function fetchData(id) {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "identityCardByClientId/" + id,
          requestOptions
        );

        const data = await response.json();
        if (data) {
          setData(data);
        }
      } catch (e) {
        console.log(e);
      }
    }

    async function fetchClientData(id) {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "clientsById/" + id,
          requestOptions
        );

        const data = await response.json();
        if (data) {
          setClientData(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData(props.clientId);
    fetchClientData(props.clientId);
  }, [props.clientId]);
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
        generateContractScolarizare(
          clientData.last_name,
          clientData.first_name,
          data.series,
          data.number,
          data.socialSecurityNumber,
          data.fatherName,
          data.motherName,
          props.category
        );
        break;
      case 2:
        generateDeclaratieProprieRaspundere(
          clientData.last_name,
          clientData.first_name,
          data.series,
          data.number,
          data.issuedBy,
          data.issuedDate,
          data.socialSecurityNumber,
          props.category
        );
        break;
      case 3:
        generateCerereExaminare(
          clientData.last_name,
          clientData.first_name,
          data.series,
          data.number,
          data.socialSecurityNumber,
          props.category,
          data.issuedBy,
          data.issuedDate,
          data.expirationDate
        );
        break;
      case 4:
        generateFisaDeTransfer(
          clientData.last_name,
          clientData.first_name,
          props.category,
          data.createdAt
        );
        break;
      case 5:
        generateAdeveritaRemorca(
          clientData.last_name,
          clientData.first_name,
          data.socialSecurityNumber,
        );
        break;
      case 6:
        generateAdeveritaOreSuplimentare(
          clientData.last_name,
          clientData.first_name,
          data.socialSecurityNumber,
        );
        break;
      case 7:
        generateFisaDeScolarizare(
          clientData.last_name,
          clientData.first_name,
          data.socialSecurityNumber,
          data.fatherName,
          data.motherName,
          data.series,
          data.number,
          data.issuedBy,
          data.issuedDate,
        );
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
        endIcon={<KeyboardArrowDownIcon />}
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
              <Button
                variant="outlined"
                color="primary"
                onClick={() => generateById(name)}
              >
                Generează acum
              </Button>
              <Button color="secondary" onClick={() => handleClose()}>
                Renunța
              </Button>
            </FormControl>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
