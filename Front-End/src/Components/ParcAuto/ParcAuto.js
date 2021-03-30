import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "react-awesome-slider/dist/styles.css";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AwesomeSlider from "react-awesome-slider";
import CoreStyles from "react-awesome-slider/src/core/styles.scss";
import AnimationStyles from "react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss";
import "react-awesome-slider/dist/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

function createData(name, src) {
  return { name, src };
}

const images = [
  createData(
    "nume1",
    "https://consauto.ro/wp-content/uploads/2019/09/cons_auto_parc_2-1024x681.jpg"
  ),
  createData(
    "nume2",
    "https://ghidautoservice.ro/wp-content/uploads/2020/06/IASI-AUTO-TODY-FAMILY-JUNIOR-SRL.jpg"
  ),
  createData(
    "nume3",
    "https://convestcompany.ro/wp-content/uploads/2018/04/homepage.png"
  ),
];

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
}));

export default function TabsWrappedLabel(props) {
  console.log(props);
  const classes = useStyles();
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
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
          <Tab value="three" label="Categoria D" {...a11yProps("three")} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <Paper  className={classes.paper}>
            <div class="carousel-wrapper">
        <Carousel  dynamicHeight="true">
          {images.map((image) => (
            <div>
              <img  src={image.src} />
              <p className="legend">{image.name}</p>
            </div>
          ))}
        </Carousel>
        </div>
        </Paper>
        <br></br>
        <br></br>
      </TabPanel>
      <TabPanel value={value} index="two">
      <Typography>aici va fi this.state.nume</Typography>
        <AwesomeSlider style={{ height: "80vh" }}>
          {images.map((image) => (
            <div data-src={image.src}>
             
            </div>
          ))}
        </AwesomeSlider>

        <br></br>
        <br></br>
      </TabPanel>
      <TabPanel value={value} index="three">
        Item Three
      </TabPanel>
    </div>
  );
}
