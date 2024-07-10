import { useState } from 'react';
import TextField from '@mui/material/TextField';

interface Error {
    key: string,
    msg: string,
}

interface AvailableTypes {
    value: string,
    label: string,
    quantity: number
}

interface Props {
    availableTypes: AvailableTypes[],
    sakuin: number,
    setAvailableTypes: any,
    type: AvailableTypes
}

export default function Quantity({ availableTypes, setAvailableTypes, type, sakuin }: Props) {
    const [error, setError] = useState<Error | null>(null);

    const updateAvailableTypes = (index: number, newQuantity: number) => {
        setAvailableTypes((prevTypes: []) =>
            prevTypes.map((prevType: [], i: number) =>
                i === index ? { ...prevType, quantity: newQuantity } : prevType
            )
        );
    };

    return (
        <TextField
            id="outlined-number"
            label="Quantity"
            type="number"
            helperText={
                error && error.key === type.label + sakuin ? error!.msg : null
            }
            // Since error can be null we have to do a bool check and return a bool.... 
            error={error && error.key === type.label + sakuin ? true : false}
            onChange={(event) => {
                const value = parseInt(event.target.value);
                const totalQuantity = availableTypes.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);
                const newQuantity = Math.min(value, 24 - (totalQuantity - type.quantity));

                if (value < 0) {
                    setError({ key: type.label + sakuin, msg: 'Please select a number greater than 0' });
                } else {
                    updateAvailableTypes(sakuin, newQuantity);
                    setError(null);
                }
            }}
            sx={{ zIndex: 0 }}
            InputLabelProps={{ shrink: true }}
            value={type.quantity}
        />
    )
}