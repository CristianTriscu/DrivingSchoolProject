import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddBoxIcon from '@material-ui/icons/AddBox';
import { TextField } from "@material-ui/core";

import "date-fns";
import EditIcon from "@material-ui/icons/Edit";
import server from "../../ServerName/ServerName";
import { FormControl } from "@material-ui/core";

export default function CreateGroupMenu({ loadData, seriesId, loadGroups }) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (e) => setName(e.target.value);

  const handleChangeDate = (e) => {
    setDate(e.target.value);
  };

  const createGroup = async (id) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          name: name,
          seriesId:seriesId
          
        }),
      };
      const response = await fetch(server + "CreateGroupsBySeriesId/"+ id, requestOptions);

       await response.json();
      if (response.status === 200) {
        loadGroups(seriesId);
        handleClose();
      } else {
        console.log("bad request");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button
        style={{
          marginRight: "0.5rem",
          color:'green'
        }}
        
        variant="outlined"
        startIcon={<AddBoxIcon  />}
        onClick={handleClickOpen}
      >
        Adaugați o grupă nouă
      </Button>
      <br></br>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">datele seriei </DialogTitle>
        <DialogContent>
          <br></br>
          <div>
            <FormControl style={{ minWidth: 300 }}>
              <TextField
                onChange={handleChangeName}
                autoFocus
                margin="dense"
                id="name"
                label="Nume grupă"
                type="name"
                fullWidth
              />
              <br></br>
     
              <br />
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  createGroup(seriesId);
                }}
              >
                Aplică modificări!
              </Button>
              <Button color="secondary" onClick={() => handleClose()}>
                Renunța!
              </Button>
            </FormControl>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
