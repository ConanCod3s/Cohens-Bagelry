import { Fragment, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Button, TextField } from '@mui/material';
import { auth, setFireBaseDoc } from '../../constants/firebase/Calls';

import { useSnackbar } from 'notistack';

export default function SignUpWithEmail({
    phoneNumber,
    firstName,
    lastName,
    email
}: any) {
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((res: any) => {
                    // collectionName, docId, props
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