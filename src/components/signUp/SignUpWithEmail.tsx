import { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { auth, setFireBaseDoc } from '../../services/firebase/Calls';
import PhoneNumber from '../forms/PhoneNumber';
import Email from '../forms/Email';
import PasswordForm from '../forms/Password';

export default function SignUpWithEmail() {
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [errors, setErrors] = useState<string[]>([]);

    const handleSignUp = async () => {
        if (errors.length > 0 || !email || !password || !firstName || !lastName) {
            enqueueSnackbar('Please fix errors and fill in all required fields.', { variant: 'warning' });
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setFireBaseDoc({
                collectionName: 'customers',
                docId: user.uid,
                props: {
                    uid: user.uid,
                    phoneNumber,
                    firstName,
                    lastName,
                    email,
                }
            });

            enqueueSnackbar('Account Created!', { variant: 'success' });
        } catch (error: any) {
            enqueueSnackbar(error.message, { variant: 'error' });
        }
    };

    return (
        <Stack spacing={2}>
            <TextField
                required
                label="First Name"
                onChange={(event) => setFirstName(event.target.value)}
                value={firstName}
            />
            <TextField
                required
                label="Last Name"
                onChange={(event) => setLastName(event.target.value)}
                value={lastName}
            />
            <PhoneNumber setPhoneNumber={setPhoneNumber} />
            <Email setEmail={setEmail} />
            <PasswordForm
                password={password}
                setPassword={setPassword}
                errors={errors}
                setErrors={setErrors}
            />
            <Button
                onClick={handleSignUp}
                disabled={errors.length > 0 || !email || !password || !firstName || !lastName}
            >
                Submit
            </Button>
        </Stack>
    );
}