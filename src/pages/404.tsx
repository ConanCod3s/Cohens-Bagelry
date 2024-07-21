import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f5f5f5',
                padding: 2
            }}
        >
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#ff7043' }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: '20px', color: '#ff7043' }}>
                Uh-oh! You're in a hole lot of trouble.
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px', color: '#757575' }}>
                The page you're looking for doesn't exist. Maybe it's time for a bagel break?
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
            >
                Go Back Home
            </Button>
        </Box>
    );
}