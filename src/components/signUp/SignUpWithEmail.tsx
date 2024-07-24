import { Fragment, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Box, Button, Stack, TextField } from '@mui/material';
import { auth, setFireBaseDoc } from '../../services/firebase/Calls';

import { useSnackbar } from 'notistack';
import PhoneNumber from '../forms/PhoneNumber';
import Email from '../forms/Email';
import PasswordForm from '../forms/Password';

export default function SignUpWithEmail() {
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);

    const [email, setEmail] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const handleSignUp = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res: any) => {
                    setFireBaseDoc({
                        collectionName: 'customers',
                        docId: res.user.uid,
                        props: {
                            uid: res.user.uid,
                            phoneNumber,
                            firstName,
                            lastName,
                            email,
                        }
                    })
                    enqueueSnackbar('Account Created!', { variant: 'success' });
                })
                .catch((error: any) => {
                    enqueueSnackbar(error.message, { variant: 'error' });
                });
        } catch (err: any) { }
    };

    return (
        <Stack spacing={1}>
            <TextField
                required
                id="outlined-required"
                label="First Name"
                defaultValue=""
                onChange={(event) => { setFirstName(event.target.value) }}
            />
            <TextField
                required
                id="outlined-disabled"
                label="Last Name"
                defaultValue=""
                onChange={(event) => { setLastName(event.target.value) }}
            />
            <PhoneNumber setPhoneNumber={setPhoneNumber} />
            <Email setEmail={setEmail} />
            <PasswordForm
                password={password}
                setPassword={setPassword}
                errors={errors}
                setErrors={setErrors} />
            <Button
                onClick={handleSignUp}
                disabled={errors.length !== 0}>Submit</Button>
        </Stack>

    )
};