import { Fragment, useState } from 'react';
import { Box, Button, LinearProgress } from "@mui/material";
import { useSnackbar } from 'notistack';
import { auth, setFireBaseDoc } from '../../constants/firebase/Calls';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

interface AvailableTypes {
    value: string;
    label: string;
    quantity: number;
}

interface Props {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    selections: AvailableTypes[];
}

export default function Submit(props: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, isSubmitting] = useState<boolean>(false);

    const totalQuantity = props.selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    // Validate all the required fields before submitting
    function validateProps() {
        if (props.firstName.length === 0) {
            enqueueSnackbar('Please add a First name', { variant: 'error' });
        } else if (props.email.length === 0) {
            enqueueSnackbar('Email Is Missing, please add a valid email', { variant: 'error' });
        } else if (props.phoneNumber.length === 0) {
            enqueueSnackbar('An invalid, incomplete, or no phone number was added', { variant: 'warning' });
        } else if (totalQuantity <= 0) {
            enqueueSnackbar('Please select a quantity over 0', { variant: 'error' });
        } else {
            handleAuthenticationAndOrder();
        }
    }

    const handleAuthenticationAndOrder = () => {
        isSubmitting(true);
        const pw = props.firstName[0] + '.' + props.lastName.substring(Math.floor(props.lastName.length / 2)) + '@' + props.phoneNumber.substring(props.phoneNumber.length - 4);

        // Check if user is already logged in
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                setFireBaseDoc({
                    collectionName: 'customer',
                    docId: user.uid,
                    props: {
                        firstName: props.firstName,
                        lastName: props.lastName,
                        email: props.email,
                    }
                })
                    .then(() => {
                        enqueueSnackbar('Order placed successfully!', { variant: 'success' });
                    })
                    .catch((err) => {
                        console.log('Place order error', err);
                        enqueueSnackbar('Failed to place order', { variant: 'error' });
                    })
                    .finally(() => {
                        isSubmitting(false);
                    });
            } else {
                // User is not signed in, create account
                createUserWithEmailAndPassword(auth, props.email, pw)
                    .then((userCredential: any) => {
                        // Account created and user signed in
                        setFireBaseDoc({
                            collectionName: 'customer',
                            docId: userCredential,
                            props: {
                                firstName: props.firstName,
                                lastName: props.lastName,
                                email: props.email,
                            }
                        }).then(() => {
                            enqueueSnackbar('Order placed successfully!', { variant: 'success' });
                        })
                            .catch((err) => {
                                console.log('Place order error', err);
                                enqueueSnackbar('Failed to place order', { variant: 'error' });
                            })
                            .finally(() => {
                                isSubmitting(false);
                            });
                    })
                    .catch((error) => {
                        console.log('createUserWithEmailAndPassword Error', error);
                        // Try to log in if account already exists
                        signInWithEmailAndPassword(auth, props.email, pw)
                            .then((user: any) => {
                                setFireBaseDoc({
                                    collectionName: 'customer',
                                    docId: user.uid,
                                    props: {
                                        firstName: props.firstName,
                                        lastName: props.lastName,
                                        email: props.email,
                                    }
                                }).then(() => {
                                    enqueueSnackbar('Order placed successfully!', { variant: 'success' });
                                })
                                    .catch((err) => {
                                        console.log('Place order error', err);
                                        enqueueSnackbar('Failed to place order', { variant: 'error' });
                                    })
                                    .finally(() => {
                                        isSubmitting(false);
                                    });
                            })
                            .catch((loginError) => {
                                console.log('signInWithEmailAndPassword Error', loginError);
                                enqueueSnackbar('Authentication failed', { variant: 'error' });
                                isSubmitting(false);
                            });
                    });
            }
        });
    };

    return (
        <Fragment>
            <Button
                sx={{ width: '100%', height: 35 }}
                variant="contained"
                onClick={validateProps}
                disabled={submitting}
            >
                {submitting ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : 'Place Order'}
            </Button>
        </Fragment>
    );
}
