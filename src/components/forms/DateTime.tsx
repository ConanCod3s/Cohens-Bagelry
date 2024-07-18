import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

const defaultValue = dayjs('2022-04-17T15:30');

export default function DateTimeForPickup({ setDay, setTime }: any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField', 'TimeField', 'DateTimeField']}>
                <DemoItem label="Day of Pickup">
                    <DateField defaultValue={defaultValue} onChange={setDay} />
                </DemoItem>
                <DemoItem label="Time for Pickup">
                    <TimeField defaultValue={defaultValue} onChange={setTime} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}