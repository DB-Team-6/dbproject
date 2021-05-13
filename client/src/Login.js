import React, { useState } from "react";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
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
import { useHistory } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { loginToApp } from './api';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(14),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        //width: '80%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
        width: '40ch',
    },
    alert: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    }
}));

export default function Login({ handleLogin }) {
    const history = useHistory();
    const classes = useStyles();
    const [values, setValues] = useState({
        password: '',
        showPassword: false,
        error: false
    });

    const handleValueChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const response = await loginToApp(values.password);

        const result = response?.loginSuccess;
        try {
            if (result === true) {
                document.cookie = `auth=true`
                handleLogin()
                history.push('/');
            } else {
                setValues({ ...values, error: true });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>

                <FormControl className={classes.form} variant="outlined">
                    <InputLabel htmlFor="password">Access code</InputLabel>
                    <OutlinedInput
                        className={classes.textField}
                        id="password"
                        required
                        autoFocus
                        fullWidth
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        labelWidth={85}
                        onChange={handleValueChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
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
                        style={{background: '#E88547'}}
                        className={classes.submit}
                        onClick={handleFormSubmit}
                    >
                        Login
                    </Button>

                </FormControl>
            </Paper>
            <Box mt={8}>
                <Copyright />
            </Box>
            {(values.error)
                ? <Alert severity="error">Access denied! Incorrect access code</Alert>
                : null}
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
        //         <OutlinedInput id="component-outlined" value={name} onChange={handleValueChange} label="Name" />
        //         <FormHelperText>Disabled</FormHelperText>
        //     </FormControl>
        //     <IconButton type="submit" className={classes.iconButton} aria-label="search">
        //                 <ExitToAppIcon />
        //             </IconButton>
        // </form>
    );
}