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
    const [loginSignup, swapLoginSignup] = useState<boolean>(false);

    async function Logout() {
        await signUserOut().then(() => {
            navigate('/');
            enqueueSnackbar('Successfully Logged out', { variant: 'success' });
        })
    }
    return (
        <Fragment>
            {loggedIn ?
                <Button onClick={Logout} variant="contained" color="primary" >
                    Logout
                </Button> :
                <Container sx={(theme) => ({
                    boxShadow: `0px 0px 10px 0px ${theme.palette.primary.light}`,
                    backgroundColor: theme.palette.mode === 'light' ? 'whitesmoke' : theme.palette.primary.main
                })}>
                    <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Typography>Login</Typography>
                        <Switch checked={loginSignup} onChange={() => swapLoginSignup(!loginSignup)} />
                        <Typography>Sign Up</Typography>
                    </Stack>
                    {loginSignup ? <SignUpWithEmail /> : <LoginWithEmail />}
                </Container>}
        </Fragment>
    )
};