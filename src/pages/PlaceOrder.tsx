

import { useEffect, useState } from 'react';
import PhoneNumber from '../components/forms/PhoneNumber';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Box, Switch } from '@mui/material';
import Quantity from '../components/forms/Quantity';
import Submit from '../components/forms/Submit';
import LoginWithEmail from '../components/login/LoginWithEmail';

import { auth } from '../constants/firebase/Calls.tsx';
import { onAuthStateChanged } from "firebase/auth";
import SignUpWithEmail from '../components/signUp/SignUpWithEmail.tsx';

interface AvailableTypes {
    value: string,
    label: string,
    quantity: number
}

const typesArr: AvailableTypes[] = [
    {
        value: 'Plain',
        label: 'Plain',
        quantity: 0
    },
    {
        value: 'Everything',
        label: 'Everything',
        quantity: 0
    },
    {
        value: 'Poppy Seed',
        label: 'Poppy Seed',
        quantity: 0
    },
    {
        value: 'Sesame Seed',
        label: 'Sesame Seed',
        quantity: 0
    },
    {
        value: 'Chocolate Chip',
        label: 'Chocolate Chip',
        quantity: 0
    },
    {
        value: 'Cinnamon Sugar',
        label: 'Cinnamon Sugar',
        quantity: 0
    },
];

export default function PlaceOrder() {

    const [loginSignup, swapLoginSignup] = useState<boolean>(false);

    const [selections, setSelections] = useState<{
        value: string,
        label: string,
        quantity: number
    }[]>(typesArr);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [loggedIn, setLogin] = useState<boolean>(false);

    const totalQuantity = selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setLogin(true)
            else setLogin(false)
        });

        return () => unsubscribe();
    }, []);

    return (
        <Box
            component="form"
            sx={{
                padding: 2,
                '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <Stack direction={'row'} sx={{ justifyContent: 'space-around', alignItems: 'center' }}>
                <Typography>Login</Typography>
                <Switch checked={loginSignup} onChange={() => swapLoginSignup(!loginSignup)} />
                <Typography>Sign Up</Typography>
            </Stack>

            {loggedIn ?
                <Submit
                    selections={selections.filter((obj) => obj.quantity > 0)}
                    email={email}
                    phoneNumber={phoneNumber}
                    firstName={firstName}
                    lastName={lastName}
                /> : loginSignup ?
                    <Stack >
                        <TextField
                            required
                            id="outlined-required"
                            label="First Name"
                            defaultValue=""
                            onChange={(event) => { setFirstName(event.target.value) }}
                        />
                        <TextField
                            id="outlined-disabled"
                            label="Last Name"
                            defaultValue=""
                            onChange={(event) => { setLastName(event.target.value) }}
                        />
                        <PhoneNumber setPhoneNumber={setPhoneNumber} />
                        <SignUpWithEmail
                            email={email}
                            setEmail={setEmail}
                        />
                    </Stack> :
                    <LoginWithEmail
                        email={email}
                        setEmail={setEmail}
                    />
            }
            <Typography variant='subtitle1'>At this time we can only support orders below one dozen;</Typography>
            <Box sx={{ height: '100%', paddingTop: 4, paddingBottom: 8 }}>
                {selections.map((type, sakuin) => {
                    return (
                        <Stack
                            key={type.label + sakuin}
                            direction={'row'}
                            sx={{ width: '100%', justifyContent: 'space-between' }}
                        >
                            <Typography>{type.label}</Typography>
                            <Box
                                component={Quantity}
                                type={type}
                                sakuin={sakuin}
                                availableTypes={selections}
                                setAvailableTypes={setSelections}
                            />
                        </Stack>
                    )
                })}
            </Box>
            <Stack direction='row' sx={{ justifyContent: 'space-between', borderTop: '1px dashed black' }}>
                <Typography>Cost: </Typography>
                <Typography>$ {totalQuantity}.00</Typography>
            </Stack>
        </Box>
    );
}