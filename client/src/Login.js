import React, { useState } from "react";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import Copyright from './components/Copyright';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import { loginToApp } from './api';





const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin: {
        margin: theme.spacing(1),
      },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default function Login() {

    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    function validateForm() {
        return values.password.length > 0;
    }

    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        if (validateForm()){
            console.log(values.password)
            const response = await loginToApp(values.password);
            console.log(response)
            if (response){
                window.location.href = "/"
            }else{
                window.location.href = "/login"
            }
        }
    }

    return (
        <Container component="main" maxWidth="xs">
        <Paper>
            <Grid>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                </div>
                <FormControl className={classes.form} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        required
                        autoFocus
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        labelWidth={70}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText id="my-helper-text">Enter the admin access code.</FormHelperText>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </FormControl>

            </Grid>
        </Paper>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>

        /**
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        autoFocus
                        name="accesscode"
                        label="Access Code"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        id="accesscode"
                        autoComplete="current-password"
                        onChange={(e) => setAccesscode(e.target.value)}
                    />
                    <FormHelperText id="my-helper-text">Enter the admin access code.</FormHelperText>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                </form>
         * 
         * 
         */



        // <form>
        //     <div>
        //         <TextField
        //             id="outlined-password-input"
        //             label="Password"
        //             type="password"
        //             autoComplete="current-password"
        //             variant="outlined"
        //         />
        //     </div>
        //     <FormControl variant="outlined">
        //         <InputLabel htmlFor="component-outlined">Name</InputLabel>
        //         <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
        //         <FormHelperText>Disabled</FormHelperText>
        //     </FormControl>
        //     <IconButton type="submit" className={classes.iconButton} aria-label="search">
        //                 <ExitToAppIcon />
        //             </IconButton>
        // </form>
    );
}