import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}));

export default function Checkboxes({ handleItemCheck, weeklyData, enabledItemsObject}) {
    const classes = useStyles();
    // const error = [gilad, jason, antoine].filter((v) => v).length !== 2;
    
    const checkbox = (
        (weeklyData)
            ? (
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Select ingredients to visualize</FormLabel>
                    <FormGroup row>
                        {weeklyData.map(( data, i ) => (<FormControlLabel key={i}
                                                                        control={<Checkbox checked={enabledItemsObject[data.ingredient] ? enabledItemsObject[data.ingredient] : false} 
                                                                                            onChange={handleItemCheck} 
                                                                                            name={data.ingredient} />}
                                                                        label={data.ingredient}/>)
                        )}      
                    </FormGroup>
                    <FormHelperText>Pick five</FormHelperText>
                </FormControl>
            ) : null
    )
    return (
        <div className={classes.root}>
            {(weeklyData) && (weeklyData.length === 0)
                ? null
                : checkbox
            }
        </div>
    );
}
