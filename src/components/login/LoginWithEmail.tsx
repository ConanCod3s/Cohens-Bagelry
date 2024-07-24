import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';
import Email from '../forms/Email';
import { auth } from '../../services/firebase/Calls';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

export default function LoginWithEmail() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState<string>('');

    const handleLogin = () => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    enqueueSnackbar('Logged In', { variant: 'success' });
                    navigate("/Order")
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
                type="password"
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleLogin}>Submit</Button>
        </Stack>

    )
};