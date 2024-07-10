import { useState } from 'react';
import TextField from '@mui/material/TextField';

interface Props {
    setPhoneNumber: (email: string) => void
}

export default function PhoneNumber({ setPhoneNumber }: Props) {
    const [error, setError] = useState<{
        key: string,
        msg: string,
    } | null>(null);

    const validatePhoneNumber = (phoneNumber: string) => {
        const regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return regex.test(phoneNumber);
    };

    return (
        <TextField
            label="Phone Number"
            variant="outlined"
            name="phone"
            helperText={error && error.key === 'phone' ? error.msg : ''}
            // Since error can be null we have to do a bool check and return a bool.... 
            error={error && error.key === 'phone' ? true : false}
            onChange={(event) => {
                const phoneNumber = event.target.value;
                if (!validatePhoneNumber(phoneNumber)) {
                    setPhoneNumber('')
                    setError({ key: 'phone', msg: 'Please enter a valid phone number (e.g. 123-456-7890)' });
                } else {
                    setPhoneNumber(phoneNumber)
                    setError(null);
                }
            }}
        />
    )
}