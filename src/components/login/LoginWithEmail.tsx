import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Stack } from '@mui/material';
import Email from '../forms/Email';
import { auth } from '../../services/firebase/Calls';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import PasswordForm from '../forms/Password';

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
            <PasswordForm
                password={password}
                setPassword={setPassword}
                errors={[]}
                setErrors={() => { }} />
            <Button onClick={handleLogin}>Submit</Button>
        </Stack>

    )
};