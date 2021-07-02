import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../Register/RegistrationStyles";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import server from "../../ServerName/ServerName";
import { TextField } from "@material-ui/core";
const columns = [
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
    minWidth: 50,
    align: "right",
  },
  {
    id: "email",
    label: "Email",
    align: "right",
    minWidth: 50,
  },
  {
    id: "license_type",
    label: "Categorie",
    align: "right",
  },
];

class ClientsTable extends Component {
  constructor() {
    super();

    this.state = {
      page: 0,
      rowsPerPage: 10,
      data: [],
      inputText: "",
      employeeId:null

    };

    this.handleFilter = (e) => {
        this.setState({
          inputText: e.target.value,
        });
        if (this.state.inputText.length < 2) {
          //setData(initialDataFiltered);
          this.loadData(this.state.employeeId)
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
    this.loadData = async (id) => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(
          server + "ClientsByInstructorId/" + id,
          requestOptions
        );

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
    let employeeInfo = JSON.parse(localStorage.getItem("employeeInfo"));
    this.setState({
        employeeId:employeeInfo.id
    })
    this.loadData(employeeInfo.id);
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
            <Button>Tabel cursați înscriși la dumneavoastră</Button>
            <br />

            <Paper className={classes.root}>
              <br></br>
              <TextField
                    id="outlined-basic"
                    label="Caută după nume..."
                    variant="outlined"
                    onChange={this.handleFilter}
                  />
              <TableContainer className={classes.container}>
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
                                <TableCell key={column.id} align={column.align}>
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
            <br></br>
          </Paper>
        </div>
      </div>
    );
  }
}
export default withStyles(register)(ClientsTable);
