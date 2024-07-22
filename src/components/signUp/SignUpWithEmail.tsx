import { Fragment, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, Stack, TextField } from '@mui/material';
import { auth, setFireBaseDoc } from '../../services/firebase/Calls';

import { useSnackbar } from 'notistack';
import PhoneNumber from '../forms/PhoneNumber';
import Email from '../forms/Email';
import dayjs from 'dayjs';

export default function SignUpWithEmail() {
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');

    const [userInfo, setUserInfo] = useState<any>();
    const [loginSignup, swapLoginSignup] = useState<boolean>(false);

    const defaultValue = dayjs(new Date())
        .add(1, 'day')
        .set('hour', 4)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);

    const [day, setDay] = useState<any>(defaultValue);
    const [time, setTime] = useState<any>(defaultValue);

    const [email, setEmail] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [loggedIn, setLogin] = useState<boolean>(false);
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
        <Fragment>
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
            </Stack>
            <TextField
                required
                id="outlined-disabled"
                label="Password"
                defaultValue=""
                onChange={(event) => setPassword(event.target.value)}
            />
            <Button onClick={handleSignUp}>Submit</Button>
        </Fragment>

    )
};