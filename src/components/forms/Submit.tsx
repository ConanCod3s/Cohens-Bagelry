import { Fragment, useState } from 'react';
import { Box, Button, LinearProgress } from "@mui/material";
import { useSnackbar } from 'notistack';
import { auth, getCount, setFireBaseDoc } from '../../constants/firebase/Calls';

interface AvailableTypes {
    value: string;
    label: string;
    quantity: number;
}

interface Props {
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
            console.log('Ordered');
            // isSubmitting(true);
            handleOrder();
        }
    };

    async function handleOrder() {
        const count = await getCount('orders');

        setFireBaseDoc({
            props: { ...props, orderId: count + 1 },
            collectionName: 'orders'
        })
    }

    return (
        <Fragment>
            <Button
                sx={{ width: '100%', height: 35 }}
                variant="contained"
                onClick={validateProps}
                disabled={submitting}
            >
                {submitting ? (
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box>
                ) : 'Place Order'}
            </Button>
        </Fragment>
    );
}
