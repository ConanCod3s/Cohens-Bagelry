import { useState } from 'react';
import Email from '../components/forms/Email';
import PhoneNumber from '../components/forms/PhoneNumber';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Box } from '@mui/material';
import Quantity from '../components/forms/Quantity';


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

    const [availableTypes, setAvailableTypes] = useState<{
        value: string,
        label: string,
        quantity: number
    }[]>(typesArr);

    const totalQuantity = availableTypes.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

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
            <Stack direction={'row'}>
                <TextField
                    required
                    id="outlined-required"
                    label="First Name"
                    defaultValue=""
                />
                <TextField
                    id="outlined-disabled"
                    label="Last Name"
                    defaultValue=""
                />
            </Stack>
            <Stack sx={{ paddingBottom: 5 }}>
                <Box component={Email} />
                <Box component={PhoneNumber} />
            </Stack>
            <Typography variant='subtitle1'>At this time we can only support orders below two dozen;</Typography>
            <Box sx={{ height: 50 }} />
            {availableTypes.map((type, sakuin) => {
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
                            availableTypes={availableTypes}
                            setAvailableTypes={setAvailableTypes}
                        />
                    </Stack>
                )
            })}
            <Box sx={{ height: 50 }} />
            <Stack direction='row' sx={{ justifyContent: 'space-between', borderTop: '1px dashed black' }}>
                <Typography>Cost: </Typography>
                <Typography>$ {totalQuantity}.00</Typography>
            </Stack>
        </Box>
    );
}