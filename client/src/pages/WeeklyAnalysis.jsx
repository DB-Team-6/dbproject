import React, { useEffect } from 'react';
import { Grid, Grow } from '@material-ui/core';
import { GroupedChart, PieChart, RadarChart, Checkboxes, DateRangeSelector } from '../components';
import styles from '../App.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { getCookie } from '../utils'
import Copyright from '../components/Copyright';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(4),
      width: theme.spacing(16),
      height: theme.spacing(25),
    },
  },

  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  }
}));


export default function WeeklyAnalysis({ handleItemCheck,handleDateChange, 
  handleSubmit, employeeSalesData, weeklyData, dateSelection,
  enabledItemsObject, chartedList, pizzaProfitData }) {

  const history = useHistory();
  const classes = useStyles();


  useEffect(() => {
    if (getCookie() === "false") {
      history.push('/login');
    }
  })

  return (
    <Box className={styles.container}>
      <Grow in>
        <Grid container spacing={3}>
          <Grid item xs={5}>
            <Box className={classes.paper}>
              <DateRangeSelector handleDateChange={handleDateChange} handleSubmit={handleSubmit} dateSelection={dateSelection} />
            </Box>
          </Grid>
          <Grid item xs={8}>
            <GroupedChart chartedList={chartedList} />
          </Grid>
          <Grid item xs={4}>
            <Checkboxes handleItemCheck={handleItemCheck} weeklyData={weeklyData} enabledItemsObject={enabledItemsObject} />
          </Grid>
          <Grid item xs={6}>
            <PieChart data={pizzaProfitData} />
          </Grid>
          <Grid item xs={6}>
            <RadarChart data={employeeSalesData} />
          </Grid>
        </Grid>
      </Grow>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Box>
  )
}