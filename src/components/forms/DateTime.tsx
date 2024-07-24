import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { Stack } from '@mui/material';


export default function DateTimeForPickup({ defaultValue, setDay, setTime }: any) {
    return (
        <div style={{ justifyContent: 'center', display: 'grid', textAlign: 'center' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                Select a Day and Time to request pickup
                <Stack direction='row'>
                    <DateField defaultValue={defaultValue} onChange={setDay} />
                    <TimeField defaultValue={defaultValue} onChange={setTime} />
                </Stack>
            </LocalizationProvider>
        </div>
    );
}