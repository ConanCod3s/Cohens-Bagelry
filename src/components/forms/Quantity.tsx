import { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface Error {
    key: string;
    msg: string;
}

interface AvailableType {
    value: string;
    label: string;
    quantity: number;
}

interface Props {
    availableTypes: AvailableType[];
    sakuin: number;
    setAvailableTypes: (types: AvailableType[]) => void;
    type: AvailableType;
}

export default function Quantity({ availableTypes, setAvailableTypes, type, sakuin }: Props) {
    const [error, setError] = useState<Error | null>(null);

    const updateAvailableTypes = (index: number, newQuantity: number) => {
        const updatedTypes = availableTypes.map((prevType, i) =>
            i === index ? { ...prevType, quantity: newQuantity } : prevType
        );
        setAvailableTypes(updatedTypes);
    };

    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        const totalQuantity = availableTypes.reduce((a, b) => a + b.quantity, 0);
        const newQuantity = Math.min(value, 12 - (totalQuantity - type.quantity));

        if (value < 0) {
            setError({ key: `${type.label}${sakuin}`, msg: 'Please select a number greater than 0' });
        } else if (value > 12) {
            setError({ key: `${type.label}${sakuin}`, msg: 'Maximum total quantity is 12' });
        } else {
            updateAvailableTypes(sakuin, newQuantity);
            setError(null);
        }
    };

    return (
        <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            helperText={error && error.key === `${type.label}${sakuin}` ? error.msg : ''}
            error={!!error && error.key === `${type.label}${sakuin}`}
            onChange={handleQuantityChange}
            InputLabelProps={{ shrink: true }}
            value={type.quantity}
            sx={{ zIndex: 0 }}
        />
    );
}
