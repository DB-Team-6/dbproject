import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@material-ui/core';
import styles from './MonthPicker.module.css';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

export default function MonthPicker({ monthlyProfit, handleMonthChange }){
    const classes = useStyles();
    if (!monthlyProfit) return null

    const selection = (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="select-month">Month</InputLabel>
                <Select
                    defaultValue=""
                    onChange={(e) => handleMonthChange({
                        month: e.target.value
                    })}>
                    {monthlyProfit.map(({ month }, i) => <MenuItem key={i} value={month}>{month}</MenuItem>)}
                </Select>
                <FormHelperText>Select a month to analyze</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel id="select-week">Week</InputLabel>
                <Select defaultValue="" onChange={(e) => handleMonthChange({
                    week: e.target.value
                })}>
                    <MenuItem value="week_1">Week 1</MenuItem>
                    <MenuItem value="week_2">Week 2</MenuItem>
                    <MenuItem value="week_3">Week 3</MenuItem>
                    <MenuItem value="week_4">Week 4</MenuItem>
                </Select>
                <FormHelperText>Choose week to view</FormHelperText>
            </FormControl>
        </div>
    )

    return (
        <div className={styles.container}>
            {selection}
        </div>
    )
}

// const [fetchedMonths, setFetchedMonths] = useState([]);

    // useEffect(() => {
    //     const fetchAPI = async () => {
    //         setFetchedMonths(await fetchMonths());
    //     }
    //     // if (fetchedMonths === undefined){
    //     //     fetchAPI();
    //     // }
    //     fetchAPI();
    //     //console.log(fetchedMonths);
    // }, [setFetchedMonths]);