import { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function Email() {
    const [error, setError] = useState<{
        key: string,
        msg: string,
    } | null>(null);


    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <TextField
            label="Email"
            variant="outlined"
            required
            helperText={error && error.key === 'email' ? error.msg : ''}
            error={error && error.key === 'email' ? true : false}
            onChange={(event) => {
                const email = event.target.value;
                if (!validateEmail(email)) {
                    setError({ key: 'email', msg: 'Please enter a valid email address' });
                } else {
                    setError(null);
                }
            }}
        />
    )
}