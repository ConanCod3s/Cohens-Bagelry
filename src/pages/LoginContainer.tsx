import { useState } from "react";
import { Stack, Switch, Typography } from "@mui/material";
import LoginWithEmail from "../components/login/LoginWithEmail";
import SignUpWithEmail from "../components/signUp/SignUpWithEmail";
import { Fragment } from "react/jsx-runtime";

export default function LoginContainer() {
    const [loginSignup, swapLoginSignup] = useState<boolean>(false);

    return (
        <Fragment>
            <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                <Typography>Login</Typography>
                <Switch checked={loginSignup} onChange={() => swapLoginSignup(!loginSignup)} />
                <Typography>Sign Up</Typography>
            </Stack>

            {loginSignup ?
                <SignUpWithEmail /> :
                <LoginWithEmail />}
        </Fragment>
    )
}