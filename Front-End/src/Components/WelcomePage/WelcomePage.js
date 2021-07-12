import React, { useState, useEffect } from "react";
import "./WelcomePage.css";
import server from "../../ServerName/ServerName";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  },
  root2: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  },

  root3: {
    display: "-webkit-inline-box",
    flexWrap: "wrap",

    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(25),
      height: theme.spacing(6),
    },
  },
}));
export default function WelcomePage() {
  useEffect(() => {
    async function fetchData() {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(server + "mainPage", requestOptions);
        const data = await response.json();

        if (data) {
          setnoOfClients(data.nrOfClients);
          setNoOfEmployees(data.nrOfInstructors);
        } else console.log("404");
      } catch (err) {
        alert(err.toString());
      }
    }
    fetchData();
  }, []);
  const classes = useStyles();
  const [noOfClients, setnoOfClients] = useState(0);
  const [noOfEmployees, setNoOfEmployees] = useState(0);
  return (
    <div>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center justify-content-center text-center"></div>
        </div>
      </header>

      <section className="page-section bg-primary" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
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
              <h2 className="text-muted mb-4">
                Oferim servicii profesioniste pentru a pregăti șoferi
                responsabili și capabili să facă față provocărilor de zi cu zi
                din trafic.
              </h2>
              <hr className="style-two" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-section" id="services">
        <div className={classes.root2}>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/i605Qgv.png"}
              ></img>
            }{" "}
          </Paper>
          <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
            {
              <img
                alt="2"
                height="100%"
                width="100%"
                src={"https://i.imgur.com/t1KJ88g.png"}
              ></img>
            }{" "}
          </Paper>
        </div>
        <hr className="style-one" />
        <div className={classes.root3}>
          <Paper
            style={{
              backgroundColor: "#41395b",
              color: "white",
            }}
            elevation={3}
          >
            <div style={{ height: "0.7rem" }}></div>
            {noOfEmployees} instructori activi
          </Paper>
          <Paper
            style={{
              backgroundColor: "#41395b",
              color: "white",
            }}
            elevation={3}
          >
            <div style={{ height: "0.7rem" }}></div>
            {noOfClients} cursanți activi
          </Paper>
        </div>
        <hr className="style-one" />
        <div className="row">
          <div className="col-lg-6 col-md-6 text-center">
            <div className="col-lg-6 col-md-6 text-center"></div>
          </div>
        </div>
      </section>

      <section className="page-section bg-primary" id="contact">
        <div className="row justify-content-center">
          <div className={classes.root}>
            <Paper style={{ backgroundColor: "#41395b" }} elevation={3}>
              {" "}
              {
                <img
                  alt="2"
                  height="100%"
                  width="100%"
                  src={"https://i.imgur.com/qOYPlYZ.png"}
                ></img>
              }{" "}
            </Paper>
          </div>
          <hr className="style-two" />
          <h2 className="text-muted mb-5">
            Ești gata să obții permisul auto? Înregistrează-te și urmează pașii
            pentru a beneficia de serviciile noastre.
          </h2>
          <hr className="style-two" />
          <p className="text-muted mb-5"></p>
        </div>
        <div className="row">
          <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
            <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
            <div>
              <p className="text-muted mb-5">Contact:</p>
            </div>
            <div>
              <p className="text-muted mb-5">Telefon: +40751816395</p>
            </div>
            <div>
              <p className="text-muted mb-5">
                Email: triscu.cristian@gmail.com
              </p>
            </div>
          </div>
          <div className="col-lg-4 mr-auto text-center">
            <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
          </div>
        </div>
      </section>
    </div>
  );
}
