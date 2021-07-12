import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import MoreIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import TemporaryDrawer from "../TemporaryDrawer/TemporaryDrawer";
import server from "../../ServerName/ServerName";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import InfoIcon from "@material-ui/icons/Info";
import InputIcon from "@material-ui/icons/Input";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import { Paper } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles((theme) => ({
  root3: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    paddingLeft: theme.spacing(22),
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  },

  root: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  let usedId = 0;
  let clientInfo;
  let userInfo;
  let role;

  if(localStorage.getItem("client")){
  userInfo = JSON.parse(localStorage.getItem("client"))}

  if(localStorage.getItem("clientInfo")){
    clientInfo = JSON.parse(localStorage.getItem("clientInfo"));
    
    if(userInfo){
    role = userInfo.result.role}
    else 
    role = null;
  }

  
  if (clientInfo) {
    var clientId = clientInfo.id;
  }


  const employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
  if (employeeInfo) {
    var employeeId = employeeInfo.id;
  }

  if ( role==="client") usedId = clientId;
  else if (role==="instructor") usedId = employeeId;

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [noOfMessages, setNoOfMessages] = React.useState(0);
  const [isLoggedIn, setLogIn] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moveTo = (sectionName) => {
    let section = document.getElementById(sectionName);
    if (section === null) {
      if (sectionName === "about") {
        handleClickOpen();
        return;
      } else {
        handleClickOpen2();
        return;
      }
    }
    if (section) {
      section.scrollIntoView();
    } else {
      history.push("/");
      section.scrollIntoView();
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMessagesInbox = () => [history.push("/Messages")];

  const handleSignOut = () => {
    setLogIn(false);

    history.push("/DashboardNotAuth");
    localStorage.setItem("driverEmail", "");
    localStorage.setItem("client", "");
  };

  useEffect(() => {
    if (props !== null && props.isAuth === true) {
      setLogIn(true);
    }
    //verificare daca clientul e logat
    loadNumberOfMessages(usedId);
  }, [props, usedId]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const loadNumberOfMessages = async (id) => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(
        server + "getUnreadMessages/" + id,
        requestOptions
      );
      const data = await response.json();
      if (data) {
        setNoOfMessages(data.length);
      }
    } catch (e) {
      console.log(e);
    }
  };

  

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
     
      <MenuItem onClick={handleSignOut}>
        <ExitToAppIcon /> Deconectare
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenuNotLogged = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          moveTo("about");
        }}
      >
        <IconButton color="inherit">
          <Badge color="secondary">
            <InfoIcon />
          </Badge>
        </IconButton>
        <p>Despre</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          moveTo("contact");
        }}
      >
        <IconButton color="inherit">
          <Badge color="secondary">
            <ContactPhoneIcon />
          </Badge>
        </IconButton>
        <p>Contact</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/Register")}>
        <IconButton aria-label="Create an account" color="inherit">
          <Badge color="secondary">
            <MeetingRoomIcon />
          </Badge>
        </IconButton>
        <p>Înregistrare</p>
      </MenuItem>
      <MenuItem onClick={() => history.push("/SignIn")}>
        <IconButton aria-label="Sign In" color="inherit">
          <InputIcon />
        </IconButton>
        <p>Conectare</p>
      </MenuItem>
    </Menu>
  );
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMessagesInbox}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={noOfMessages} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

    
      <MenuItem onClick={handleSignOut}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon />
        </IconButton>
        <p>Deconectare</p>
      </MenuItem>
    </Menu>
  );
  // daca e user-ul e logat afisam iconita de profil, de mesaje si de notificari daca nu apar optiunile de SignIn si SignUp
  if (isLoggedIn) {
    return (
      <div className={classes.grow}>
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <div className={classes.root}>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/kVe31I1.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/mFlx0B5.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/ckgO7dt.png"}
                  ></img>
                }{" "}
              </Paper>
              <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                {" "}
                {
                  <img
                    alt="2"
                    height="100%"
                    width="100%"
                    src={"https://i.imgur.com/poC7jzf.png"}
                  ></img>
                }{" "}
              </Paper>
            </div>
            <hr className="style-two" />
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleClose} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <AppBar style={{ backgroundColor: "#282A36" }} position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <Badge>
                <TemporaryDrawer></TemporaryDrawer>
              </Badge>
            </IconButton>

            <Typography
              onClick={() => {
                history.push("/auth");
              }}
              className={classes.title}
              variant="h6"
              noWrap
            >
              Școala de șoferi online
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="show 4 new mails"
                color="inherit"
                onClick={handleMessagesInbox}
              >
                <Badge badgeContent={noOfMessages} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    );
  } else {
    return (
      <div className={classes.grow}>
        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open2}
            onClose={handleClose2}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Despre noi"}
            </DialogTitle>
            <DialogContent>
              <div className={classes.root3}>
                <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                  {" "}
                  {
                    <img
                      alt="2"
                      height="100%"
                      src={"https://i.imgur.com/qOYPlYZ.png"}
                    ></img>
                  }{" "}
                </Paper>
              </div>

              <h2 style={{ color: "black" }}>
                Ești gata să obții permisul auto? Înregistrează-te și urmează
                pașii pentru a beneficia de serviciile noastre.
              </h2>
              <div style={{ textAlign: "center" }}>
                <h3>Contact:</h3>
                <h2>Email: triscu.cristian@gmail.com</h2>
                <h2>Telefon: +40751816395</h2>
              </div>

              <div></div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="secondary" autoFocus>
                Închide
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <div>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Despre noi"}
            </DialogTitle>
            <DialogContent>
              <div className={classes.root}>
                <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                  {
                    <img
                      alt="2"
                      height="100%"
                      width="100%"
                      src={"https://i.imgur.com/kVe31I1.png"}
                    ></img>
                  }{" "}
                </Paper>
                <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                  {
                    <img
                      alt="2"
                      height="100%"
                      width="100%"
                      src={"https://i.imgur.com/mFlx0B5.png"}
                    ></img>
                  }{" "}
                </Paper>
                <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                  {
                    <img
                      alt="2"
                      height="100%"
                      width="100%"
                      src={"https://i.imgur.com/ckgO7dt.png"}
                    ></img>
                  }{" "}
                </Paper>
                <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
                  {" "}
                  {
                    <img
                      alt="2"
                      height="100%"
                      width="100%"
                      src={"https://i.imgur.com/poC7jzf.png"}
                    ></img>
                  }{" "}
                </Paper>
                <h2
                  style={{
                    color: "black",
                    width: "100%",
                    textAlign: "justify",
                  }}
                >
                  Oferim servicii profesioniste pentru a pregăti șoferi
                  responsabili și capabili să facă față provocărilor de zi cu zi
                  din trafic.
                </h2>
              </div>
              <hr className="style-two" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary" autoFocus>
                Închide
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        <AppBar style={{ backgroundColor: "#282A36" }} position="static">
          <Toolbar>
            <Typography
              onClick={() => history.push("/")}
              className={classes.title}
              variant="h6"
              noWrap
            >
              Școala de șoferi online
            </Typography>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Button
                style={{ backgroundColor: "#343746", color: "white" }}
                variant="contained"
                onClick={() => {
                  moveTo("contact");
                }}
              >
                Contact
              </Button>

              <div className="divider"></div>

              <Button
                style={{ backgroundColor: "#343746", color: "white" }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  moveTo("about");
                }}
              >
                Despre
              </Button>

              <div className="divider"></div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => history.push("/SignIn")}
              >
                Conectare
              </Button>
              <div className="divider"></div>

              <Button
                style={{ backgroundColor: "#343746", color: "white" }}
                variant="outlined"
                color="inherit"
                onClick={() => history.push("/Register")}
              >
                Înregistrare
              </Button>

              <div className="divider"></div>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenuNotLogged}
      </div>
    );
  }
}
