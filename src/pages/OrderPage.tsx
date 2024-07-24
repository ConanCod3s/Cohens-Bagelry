import { useState } from 'react';
import PhoneNumber from '../components/forms/PhoneNumber';
import TextField from '@mui/material/TextField';
import { Stack, Typography, Box } from '@mui/material';
import Quantity from '../components/forms/Quantity';
import Submit from '../components/forms/Submit';
import Email from '../components/forms/Email.tsx';
import DateTimeForPickup from '../components/forms/DateTime.tsx';
import dayjs from 'dayjs';
import { useUser } from '../services/providers/User';

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
    const { userInfo } = useUser();

    const [selections, setSelections] = useState<{
        value: string,
        label: string,
        quantity: number
    }[]>(typesArr);

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
    const [firstName, setFirstName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const totalQuantity = selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    return (
        <Stack spacing={1} >
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
        </Stack>
    );
}