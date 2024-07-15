import { Box, Typography, Button } from '@mui/material';
// import Bagel404 from '../assets/bagel404.png';

export default function PageNotFound() {

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
            {/* <img src={Bagel404} alt="404 Bagel" style={{ width: '200px', height: '200px', marginBottom: '20px' }} /> */}
            <Typography variant="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: '#ff7043' }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ marginBottom: '20px', color: '#ff7043' }}>
                Uh-oh! You’re in a hole lot of trouble.
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: '20px', color: '#757575' }}>
                The page you’re looking for doesn’t exist. Maybe it’s time for a bagel break?
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.location.href = '/'}
                sx={{ backgroundColor: '#ff7043', ':hover': { backgroundColor: '#ff8a65' } }}
            >
                Go Back Home
            </Button>
        </Box>
    );
}