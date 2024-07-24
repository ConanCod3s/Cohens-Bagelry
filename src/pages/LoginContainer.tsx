import { Fragment, useState } from "react";
import { Button, Container, Stack, Switch, Typography } from "@mui/material";
import LoginWithEmail from "../components/login/LoginWithEmail";
import SignUpWithEmail from "../components/signUp/SignUpWithEmail";
import { useUser } from '../services/providers/User';
import { signUserOut } from "../services/firebase/Calls";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function LoginContainer() {
    const { loggedIn } = useUser();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [loginSignup, setLoginSignup] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            await signUserOut();
            navigate('/');
            enqueueSnackbar('Successfully Logged out', { variant: 'success' });
        } catch (error) {
            enqueueSnackbar('Failed to log out', { variant: 'error' });
        }
    };

    return (
        <Fragment>
            {loggedIn ? (
                <Button onClick={handleLogout} variant="contained" color="primary" sx={{ borderRadius: 0 }}>
                    Logout
                </Button>
            ) : (
                <Container
                    sx={(theme) => ({
                        boxShadow: `0px 0px 10px 0px ${theme.palette.primary.light}`,
                        backgroundColor: theme.palette.mode === 'light' ? 'whitesmoke' : theme.palette.primary.main,
                        padding: 2,
                        borderRadius: 2,
                        maxWidth: 400,
                        margin: 'auto',
                    })}
                >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                        <Typography variant="h6">Login</Typography>
                        <Switch
                            checked={loginSignup}
                            onChange={() => setLoginSignup(prev => !prev)}
                            aria-label={loginSignup ? "Switch to login" : "Switch to sign up"}
                        />
                        <Typography variant="h6">Sign Up</Typography>
                    </Stack>
                    {loginSignup ? <SignUpWithEmail /> : <LoginWithEmail />}
                </Container>
            )}
        </Fragment>
    );
}
