import { Fragment, useState } from "react";
import { Box, Button, Container, Grid, IconButton, Stack, Switch, Typography } from "@mui/material";
import LoginWithEmail from "../components/login/LoginWithEmail";
import SignUpWithEmail from "../components/signUp/SignUpWithEmail";
import { useUser } from '../services/providers/User';
import { signUserOut } from "../services/firebase/Calls";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function LoginContainer() {
    const { loggedIn } = useUser();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loginSignup, setLoginSignup] = useState<boolean>(false);
    const [loginContainerShowing, isLoginContainerShowing] = useState<boolean>(true)

    const handleLogout = async () => {
        try {
            await signUserOut();
            navigate('/');
            enqueueSnackbar('Successfully Logged out', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to log out', { variant: 'error' });
        }
    };

    const render = loginContainerShowing && (
        <Fragment>
            <Grid container direction={'row'}>
                <Grid item xs={11} sm={11} md={11} lg={11}>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h6">Login</Typography>
                        {loginContainerShowing && (
                            <Fragment>
                                <Switch
                                    checked={loginSignup}
                                    onChange={() => setLoginSignup(prev => !prev)}
                                    aria-label={loginSignup ? "Switch to login" : "Switch to sign up"}
                                />
                                <Typography variant="h6">Sign Up</Typography>
                            </Fragment>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={1} sm={1} md={1} lg={1}>
                    <IconButton
                        onClick={() => isLoginContainerShowing(!loginContainerShowing)}
                    >
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Grid>
            </Grid>
            {loginContainerShowing && (loginSignup ? <SignUpWithEmail /> : <LoginWithEmail />)}
        </Fragment>

    );

    return (
        <Box sx={(theme) => ({
            position: 'sticky',
            top: 0,
            padding: 1,
            margin: 'auto',
            borderRadius: 2,
            textAlign: 'center',
            alignContent: 'center',
            boxShadow: `0px 0px 10px 0px ${theme.palette.primary.light}`,
            backgroundColor: theme.palette.mode === 'light' ? 'whitesmoke' : theme.palette.primary.main,
        })} >
            {!loginContainerShowing && <Stack
                direction={'row'}
                sx={{ justifyContent: 'space-between' }}>
                <Typography sx={{
                    width: '100%',
                    alignContent: 'center',
                }}>Please Login</Typography>
                <IconButton
                    sx={() => ({
                        textAlign: 'center',
                        alignContent: 'center',
                        transform: 'rotate(180deg)',
                    })}
                    onClick={() => isLoginContainerShowing(!loginContainerShowing)}
                >
                    <KeyboardArrowDownIcon />
                </IconButton>
            </Stack>}

            {loggedIn ? (
                <Button onClick={handleLogout} variant="contained" color="primary" sx={{ borderRadius: 0 }}>
                    Logout
                </Button>
            ) : (
                render
            )}
        </Box>

    );
}
