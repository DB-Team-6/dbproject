import React, { useState, useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { MonthPicker, ItemPicker, GroupedChart, Checkboxes, DateRangeSelector } from '../components';
import styles from '../App.module.css';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


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
}));


export default function WeeklyAnalysis({ handleMonthChange, handleItemCheck, handleDateChange, handleSubmit, weeklyData, dateSelection, monthlyProfit, enabledItemsObject, chartedList }) {

  const classes = useStyles();

  return (
    
      <Box className={styles.container}>
        <DateRangeSelector handleDateChange={handleDateChange} handleSubmit={handleSubmit} dateSelection={dateSelection}/>
        <GroupedChart chartedList={chartedList} />
        <Checkboxes handleItemCheck={handleItemCheck} weeklyData={weeklyData} enabledItemsObject={enabledItemsObject} />
      </Box>
    
  )
}