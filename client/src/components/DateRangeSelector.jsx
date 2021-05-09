import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import subYears from "date-fns/subYears";
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import { format, isValid, isMatch } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateRangePicker from '@material-ui/lab/DateRangePicker';
import { getNativeSelectUtilityClasses } from '@material-ui/core';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function getYearBefore(date, amount) {
    return date ? subYears(date, amount) : undefined;
}

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    arrowLeft: {

    },
    DateRangePicker: {
        padding: 10
    }
}));

export default function DateRangeSelector({ handleDateChange, handleSubmit, dateSelection }) {
    const classes = useStyles();
    const [popperOpen, setPopperOpen] = useState(false)

    const dateRange = (
        <Box>
            <Grid container direction="column" alignItems="center">
                <Typography fontWeight={600} gutterBottom> Select a date range to analyze </Typography>
                <Paper component="form" onSubmit={handleSubmit} className={classes.root}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Grid m={1}>
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
                                minDate={getYearBefore(new Date(), 1)}
                                onChange={(newValue) => {
                                    handleDateChange(newValue.map(value => value && isValid(value) ? format(value, 'MM/dd/yyyy') : null))
                                }}
                                // inputFormat="MM/dd/yyyy"
                                // mask='__/__/____'
                                renderInput={(startProps, endProps) => (
                                    <React.Fragment>
                                        <TextField {...startProps} size="small" variant="standard" />
                                        {/* <Box sx={{ mx: 1 }}> : </Box> */}
                                        <IconButton onClick={() => setPopperOpen(true)}>
                                            <EventIcon />
                                        </IconButton>
                                        <TextField {...endProps} size="small" variant="standard"/>
                                    </React.Fragment>
                                )}
                            />
                        </Grid>
                    </LocalizationProvider>
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Grid>
        </Box>
    )
    // error={(dateSelection[0]) ? (!isMatch(dateSelection[0], 'MM/dd/yyyy')) : null}

    /**
     * endAdornment={<InputAdornment position="end">
                            <IconButton
                            onClick={() => setPopperOpen(true)}
                            edge="end"
                            >
                            <EventIcon />
                            </IconButton>
                        </InputAdornment>
                        }
     * 
     * 
     * 
     * original daterange format from component [Sun May 02 2021 00:00:00 GMT-0500 (Central Daylight Time), Tue May 04 2021 00:00:00 GMT-0500 (Central Daylight Time)]
     */

    return (
        <div >
            {dateRange}
        </div>
    );
}