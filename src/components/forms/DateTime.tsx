import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';


export default function DateTimeForPickup({ defaultValue, setDay, setTime }: any) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField', 'TimeField', 'DateTimeField']}>
                <DemoItem label="Requested day for pickup">
                    <DateField defaultValue={defaultValue} onChange={setDay} />
                </DemoItem>
                <DemoItem label="Requested time for pickup">
                    <TimeField defaultValue={defaultValue} onChange={setTime} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
    );
}