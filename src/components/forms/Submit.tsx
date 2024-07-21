import { Fragment, useState } from 'react';
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { getCount, setFireBaseDoc } from '../../constants/firebase/Calls';

interface AvailableTypes {
    value: string;
    label: string;
    quantity: number;
}

interface Props {
    uid: string,
    day: any,
    time: any,
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    selections: AvailableTypes[];
}

export default function Submit(props: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const [submitting, isSubmitting] = useState<boolean>(false);
    const [success, isSuccessful] = useState<boolean>(false);

    const totalQuantity = props.selections.reduce((a: number, b: AvailableTypes) => a + b.quantity, 0);

    // Validate all the required fields before submitting
    function validateProps() {
        if (props.firstName.length === 0) {
            enqueueSnackbar('Please add a First name', { variant: 'error' });
        } else if (props.email.length === 0) {
            enqueueSnackbar('Email Is Missing, please add a valid email', { variant: 'error' });
        } else if (props.phoneNumber.length === 0) {
            enqueueSnackbar('An invalid, incomplete, or no phone number was added', { variant: 'warning' });
        } else if (totalQuantity <= 0) {
            enqueueSnackbar('Please select a quantity over 0', { variant: 'error' });
        } else {
            handleOrder();
        }
    };

    async function handleOrder() {
        isSubmitting(true);
        const count = await getCount('orders');

        setFireBaseDoc({
            props: {
                orderedByUid: props.uid,
                firstName: props.firstName,
                lastName: props.lastName,
                phoneNumber: props.phoneNumber,
                orderId: "W-" + (count + 1).toString().padStart(4, '0'),
                day: props.day,
                time: props.time,
                selections: props.selections.map((obj: any) => ({ quantity: obj.quantity, type: obj.label })),
            },
            collectionName: 'orders'

        }).then(() => {
            enqueueSnackbar('Ordered', { variant: 'success' });
            isSuccessful(true);
            isSubmitting(false);
        })
    }

    return (
        <Fragment>
            <Button
                sx={{ width: '100%', height: 35 }}
                variant="contained"
                onClick={validateProps}
                disabled={success}
            >
                {submitting ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : success ? 'Thank you for your order!' : 'Place Order'}
            </Button>
            {success &&
                <Typography sx={{ textAlign: 'center' }}>Once your order has been placed, please allow 24 hours for me to contact you and to confirm.</Typography>}
        </Fragment>
    );
}
