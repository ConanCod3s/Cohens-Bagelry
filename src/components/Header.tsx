import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import { useNavigate } from "react-router-dom";
import { Stack } from '@mui/material';

/** Pages to add
 * 'Products', 'Pricing',
 */

const pages = ['Place Order', 'Contact', 'About'];

function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BakeryDiningIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, transform: `rotate(-${Math.floor(Math.random() * 361)}deg)` }} />
                    <Button
                        sx={{
                            color: 'white'
                        }}
                        onClick={() => navigate('/')}
                    >
                        <Stack>
                            <Typography
                                variant="h6"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 700,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }} > Cohen's Bagelry
                            </Typography>
                            <Typography
                                variant="caption"
                                noWrap
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }} > "That Bagel Place"
                            </Typography>
                        </Stack>
                    </Button>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => navigate(`/${page.replace(' ', '')}`)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default Header;
