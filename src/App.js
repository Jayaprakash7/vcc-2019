import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  table: {
    width: "100%"
  }
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [firstBattingList, setFirstBattingList] = useState([]);
  const [firstBowlingList, setFirstBowlingList] = useState([]);
  const [secondBattingList, setSecondBattingList] = useState([]);
  const [secondBowlingList, setSecondBowlingList] = useState([]);
  const [firstTeamName, setFirstTeamName] = useState("");
  const [secondTeamName, setSecondTeamName] = useState("");
  const [firstTeamTotalRun, setFirstTotalRun] = useState("");
  const [secondTeamTotalRun, setSecondTeamTotalRun] = useState("");
  const [firstTeamTotalOver, setFirstTeamTotalOver] = useState("");
  const [secondTeamTotalOver, setSecondTeamTotalOver] = useState("");
  const [firstTeamWicket, setFirstTeamWicket] = useState("");
  const [secondTeamWicket, setSecondTeamWicket] = useState("");

  useEffect(() => {
    matchesWith();
    firstBatting();
    firstBowling();
    secondBatting();
    secondBowling();
  }, [firstBattingList]);
  function matchesWith() {
    fetch(
      "http://gsx2json.com/api?id=1FwsWe-oTm9lM4Xm0KAOTuiEV07H4NKK9n3lCfZ9F85c&sheet=5&columns=false"
    )
      .then(results => results.json())
      .then(data => {
        setFirstTeamName(data.rows[0].firstbatting);
        setSecondTeamName(data.rows[0].secondbatting);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function firstBatting() {
    fetch(
      "http://gsx2json.com/api?id=1FwsWe-oTm9lM4Xm0KAOTuiEV07H4NKK9n3lCfZ9F85c&sheet=1&columns=false"
    )
      .then(results => results.json())
      .then(data => {
        setFirstBattingList(data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function firstBowling() {
    fetch(
      "http://gsx2json.com/api?id=1FwsWe-oTm9lM4Xm0KAOTuiEV07H4NKK9n3lCfZ9F85c&sheet=2&columns=false"
    )
      .then(results => results.json())
      .then(data => {
        setFirstBowlingList(data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function secondBatting() {
    fetch(
      "http://gsx2json.com/api?id=1FwsWe-oTm9lM4Xm0KAOTuiEV07H4NKK9n3lCfZ9F85c&sheet=3&columns=false"
    )
      .then(results => results.json())
      .then(data => {
        setSecondBattingList(data.rows);
      })
      .catch(error => {
        console.log(error);
      });
  }
  function secondBowling() {
    fetch(
      "http://gsx2json.com/api?id=1FwsWe-oTm9lM4Xm0KAOTuiEV07H4NKK9n3lCfZ9F85c&sheet=4&columns=false"
    )
      .then(results => results.json())
      .then(data => {
        setSecondBowlingList(data.rows);
        setFirstTotalRun(firstBattingList[firstBattingList.length - 1].runs);
        setSecondTeamTotalRun(
          secondBattingList[secondBattingList.length - 1].runs
        );
        setFirstTeamWicket(firstBowlingList[firstBowlingList.length - 1].w);
        setSecondTeamWicket(secondBowlingList[secondBowlingList.length - 1].w);
        setFirstTeamTotalOver(
          (firstBattingList[firstBattingList.length - 1].balls / 6).toFixed(1)
        );
        setSecondTeamTotalOver(
          (secondBattingList[secondBattingList.length - 1].balls / 6).toFixed(1)
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          <div className={classes.root}>
            <div className={classes.root}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <marquee>
                    <Typography style={{ color: "black", fontSize: 18 }}>
                      <span>&#127878;&#127878;</span> Wishes you a very happy diwali
                      <span>&#127878;&#127878;</span>, Please like and share our
                      facebook and Instagram page வெடியங்காடு ஊர் சொந்தங்கள்<span>&#128512;</span>{" "}சும்மா ஒரு விளம்பரம்
                      <span>&#128540;&#128694;</span>
                    </Typography>
                  </marquee>
                </Grid>
              </Grid>
            </div>

            <Grid container spacing={0}>
              {/* <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h4" style={{ color: "#000" }}>
                    VPL - 2019
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Typography variant="h6">
                    Vediyangadu Diwali Tournament
                  </Typography>
                </Paper>
              </Grid> */}
              <Grid item xs={12}>
                <img
                  style={{ width: "100%" }}
                  src={require("./sportsday.png")}
                  alt="Vediyangadu Diwali Tournament "
                ></img>
              </Grid>

              <div className={classes.root}>
                <Grid container spacing={0}>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h6" style={{ color: "000" }}>
                        {firstTeamName}
                      </Typography>
                      <Typography>
                        {firstTeamTotalRun + "/" + firstTeamWicket}
                      </Typography>
                      <Typography>{"(" + firstTeamTotalOver + ")"}</Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography variant="h6" style={{ color: "000" }}>
                        {secondTeamName}
                      </Typography>
                      <Typography>
                        {secondTeamTotalRun + "/" + secondTeamWicket}
                      </Typography>
                      <Typography>{"(" + secondTeamTotalOver + ")"}</Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </div>

              <div className={classes.root}>
                <AppBar position="static" color="default">
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                  >
                    <Tab label={firstTeamName} {...a11yProps(0)} />
                    <Tab label={secondTeamName} {...a11yProps(1)} />
                  </Tabs>
                </AppBar>
                <SwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={value}
                  onChangeIndex={handleChangeIndex}
                >
                  <TabPanel value={value} index={0} dir={theme.direction}>
                    <Paper className={classes.root}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>BATTING</StyledTableCell>
                            <StyledTableCell align="right">R</StyledTableCell>
                            <StyledTableCell align="right">B</StyledTableCell>
                            <StyledTableCell align="right">4s</StyledTableCell>
                            <StyledTableCell align="right">6s</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {firstBattingList.map(row => (
                            <StyledTableRow key={row.batsman}>
                              <StyledTableCell component="th" scope="row">
                                {row.batsman}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.runs}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.balls}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.fours}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.sixes}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>

                        <TableHead>
                          <TableRow>
                            <StyledTableCell>BOWLING</StyledTableCell>
                            <StyledTableCell align="right">O</StyledTableCell>
                            <StyledTableCell align="right">M</StyledTableCell>
                            <StyledTableCell align="right">R</StyledTableCell>
                            <StyledTableCell align="right">W</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {firstBowlingList.map(row =>
                            row.name !== "wicket" ? (
                              <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                  {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.o}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.m}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.r}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.w}
                                </StyledTableCell>
                              </StyledTableRow>
                            ) : null
                          )}
                        </TableBody>
                      </Table>
                    </Paper>
                  </TabPanel>
                  <TabPanel value={value} index={1} dir={theme.direction}>
                    <Paper className={classes.root}>
                      <Table
                        className={classes.table}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <StyledTableCell>BATTING</StyledTableCell>
                            <StyledTableCell align="right">R</StyledTableCell>
                            <StyledTableCell align="right">B</StyledTableCell>
                            <StyledTableCell align="right">4s</StyledTableCell>
                            <StyledTableCell align="right">6s</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {secondBattingList.map(row => (
                            <StyledTableRow key={row.batsman}>
                              <StyledTableCell component="th" scope="row">
                                {row.batsman}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.runs}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.balls}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.fours}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.sixes}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>

                        <TableHead>
                          <TableRow>
                            <StyledTableCell>BOWLING</StyledTableCell>
                            <StyledTableCell align="right">O</StyledTableCell>
                            <StyledTableCell align="right">M</StyledTableCell>
                            <StyledTableCell align="right">R</StyledTableCell>
                            <StyledTableCell align="right">W</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {secondBowlingList.map(row =>
                            row.name !== "wicket" ? (
                              <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                  {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.o}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.m}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.r}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                  {row.w}
                                </StyledTableCell>
                              </StyledTableRow>
                            ) : null
                          )}
                        </TableBody>
                      </Table>
                    </Paper>
                  </TabPanel>
                </SwipeableViews>
              </div>
            </Grid>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
