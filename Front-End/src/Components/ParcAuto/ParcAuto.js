import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "react-awesome-slider/dist/styles.css";
import Paper from "@material-ui/core/Paper";
import "react-awesome-slider/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import server from "../../ServerName/ServerName";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },

  paper: {
    padding: 20,
    marginBottom: 2,
    textAlign: "center",
    color: "black",
  },
}));

export default function TabsWrappedLabel(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const [vehicles, setVehicles] = React.useState([]);

  let VehiclesB = vehicles.filter((v) => v.vehicle_type === "B");
  let VehiclesC = vehicles.filter((v) => v.vehicle_type === "C");
  let VehiclesD = vehicles.filter((v) => v.vehicle_type === "D");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadVehicles = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(server + "vehicles", requestOptions);
      const data = await response.json();

      if (data) {
        setVehicles(data);
        //console.log(data);
      } else console.log("404");
    } catch (err) {
      alert(err.toString());
    }
  };

  useEffect(async () => {
    loadVehicles();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#9B9DC0" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="one"
            label="Categoria B/BE"
            wrapped
            {...a11yProps("one")}
          />
          <Tab value="two" label="Categoria A/A1/A2/AM" {...a11yProps("two")} />
          <Tab value="three" label="Categoria C/CE" {...a11yProps("three")} />
          <Tab value="four" label="Categoria D" {...a11yProps("four")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <Paper className={classes.paper}>
          <div class="carousel-wrapper">
            <Carousel dynamicHeight="true">
              {VehiclesB.map((v) => (
                <div>
                  <img alt="no-warn" src={v.image_url} />
                  <p className="legend">{v.make + " " + v.model}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </Paper>
        <br></br>
        <br></br>
      </TabPanel>
      <TabPanel value={value} index="two">
        Urmează sa fie adaugate imaginile
      </TabPanel>
      <TabPanel value={value} index="three">
        <Paper className={classes.paper}>
          <div class="carousel-wrapper">
            <Carousel dynamicHeight="true">
              {VehiclesC.map((v) => (
                <div>
                  <img alt="vehicles-category-C" src={v.image_url} />
                  <p className="legend">{v.make + " " + v.model}</p>
                  <p>test</p>
                </div>
              ))}
            </Carousel>
          </div>
        </Paper>
        <br></br>
        <br></br>
      </TabPanel>
      <TabPanel value={value} index="four">
        <Paper className={classes.paper}>
          <div class="carousel-wrapper">
            <Carousel dynamicHeight="true">
              {VehiclesD.map((v) => (
                <div>
                  <img alt="vehicles-category-D" src={v.image_url} />
                  <p className="legend">{v.make + " " + v.model}</p>
                </div>
              ))}
            </Carousel>
          </div>
        </Paper>
        <br></br>
        <br></br>
      </TabPanel>
    </div>
  );
}
