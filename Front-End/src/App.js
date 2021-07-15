import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, useLocation } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import Navbar from "./Components/Navbar/Navbar";
import Profile from "./Components/Profile/Profile";
import Register from "./Components/Register/Register";
import Login from "./Components/LogIn/Login";
import Dashboard from "./Components/DashBoard/DashBoard";
import NewClientForm from "./Components/newClientForm/NewClientForm";
import Footer from "./Components/Footer/Footer";
import ParcAuto from "./Components/ParcAuto/ParcAuto";
import ClientReservation from "./Components/Reservation/ClientReservation";
import MsgInbox from "./Components/Messages/MsgInbox";
import GenerateDocuments from "./Components/Documents/GenerateDocuments";
import Series from "./Components/Series/Series";
import Groups from "./Components/Groups/Groups";
import ClientsTable from "./Components/ClientsTable/ClientsTable";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const { hash } = useLocation();

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [hash]);

 
  const [open, setOpen] = React.useState(true);



  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar />
                <WelcomePage />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/auth"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <WelcomePage /> <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Reservation"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <ClientReservation />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Documents"
          exact={true}
          component={() => {
            return (
              <div className="App">
                <Navbar isAuth={true} />
                <GenerateDocuments />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Series"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <Series />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Groups-Series"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <Groups />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Register"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar />
                <Register />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/SignIn"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar />
                <Login />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/DashboardAuth"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <div>
                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      V-ați autentificat cu succes!
                    </Alert>
                  </Snackbar>
                </div>
                <Dashboard />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/DashboardNotAuth"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={false} />
                <WelcomePage />
              </div>
            );
          }}
        />

        <Route
          path="/newClientForm"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <NewClientForm />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Profile"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <Profile />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/ParcAuto"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <ParcAuto />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/ClientsTable"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <ClientsTable />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/Messages"
          exact={true}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={true} />
                <MsgInbox />
                <Footer />
              </div>
            );
          }}
        />

        <Route
          path="/-about"
          exact={true}
          render={() => document.getElementById("about").scrollIntoView()}
          component={() => {
            return (
              <div className="App">
                {" "}
                <Navbar isAuth={false} />
                <WelcomePage />
                <Footer />
              </div>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
