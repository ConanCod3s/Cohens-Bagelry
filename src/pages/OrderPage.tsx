import { useState, useMemo } from 'react';
import { Stack, Typography, Box, TextField, Divider, Grid } from '@mui/material';
import PhoneNumber from '../components/forms/PhoneNumber';
import Quantity from '../components/forms/Quantity';
import Submit from '../components/forms/Submit';
import Email from '../components/forms/Email';
import DateTimeForPickup from '../components/forms/DateTime';
import dayjs from 'dayjs';
import { useUser } from '../services/providers/User';

interface AvailableTypes {
    value: string;
    label: string;
    quantity: number;
}

const initialTypes: AvailableTypes[] = [
    { value: 'Plain', label: 'Plain', quantity: 0 },
    { value: 'Everything', label: 'Everything', quantity: 0 },
    { value: 'Poppy Seed', label: 'Poppy Seed', quantity: 0 },
    { value: 'Sesame Seed', label: 'Sesame Seed', quantity: 0 },
    { value: 'Chocolate Chip', label: 'Chocolate Chip', quantity: 0 },
    { value: 'Cinnamon Sugar', label: 'Cinnamon Sugar', quantity: 0 },
];

export default function OrderPage() {
    const { userInfo } = useUser();

    const [selections, setSelections] = useState<AvailableTypes[]>(initialTypes);

    const [email, setEmail] = useState<string>(userInfo?.email ?? '');
    const [lastName, setLastName] = useState<string>(userInfo?.lastName ?? '');
    const [firstName, setFirstName] = useState<string>(userInfo?.firstName ?? '');
    const [phoneNumber, setPhoneNumber] = useState<string>(userInfo?.phoneNumber ?? '');
    const [day, setDay] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 4).set('minute', 0));
    const [time, setTime] = useState<dayjs.Dayjs>(dayjs().add(2, 'day').startOf('day').set('hour', 4).set('minute', 0));

    const totalQuantity = useMemo(() => selections.reduce((sum, item) => sum + item.quantity, 0), [selections]);

    // Define time constraints
    const minTime = dayjs().startOf('day').set('hour', 4).set('minute', 0);
    const maxTime = dayjs().startOf('day').set('hour', 10).set('minute', 0);

    return (
        <Stack spacing={1}>
            {selections.map((type, index) => (
                <Grid container direction="row" sx={{ width: '100%', padding: 1 }} key={type.label + index}>
                    <Grid item xs={6} textAlign={'start'}>
                        <Typography>{type.label}</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign={'end'}>
                        <Box
                            component={Quantity}
                            type={type}
                            sakuin={index}
                            availableTypes={selections}
                            setAvailableTypes={setSelections}
                        />
                    </Grid>
                </Grid>
            ))}
            <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ paddingLeft: 1 }}>
                    <Typography>Total:</Typography>
                </Box>
                <Box sx={{ paddingRight: 1 }}>
                    <Typography>${totalQuantity}.00</Typography>
                </Box>
            </Stack>
            <Divider />
            <TextField
                id="first-name"
                label="First Name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />
            <TextField
                id="last-name"
                label="Last Name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />
            <PhoneNumber userPhoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
            <Email userEmail={email} setEmail={setEmail} />
            <DateTimeForPickup
                defaultValue={day}
                setDay={setDay}
                setTime={setTime}
                minTime={minTime}
                maxTime={maxTime}
            />
            <Submit
                uid={userInfo?.uid ?? ''}
                day={dayjs(day).format('YYYY-MM-DD')}
                time={dayjs(time).format('HH:mm:ss')}
                selections={selections.filter((item) => item.quantity > 0)}
                email={email}
                phoneNumber={phoneNumber}
                firstName={firstName}
                lastName={lastName}
            />
        </Stack>
    );
}
