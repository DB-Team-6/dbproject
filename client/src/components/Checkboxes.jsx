import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Checkbox, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Checkboxes({ handleItemCheck, weeklyData, enabledItemsObject }) {
    const classes = useStyles();
    // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

    const checkbox = (
        (weeklyData)
            ? (
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select ingredients to filter the graph</FormLabel>
                    <Grid container spacing={0.000000005}>
                        {[
                            weeklyData.slice(0, weeklyData.length / 2),
                            weeklyData.slice(weeklyData.length / 2, weeklyData.length)
                        ].map((column) => column.map((data, i) =>
                            <Grid item xs={6}>
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                            checked={enabledItemsObject[data.ingredient]}
                                            onChange={handleItemCheck}
                                            name={data.ingredient}
                                            style={{color: '#E88547'}}
                                        />}
                                    label={data.ingredient} />
                            </Grid>
                        ))}
                    </Grid>
                    {/* <FormHelperText>Pick five</FormHelperText> */}
                </FormControl>
            ) : null
    )
    return ((weeklyData) && (weeklyData.length === 0)
                ? null
                : checkbox
    );
}
