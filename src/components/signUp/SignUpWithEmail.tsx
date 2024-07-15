import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';
import Email from '../forms/Email';
import { auth } from '../../constants/firebase/Calls';

import { useSnackbar } from 'notistack';

export default function SignUpWithEmail({ email, setEmail }: any) {
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    enqueueSnackbar('Account Created!', { variant: 'success' });
                })
                .catch((error: any) => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                });
        } catch (err: any) {
        }
    };

    return (
        <Stack>
            <Email setEmail={setEmail} />
            <TextField
                id="outlined-disabled"
                label="Password"
                defaultValue=""
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleSignUp}>Submit</Button>
        </Stack>

    )
};