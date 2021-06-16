import React, { useEffect,useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";

import "date-fns";
import { Typography } from "@material-ui/core";

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

const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 150,
  },
})(ListItem);

export default function WaitingList(props) {

//  data = data.filter((value) => value.state === "waiting");
  let initialClone = JSON.parse(JSON.stringify(props.data));
  let initialDataFiltered = initialClone.filter((value) => value.state === "waiting");
  let [data1, setData] = useState([])
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [counter, setCounter] = useState(0);
  let [search, setSearch] = useState("");


  const handleSearchChange = (e) => {
    handleFilter();
    setSearch(e.target.value);

  };

 

  const handleFilter = () => {
     if (search.length < 2 ) {
         setData(initialDataFiltered)
     } else {
       let clone = JSON.parse(JSON.stringify(props.data));
       const result = clone.filter((value) => value.title.includes(search));
       console.log(props.data);
       console.log(result);
       setData(result);

       //setCounter(Math.random())
       console.log(counter)
     }

  

  };

  const handleClickOpen = () => {
    setOpen(true);
    setData(initialDataFiltered)
  };



  const handleConfirm = async (e) => {
    try {
    } catch (err) {
      alert(err.toString());
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const acceptRequest = async (id) => {
    props.acceptRequest(id);
    setData(props.data);
    handleClose();
  };
  const denyRequest = async (id) => {
    props.deleteRequest(id);
    setData(props.data);
    handleClose();
  };

  const formatDate = (startDate, endDate) => {
    const dateToShow = new Date(startDate);
    const dateToShow2 = new Date(endDate);
    let minutes = null;
    let minutes2 = null;
    dateToShow.getMinutes() === 0
      ? (minutes = `${dateToShow.getMinutes()}${dateToShow.getMinutes()}`)
      : (minutes = dateToShow.getMinutes());
    dateToShow2.getMinutes() === 0
      ? (minutes2 = `${dateToShow2.getMinutes()}${dateToShow2.getMinutes()}`)
      : (minutes2 = dateToShow2.getMinutes());
    return `${dateToShow.toLocaleDateString()} ---- 
    ${dateToShow.getHours()}:${minutes} 
    - ${dateToShow2.getHours()}:${minutes2}`;
  };

  return (
  
    <div>
       <Button
        style={{ marginTop: "1rem" }}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        Lista de așteptare
      </Button>
      <br></br>
      <Button
        style={{ marginTop: "1rem" }}
        variant="contained"
        color="secondary"
        
      >
        Adaugă perioadă indisponibilă
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
       
      
      >
        <DialogTitle id="form-dialog-title">Lista de așteptare</DialogTitle>
        <DialogContent>
          <div>
            <List>
              <TextField
             
                onChange={handleSearchChange}
                name="search"
                id="search"
                label="Search..."
                variant="outlined"
              />
              {data1.map((elem) => (
                <ListItem>
                  <ListItemWithWiderSecondaryAction>
                    <ListItemAvatar>
                      <Avatar></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      style={{ width: 100 }}
                      primary={elem.title}
                      secondary={`${formatDate(elem.startDate, elem.endDate)}`}
                    ></ListItemText>

                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={() => acceptRequest(elem.id)}
                        aria-label="accept"
                      >
                        <CheckCircleIcon style={{ color: "green" }} />
                      </IconButton>
                      <IconButton
                        onClick={() => denyRequest(elem.id)}
                        aria-label="deny"
                      >
                        <CancelIcon style={{ color: "red" }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItemWithWiderSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
