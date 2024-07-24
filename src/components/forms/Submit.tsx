import { useState } from 'react';
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { getCount, setFireBaseDoc } from '../../services/firebase/Calls';

interface AvailableTypes {
    value: string;
    label: string;
    quantity: number;
}

interface Props {
    uid: string;
    day: any;
    time: any;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    selections: AvailableTypes[];
}

export default function Submit({
    uid,
    day,
    time,
    firstName,
    lastName,
    email,
    phoneNumber,
    selections
}: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const totalQuantity = selections.reduce((a, b) => a + b.quantity, 0);

    // Validate all the required fields before submitting
    const validateProps = () => {
        if (!firstName.trim()) {
            enqueueSnackbar('Please add a First name', { variant: 'error' });
        } else if (!email.trim()) {
            enqueueSnackbar('Email Is Missing, please add a valid email', { variant: 'error' });
        } else if (!phoneNumber.trim()) {
            enqueueSnackbar('An invalid, incomplete, or no phone number was added', { variant: 'warning' });
        } else if (totalQuantity <= 0) {
            enqueueSnackbar('Please select a quantity over 0', { variant: 'error' });
        } else {
            handleOrder();
        }
    };

    const handleOrder = async () => {
        setSubmitting(true);
        try {
            const count = await getCount('orders');
            await setFireBaseDoc({
                props: {
                    orderedByUid: uid,
                    firstName,
                    lastName,
                    phoneNumber,
                    orderId: `W-${(count + 1).toString().padStart(4, '0')}`,
                    day,
                    time,
                    selections: selections.map(obj => ({
                        quantity: obj.quantity,
                        type: obj.label,
                    })),
                },
                collectionName: 'orders'
            });
            enqueueSnackbar('Ordered', { variant: 'success' });
            setSuccess(true);
        } catch (error) {
            enqueueSnackbar('Failed to place order', { variant: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Box sx={{ width: '100%', height: 35, textAlign: 'center' }}>
            <Button
                variant="contained"
                onClick={validateProps}
                disabled={success || submitting}
            >
                {submitting ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : success ? 'Thank you for your order!' : 'Place Order'}
            </Button>
            {success && (
                <Typography sx={{ textAlign: 'center' }}>
                    Once your order has been placed, please allow 24 hours for me to contact you and to confirm.
                </Typography>
            )}
        </Box>
    );
}