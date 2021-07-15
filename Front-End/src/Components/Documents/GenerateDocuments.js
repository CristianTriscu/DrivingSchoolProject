import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../Register/RegistrationStyles";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import server from "../../ServerName/ServerName";
import { Typography } from "@material-ui/core";
import DocSelector from "./DocSelector";
const columns = [
  { id: "doc", align: "right", minWidth: 50 },
  {
    id: "id",
    label: "Id",
    minWidth: 50,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  { id: "last_name", label: "Nume", minWidth: 100, align: "right" },
  { id: "first_name", label: "Prenume", minWidth: 100, align: "right" },
  {
    id: "phone",
    label: "Telefon",
    minWidth: 170,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "license_type",
    label: "Categorie Auto",
    minWidth: 100,
    align: "right",
    format: (value) => parseFloat(value).toFixed(2),
  },
  {
    id: "is_active",
    label: "este activ?",
    minWidth: 170,
    align: "right",
    format: (value) => value.toString(),
  },
  {
    id: "createdAt",
    label: "Data inscriere",
    minWidth: 170,
    align: "right",
    format: (value) => new Date(value).toLocaleDateString("RO"),
  },
];

class GenerateDocuments extends Component {
  constructor() {
    super();

    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: [],
      favPlaces: [],
      inputText: "",
    };

    this.handleFilter = (e) => {
      this.setState({
        inputText: e.target.value,
      });
      if (this.state.inputText.length < 2) {
        this.loadData();
      } else {
        let clone = JSON.parse(JSON.stringify(this.state.data));
        const result = clone.filter((value) =>
          value.last_name.toString().includes(this.state.inputText)
        );

        this.setState({
          data: result,
        });
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
      } catch (err) {
        alert(err.toString());
      }
    };
  }

  componentDidMount() {
    this.loadData();
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
              <Button /*onClick={() => generateContractScolarizare()}*/>
                Generați documente pentru cursantul selectat.
              </Button>
              <div className="divider"></div>
              <Paper className={classes.root}>
                <TextField
                  id="outlined-basic"
                  label="Caută după nume..."
                  variant="outlined"
                  onChange={this.handleFilter}
                />
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
                      {this.state.data
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
                                    {column.id === "doc" ? (
                                      <DocSelector
                                        clientId={row["id"]}
                                        category={row["license_type"]}
                                      />
                                    ) : null}
                                    {typeof value === "boolean" &&
                                    value === true
                                      ? value === true
                                        ? "DA"
                                        : "NU"
                                      : null}

                                    {column.format && typeof value === "number"
                                      ? !column.id === "id" ||
                                        !column.id === "createdAt"
                                        ? column.format(value)
                                        : value
                                      : column.id === "id" ||
                                        column.id === "createdAt"
                                      ? null
                                      : value}

                                    {column.id === "createdAt"
                                      ? column.format(value)
                                      : null}
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
                  count={this.state.data.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </Paper>
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
export default withStyles(register)(GenerateDocuments);
