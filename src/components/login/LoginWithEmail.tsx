import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';
import Email from '../forms/Email';
import { auth } from '../../constants/firebase/Calls';
import { useSnackbar } from 'notistack';


export default function LoginWithEmail({ email, setEmail }: any) {
    const [password, setPassword] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    enqueueSnackbar('Logged In', { variant: 'success' });
                })
                .catch((error: any) => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                });
        } catch (err: any) {
        }
    };

    return (
        <Stack spacing={1}>
            <Email setEmail={setEmail} />
            <TextField
                required
                id="outlined-disabled"
                label="Password"
                defaultValue=""
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleLogin}>Submit</Button>
        </Stack>

    )
};