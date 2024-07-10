import { useState } from 'react';
import Email from '../components/forms/Email';
import PhoneNumber from '../components/forms/PhoneNumber';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Box, Grid, Card } from '@mui/material';
import Quantity from '../components/forms/Quantity';
import Submit from '../components/forms/Submit';
import LoginButton from '../components/login/LoginWithEmail';

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

    const [selections, setSelections] = useState<{
        value: string,
        label: string,
        quantity: number
    }[]>(typesArr);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');


    const totalQuantity = selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    return (
        <Grid container>
            <Grid item sm={10} md={10} lg={10}>
                <Box
                    component="form"
                    sx={{
                        padding: 2,
                        '& .MuiTextField-root': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack direction={'row'}>
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
                    </Stack>
                    <Stack sx={{ paddingBottom: 5 }}>
                        <Email setEmail={setEmail} />
                        <PhoneNumber setPhoneNumber={setPhoneNumber} />
                    </Stack>
                    <Typography variant='subtitle1'>At this time we can only support orders below two dozen;</Typography>
                    <Box sx={{ height: 50 }} />
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
                    <Box sx={{ height: 50 }} />
                    <Stack direction='row' sx={{ justifyContent: 'space-between', borderTop: '1px dashed black' }}>
                        <Typography>Cost: </Typography>
                        <Typography>$ {totalQuantity}.00</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ justifyContent: 'end' }}>

                    </Stack>
                </Box>
            </Grid>
            <Grid item sx={{ alignContent: 'space-around', padding: 2 }} sm={2} md={2} lg={2}>
                {/* <LoginButton /> */}
                <Submit
                    selections={selections.filter((obj) => obj.quantity > 0)}
                    email={email}
                    phoneNumber={phoneNumber}
                    firstName={firstName}
                    lastName={lastName}
                />
            </Grid>
        </Grid>
    );
}