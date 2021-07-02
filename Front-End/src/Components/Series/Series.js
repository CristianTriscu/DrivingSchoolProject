import React, { Component } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../Register/RegistrationStyles";
import { Button, Typography } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import server from "../../ServerName/ServerName";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import CreateSeriesMenu from "./CreateSeriesMenu";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import UpdateSeriesMenu from "./UpdateSeriesMenu";
const columns = [
  { id: "select", align: "center", maxWidth: 200 },
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "name", label: "Denumire", minWidth: 50, align: "right" },
  { id: "start_date", label: "Data începere", minWidth: 50, align: "right" },
  {
    id: "no_of_clients",
    label: "Numar cursanti",
    minWidth: 170,
    align: "right",
  },
];

const columns2 = [
  { id: "select", align: "center", maxWidth: 200 },
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "last_name", label: "Nume", minWidth: 50, align: "right" },
  { id: "first_name", label: "Prenume", minWidth: 50, align: "right" },
  {
    id: "createdAt",
    label: "Data înscriere",
    minWidth: 170,
    align: "right",
  },
  {
    id: "moveRight",
  },
];

const columns3 = [
  {
    id: "moveLeft",
  },
  {
    id: "id",
    label: "Id",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "last_name", label: "Nume", minWidth: 50, align: "right" },
  { id: "first_name", label: "Prenume", minWidth: 50, align: "right" },
  {
    id: "createdAt",
    label: "Data înscriere",
    minWidth: 170,
    format: (value) => value.substring(0, 9),
    align: "right",
  },
];

class Series extends Component {
  constructor() {
    super();

    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: [],
      series: [],
      clientsFromSeries: [],
      clientsNotAssignedToSeries: [],
      currentSeriesId: null,
      inputText: "",
      inputText2:"",
      currentSeriesName:"",
    };

    this.handleFilter = (e) => {
      this.setState({
        inputText: e.target.value,
      });
      if (this.state.inputText.length < 2) {
       
        this.loadClientiSerieSelectata(this.state.currentSeriesId);
      } else {
        let clone = JSON.parse(JSON.stringify(this.state.clientsFromSeries));
        const result = clone.filter((value) =>
          value.last_name.toString().includes(this.state.inputText)
        );

        this.setState({
          clientsFromSeries: result,
        });
      }
    };

    this.handleFilter2 = (e) => {
      this.setState({
        inputText2: e.target.value,
      });
      if (this.state.inputText2.length < 2) {
       
        this.loadClientiFaraSerie();
      } else {
        let clone = JSON.parse(JSON.stringify(this.state.clientsNotAssignedToSeries));
        const result = clone.filter((value) =>
          value.last_name.toString().includes(this.state.inputText2)
        );

        this.setState({
          clientsNotAssignedToSeries: result,
        });
      }
    }
    this.loadSeries = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(server + "Series", requestOptions);

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            series: data,
          });
        } else {
          console.log("bad request");
        }
        console.log("serii aici");
        console.log(this.state.series);
      } catch (err) {
        console.log(err);
      }
    };

    this.loadClientiSerieSelectata = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "ClientsFromSeries/" + id,
          requestOptions
        );

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            clientsFromSeries: data,
          });
        } else {
          console.log("bad request");
        }

        console.log(this.state.clientsFromSeries);
      } catch (err) {
        console.log(err);
      }
    };

    this.addClientToSeries = async (id) => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ SeriesId: this.state.currentSeriesId }),
        };
        const response = await fetch(
          server + "addToSeries/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          this.loadClientiFaraSerie();
          this.loadClientiSerieSelectata(this.state.currentSeriesId);
        } else {
          console.log("bad request");
        }
      } catch (e) {
        console.log(e);
      }
    };

    this.removeFromSelectedSeries = async (id) => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "removeFromSeries/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          this.loadClientiFaraSerie();
          this.loadClientiSerieSelectata(this.state.currentSeriesId);
        } else {
          console.log("bad request");
        }
      } catch (e) {
        console.log(e);
      }
    };

    this.updateSeries = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "updateSeries/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
        } else {
          console.log("bad request");
        }
      } catch (err) {
        console.log(err);
      }
    };
    this.loadClientiFaraSerie = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "ClientsNotAsignedToSeries",
          requestOptions
        );

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            clientsNotAssignedToSeries: data,
          });
        } else {
          console.log("bad request");
        }
        console.log("clienti fara serie");
        console.log(this.state.clientsNotAssignedToSeries);
      } catch (err) {
        console.log(err);
      }
    };

    this.deleteSeries = async (id) => {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "deleteSeries/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          this.loadSeries();
        } else {
          console.log("bad request");
        }
      } catch (err) {
        console.log(err);
      }
    };

    this.loadData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(server + "clients", requestOptions);

        const data = await response.json();
        this.setState({
          data: data,
        });
        console.log("clienti aici");
        console.log(this.state.data);
      } catch (err) {
        alert(err.toString());
      }
    };
  }

  componentDidMount() {
    this.loadSeries();
    this.loadClientiFaraSerie();
    this.loadData();
  }
  render() {
    const { classes } = this.props;
    return (
      <div
        id="registerBg"
        style={{ backgroundColor: "#4F527D", minHeight: "100vh" }}
      >
        <div className={classes.main}>
          <CssBaseline />

          <Paper className={classes.paper} style={{ minHeight: "100vh" }}>
            <br />
            <Button>Gestiunea seriilor</Button>
            <br />
            <CreateSeriesMenu loadSeries={this.loadSeries} />
            <br />
            <Paper className={classes.root}>
              <Typography
                className={classes.title}
                variant="h6"
                id="tableTitle"
                align="center"
              >
                Serii
              </Typography>
              <br></br>
              <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.series
                      .slice(
                        this.state.page * this.state.rowsPerPage,
                        this.state.page * this.state.rowsPerPage +
                          this.state.rowsPerPage
                      )
                      .map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columns.map((column) => {
                              const value = row[column.id];

                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "select" ? (
                                    <div>
                                      <Button
                                        style={{ marginRight: "0.5rem" }}
                                        color="primary"
                                        variant="outlined"
                                        startIcon={<SelectAllIcon />}
                                        onClick={() => {
                                          this.loadClientiSerieSelectata(
                                            row["id"]
                                          );
                                          this.setState({
                                            currentSeriesId: row["id"],
                                            currentSeriesName:row["name"],
                                          });
                                        }}
                                      >
                                        Selectează
                                      </Button>
                                      <Button
                                        style={{
                                          marginRight: "0.5rem",
                                          color: "#ff784e",
                                        }}
                                      >
                                        <UpdateSeriesMenu
                                          loadData={this.loadData}
                                          loadSeries={this.loadSeries}
                                          seriesId={row["id"]}
                                        />
                                        <div className="divider"></div>
                                      </Button>
                                      <Button
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() =>
                                          this.deleteSeries(row["id"])
                                        }
                                        startIcon={<DeleteIcon />}
                                      >
                                        Șterge
                                      </Button>
                                    </div>
                                  ) : null}
                                  {typeof value === "boolean" && value === true
                                    ? value === true
                                      ? "DA"
                                      : "NU"
                                    : null}

                                  {column.format && typeof value === "number"
                                    ? !column.id === "id"
                                      ? column.format(value)
                                      : value
                                    : column.id === "id"
                                    ? null
                                    : value}
                                  {/* {column.id==='createdAt' ? 'column.format(value)':null} */}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={this.state.series.length}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
              />
            </Paper>
            <br></br>

            <div className="container">
              <div className="left">
                <Paper className={classes.paper}>
                  <TextField
                    id="outlined-basic"
                    label="Caută după nume..."
                    variant="outlined"
                    onChange={this.handleFilter}
                  />
                  <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    align="center"
                  >
                    Componeță serie {this.state.currentSeriesName}
                  </Typography>
                  <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns2.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.clientsFromSeries
                            .slice(
                              this.state.page * this.state.rowsPerPage,
                              this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns2.map((column) => {
                                    const value = row[column.id];

                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.id === "moveRight" ? (
                                          <Button
                                            startIcon={<ArrowForwardIcon />}
                                            clientId={row["id"]}
                                            onClick={() =>
                                              this.removeFromSelectedSeries(
                                                row["id"]
                                              )
                                            }
                                          ></Button>
                                        ) : null}
                                        {typeof value === "boolean" &&
                                        value === true
                                          ? value === true
                                            ? "DA"
                                            : "NU"
                                          : null}

                                        {column.format &&
                                        typeof value === "number"
                                          ? !column.id === "id"
                                            ? column.format(value)
                                            : value
                                          : column.id === "id"
                                          ? null
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={this.state.clientsFromSeries.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </Paper>
              </div>

              <div className="right">
                <Paper className={classes.paper}>
                <TextField
                    id="outlined-basic"
                    label="Caută după nume..."
                    variant="outlined"
                    onChange={this.handleFilter2}
                  />
                  <Typography
                    className={classes.title}
                    variant="h6"
                    id="tableTitle"
                    align="center"
                  >
                    Cursanți neasignați
                  </Typography>
                  <Paper className={classes.root}>
                    <TableContainer className={classes.container}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            {columns3.map((column) => (
                              <TableCell
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                              >
                                {column.label}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {this.state.clientsNotAssignedToSeries
                            .slice(
                              this.state.page * this.state.rowsPerPage,
                              this.state.page * this.state.rowsPerPage +
                                this.state.rowsPerPage
                            )
                            .map((row) => {
                              return (
                                <TableRow
                                  hover
                                  role="checkbox"
                                  tabIndex={-1}
                                  key={row.code}
                                >
                                  {columns3.map((column) => {
                                    const value = row[column.id];

                                    return (
                                      <TableCell
                                        key={column.id}
                                        align={column.align}
                                      >
                                        {column.id === "moveLeft" ? (
                                          <Button
                                            startIcon={<ArrowBackIcon />}
                                            clientId={row["id"]}
                                            onClick={() => {
                                              this.addClientToSeries(row["id"]);
                                            }}
                                          ></Button>
                                        ) : null}
                                        {typeof value === "boolean" &&
                                        value === true
                                          ? value === true
                                            ? "DA"
                                            : "NU"
                                          : null}

                                        {column.format &&
                                        typeof value === "number"
                                          ? !column.id === "id"
                                            ? column.format(value)
                                            : value
                                          : column.id === "id"
                                          ? null
                                          : value}
                                      </TableCell>
                                    );
                                  })}
                                </TableRow>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[10, 25, 100]}
                      component="div"
                      count={this.state.clientsNotAssignedToSeries.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Paper>
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}
export default withStyles(register)(Series);
