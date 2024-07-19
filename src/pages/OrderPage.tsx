

import { Fragment, useEffect, useState } from 'react';
import PhoneNumber from '../components/forms/PhoneNumber';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Box, Switch, Grid } from '@mui/material';
import Quantity from '../components/forms/Quantity';
import Submit from '../components/forms/Submit';
import LoginWithEmail from '../components/login/LoginWithEmail';

import { auth, getDocumentById } from '../constants/firebase/Calls.tsx';
import { onAuthStateChanged } from "firebase/auth";
import SignUpWithEmail from '../components/signUp/SignUpWithEmail.tsx';
import Email from '../components/forms/Email.tsx';
import DateTimeForPickup from '../components/forms/DateTime.tsx';
import dayjs from 'dayjs';


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

export default function OrderPage() {

    const [userInfo, setUserInfo] = useState<any>();
    const [loginSignup, swapLoginSignup] = useState<boolean>(false);

    const [selections, setSelections] = useState<{
        value: string,
        label: string,
        quantity: number
    }[]>(typesArr);

    dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
    // 'YYYYescape 2019-01-25T00:00:00-02:00Z'

    dayjs('2019-01-25').format('DD/MM/YYYY') // '25/01/2019'


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

    const totalQuantity = selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: any) => {
            if (user) {

                getDocumentById({
                    collectionName: 'customers',
                    docId: user.uid
                }).then((userData: any) => {
                    setLogin(true);
                    setUserInfo(userData);
                });
            }
            else setLogin(false)
        });
        return () => unsubscribe();
    }, []);

    return (
        <Grid container >
            <Grid item sm={8} md={8} lg={8} sx={{ padding: 2 }}>
                {selections.map((type, sakuin) => {
                    return (
                        <Stack
                            key={type.label + sakuin}
                            direction={'row'}
                            sx={{ width: '100%', justifyContent: 'space-between', padding: 1 }}
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
                <Stack direction='row' sx={{ justifyContent: 'space-between', borderTop: '1px dashed black' }}>
                    <Typography>Cost: </Typography>
                    <Typography>$ {totalQuantity}.00</Typography>
                </Stack>
            </Grid>
            <Grid item sm={4} md={4} lg={4} sx={{ padding: 2 }}>
                {loggedIn ?
                    <Stack spacing={1}>
                        <TextField
                            id="outlined-required"
                            label={userInfo.firstName ? userInfo.firstName : "First Name"}
                            defaultValue=""
                            onChange={(event) => { setFirstName(event.target.value) }}
                        />
                        <TextField
                            id="outlined-disabled"
                            label={userInfo.lastName ? userInfo.lastName : "Last Name"}
                            defaultValue=""
                            onChange={(event) => { setLastName(event.target.value) }}
                        />
                        <PhoneNumber userPhoneNumber={userInfo.phoneNumber} setPhoneNumber={setPhoneNumber} />
                        <Email userEmail={userInfo.email} setEmail={setEmail} />
                        <DateTimeForPickup defaultValue={defaultValue} setDay={setDay} setTime={setTime} />

                        {/* const [day, setDay] = useState<any>(dayjs(defaultValue).format('YYYY-MM-DD')); */}
                        {/* const [time, setTime] = useState<any>(dayjs(defaultValue).format('HH:mm:ssZ[Z]')); */}

                        <Submit
                            uid={userInfo.uid}
                            day={dayjs(day).format('YYYY-MM-DD')}
                            time={dayjs(time).format('HH:mm:ss')}
                            selections={selections.filter((obj) => obj.quantity > 0)}
                            email={email === '' ? userInfo.email : email}
                            phoneNumber={phoneNumber === '' ? userInfo.phoneNumber : phoneNumber}
                            firstName={firstName === '' ? userInfo.firstName : firstName}
                            lastName={lastName === '' ? userInfo.lastName : lastName}
                        />
                    </Stack> :
                    <Fragment>
                        <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center' }} >
                            <Typography>Login</Typography>
                            <Switch checked={loginSignup} onChange={() => swapLoginSignup(!loginSignup)} />
                            <Typography>Sign Up</Typography>
                        </Stack>

                        {loginSignup ?
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
                                <SignUpWithEmail
                                    phoneNumber={phoneNumber}
                                    firstName={firstName}
                                    lastName={lastName}
                                    email={email}
                                    setEmail={setEmail}
                                />
                            </Stack> :
                            <LoginWithEmail
                                email={email}
                                setEmail={setEmail}
                            />}
                    </Fragment>
                }
            </Grid>
        </Grid>
    );
}