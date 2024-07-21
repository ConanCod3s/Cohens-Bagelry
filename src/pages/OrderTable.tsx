import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { getCollection } from '../constants/firebase/Calls';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { Popover } from '@mui/material';

export default function OrderTable() {
    const [rows, setRows] = useState<[]>([]);
    const [anchorEl, setAnchorEl] = useState<any>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => (setAnchorEl(null));

    const getData = async () => {
        await getCollection('orders').then((res: any) => {
            setRows(res)
        });
    };

    const openOrdersMenu = (e: React.MouseEvent) => {
        if (e.shiftKey) {
            getData();
            setAnchorEl(e.target);
        }
    };

    return (
        <div>
            <BakeryDiningIcon
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    mr: 1,
                    transform: `rotate(-${Math.floor(Math.random() * 361)}deg)`
                }}
                onClick={openOrdersMenu}
            />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Phone Number</TableCell>
                                <TableCell align="right">Date of Pick up</TableCell>
                                <TableCell align="right">Time of Pick up</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row: any) => (
                                <TableRow key={row.orderId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">{row.orderId}</TableCell>
                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.phoneNumber}</TableCell>
                                    <TableCell align="right">{row.day}</TableCell>
                                    <TableCell align="right">{row.time}</TableCell>
                                    {row.selections.map((sel: any) => {
                                        return (<span>
                                            <TableCell >{sel.type}</TableCell>
                                            <TableCell >{sel.quantity}</TableCell>
                                        </span>)
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Popover>
        </div>
    );
};