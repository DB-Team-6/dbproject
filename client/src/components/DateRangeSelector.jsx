import React, { useState } from 'react';
// import subYears from "date-fns/subYears";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import { format, isValid } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import {CircularProgress, Backdrop } from '@material-ui/core';

// function getYearBefore(date, amount) {
//     return date ? subYears(date, amount) : undefined;
// }

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 15px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        flexGrow: 1,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        // backgroundColor: "green",
        height: 28,
        margin: 4,
        width: 40,
        marginLeft: -20
    },
    arrowLeft: {

    },
    DateRangePicker: {
        padding: 10
    },
    paper: {
        // padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        justifyContent: 'center'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
      },
}));

export default function DateRangeSelector({ handleDateChange, handleSubmit, dateSelection, toggleLoading, loading }) {
    const classes = useStyles();
    const [popperOpen, setPopperOpen] = useState(false)

    const onClick = (event) => {
        toggleLoading()
        handleSubmit(event);
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} className={classes.paper}>
                    <Typography fontWeight={600} gutterBottom> Select a date range to analyze </Typography>
                </Grid>

                <Paper component="form" className={classes.root}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker
                            className={classes.DateRangePicker}
                            calendars={1}
                            open={popperOpen}
                            onClose={() => setPopperOpen(false)}
                            disableFuture
                            startText="Start Date"
                            endText="End Date"
                            value={dateSelection}
                            allowKeyboardControl={false}
                            minDate={new Date('Jan 1 2021')}
                            onChange={(newValue) => {
                                handleDateChange(newValue.map(value => value && isValid(value) ? format(value, 'MM/dd/yyyy') : null))
                            }}
                            // inputFormat="MM/dd/yyyy"
                            // mask='__/__/____'
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} size="small" variant="standard" style={{ marginRight: 10 }} />
                                    <TextField {...endProps} size="small" variant="standard" />
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>
                    <IconButton onClick={() => setPopperOpen(true)}>
                        <EventIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton onClick={onClick} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Paper>


            </Grid>
        </div>
    )
}