import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../Register/RegistrationStyles";
import { Button, Typography } from "@material-ui/core";
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core";
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
import { TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CreateGroupMenu from "./CreateGroupMenu";

const columns = [
  //   { id: "select", align: "center", maxWidth: 200 },
  //   {
  //     id: "id",
  //     label: "Id",
  //     minWidth: 10,
  //     align: "right",
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   { id: "last_name", label: "Nume", minWidth: 50, align: "right" },
  //   { id: "first_name", label: "Prenume", minWidth: 50, align: "right" },
  //   { id: "start_data", label: "Data înscrierii", minWidth: 50, align: "right" },
  //   {
  //     id: "category",
  //     label: "Categorie",
  //     minWidth: 170,
  //     align: "right",
  //   },
  //   {
  //     id: "CNP",
  //     label: "CNP",
  //     minWidth: 170,
  //     align: "right",
  //   },

  { id: "select", lalign: "right", maxWidth: 200 },

  {
    id: "id",
    label: "Id",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },

  {
    id: "name",
    label: "Denumire",
    minWidth: 10,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  // {
  //   id: "createdAt",
  //   label: "Denumire grupă",
  //   minWidth: 10,
  //   align: "right",
  //   format: (value) => value.toLocaleString("en-US"),
  // },
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
    id: "phone",
    label: "Telefon",
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
    id: "phone",
    label: "Telefon",
    minWidth: 170,
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
      serieCurenta: null,
      grupaCurenta: [],
      groups: [],
      currentGroupId: "",
      cursantiFaraGrupa: [],
      numeGrupaCurenta: "",
      inputText1: "",
      inputText2: "",
    };

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
      } catch (err) {
        console.log(err);
      }
    };

    this.removeFromGroup = async (id) => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(
          server + "/removeFromGroup/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          console.log("removed with succces");
        } else {
          console.log("bad request");
        }

        this.loadCursantiNeasignati(this.state.serieCurenta);
        this.loadClientiGrupaSelectata(this.state.currentGroupId);
      } catch (e) {
        console.log(e);
      }
    };

    this.addToGroup = async (id) => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ GroupId: this.state.currentGroupId }),
        };

        const response = await fetch(
          server + "addToGroup/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          console.log("added with succces");
        } else {
          console.log("bad request");
        }
        this.loadCursantiNeasignati(this.state.serieCurenta);
        this.loadClientiGrupaSelectata(this.state.currentGroupId);
      } catch (e) {
        console.log(e);
      }
    };

    this.handleFilterGroup = (e) => {
      this.setState({
        inputText1: e.target.value,
      });
      if (this.state.inputText1.length < 2) {
        //setData(initialDataFiltered);
        this.loadClientiGrupaSelectata(this.state.currentGroupId);
      } else {
        let clone = JSON.parse(JSON.stringify(this.state.grupaCurenta));
        const result = clone.filter((value) =>
          value.last_name.toString().includes(this.state.inputText1)
        );
        console.log(this.state.inputText);
        this.setState({
          grupaCurenta: result,
        });
      }
    };

    this.handleFilterUnassignedToGroups = (e) => {
      this.setState({
        inputText2: e.target.value,
      });
      if (this.state.inputText2.length < 2) {
        //setData(initialDataFiltered);
        this.loadCursantiNeasignati(this.state.serieCurenta);
      } else {
        let clone = JSON.parse(JSON.stringify(this.state.cursantiFaraGrupa));
        const result = clone.filter((value) =>
          value.last_name.toString().includes(this.state.inputText2)
        );

        this.setState({
          cursantiFaraGrupa: result,
        });
      }
    };
    this.loadGroups = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "GroupsBySeriesId/" + id,
          requestOptions
        );

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            groups: data,
          });
        } else if (id === null) {
          alert("alegeți o serie");
        } else {
          console.log("bad request");
        }
      } catch (err) {
        console.log(err);
      }
    };

    this.loadCursantiNeasignati = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "/ClientiFaraGrupaDinSerie/" + id,
          requestOptions
        );

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            cursantiFaraGrupa: data,
          });
        } else {
          console.log("bad request");
        }
      } catch (err) {
        console.log(err);
      }
    };

    this.loadClientiGrupaSelectata = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "ClientiDupaIdGrupa/" + id,
          requestOptions
        );

        const data = await response.json();
        if (response.status === 200) {
          this.setState({
            grupaCurenta: data,
          });
        } else {
          console.log("bad request");
        }

        console.log(this.state.grupaCurenta);
      } catch (err) {
        console.log(err);
      }
    };

    this.deleteGroup = async (id) => {
      try {
        const requestOptions = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "DeleteGroupsById/" + id,
          requestOptions
        );

        await response.json();
        if (response.status === 200) {
          this.loadGroups(this.state.serieCurenta);
        } else {
          console.log("bad request");
        }
      } catch (err) {
        console.log(err);
      }
    };

    this.handleChange = (name) => (e) => {
      this.setState({
        serieCurenta: e.target.value,
      });
      //console.log(this.state.serieCurenta);
      //this.loadGroups(this.state.serieCurenta-1);
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
      } catch (err) {
        alert(err.toString());
      }
    };
  }

  componentDidMount() {
    this.loadData();
    this.loadSeries();
  }
  render() {
    const { classes } = this.props;

    const client = JSON.parse(localStorage.getItem("client"));
    if (client.result.role === "admin") {
      return (
        <div
          id="registerBg"
          style={{ backgroundColor: "#4F527D", minHeight: "100vh" }}
        >
          <div className={classes.main}>
            <CssBaseline />

            <Paper className={classes.paper} style={{ minHeight: "100vh" }}>
              <br />
              <Button>Gestiunea grupelor</Button>
              <br />

              <Paper className={classes.root}>
                <div>
                  <FormControl style={{ minWidth: 300 }}>
                    <InputLabel id="demo-simple-select-label">
                      Alegeți o serie
                    </InputLabel>
                    <Select
                      defaultValue={""}
                      onChange={
                        this.handleChange("idSerie")
                        //this.loadGroups(this.state.serieCurenta)
                      }
                    >
                      {this.state.series.map((elem) => (
                        <MenuItem key={elem.id} value={elem.id}>
                          {elem.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    style={{ marginTop: "1rem", marginLeft: "1rem" }}
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      this.loadGroups(this.state.serieCurenta);
                      this.loadCursantiNeasignati(this.state.serieCurenta);
                    }}
                  >
                    Încarcă date
                  </Button>
                </div>

                <br></br>
                <TableContainer className={classes.container}>
                  <br />
                  <CreateGroupMenu
                    seriesId={this.state.serieCurenta}
                    loadGroups={this.loadGroups}
                  />
                  <br />
                  <br />
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
                      {this.state.groups
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
                                  <TableCell
                                    key={column.id}
                                    align={column.align}
                                  >
                                    {column.id === "select" ? (
                                      <div>
                                        <Button
                                          style={{ marginRight: "0.5rem" }}
                                          color="primary"
                                          variant="outlined"
                                          startIcon={<SelectAllIcon />}
                                          onClick={() => {
                                            this.loadClientiGrupaSelectata(
                                              row["id"]
                                            );
                                            this.setState({
                                              currentGroupId: row["id"],
                                              numeGrupaCurenta: row["name"],
                                            });
                                          }}
                                        >
                                          Selectează
                                        </Button>

                                        <Button
                                          color="secondary"
                                          variant="outlined"
                                          startIcon={<DeleteIcon />}
                                          onClick={() =>
                                            this.deleteGroup(row["id"])
                                          }
                                        >
                                          Șterge grupă
                                        </Button>
                                      </div>
                                    ) : null}
                                    {typeof value === "boolean" &&
                                    value === true
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
                  count={this.state.groups.length}
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
                      onChange={this.handleFilterGroup}
                    />
                    <Typography
                      className={classes.title}
                      variant="h6"
                      id="tableTitle"
                      align="center"
                    >
                      Componeță grupă {this.state.numeGrupaCurenta}
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
                            {this.state.grupaCurenta
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
                                              onClick={() => {
                                                this.removeFromGroup(row["id"]);
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
                        count={this.state.grupaCurenta.length}
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
                      onChange={this.handleFilterUnassignedToGroups}
                    />
                    <Typography
                      className={classes.title}
                      variant="h6"
                      id="tableTitle"
                      align="center"
                    >
                      Cursanți neasignați unei grupe
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
                            {this.state.cursantiFaraGrupa
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
                                              onClick={() =>
                                                this.addToGroup(row["id"])
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
                        count={this.state.cursantiFaraGrupa.length}
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
    } else {
      return (
        <div style={{ minHeight: "90vh" }}>
          <Typography variant="h2" style={{ paddingTop: "15rem" }}>
            Nu aveți acces la această funcționalitate.
          </Typography>
        </div>
      );
    }
  }
}
export default withStyles(register)(Series);
