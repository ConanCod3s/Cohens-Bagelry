import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Stack } from '@mui/material';
import { header } from '../theme/Base';
import BasicPopover from '../pages/OrderTable';

const pages = ['Order', 'About', 'Pictures'];

function Header() {
    const navigate = useNavigate();

    return (
        <AppBar position="sticky" sx={{ paddingLeft: 2, height: header }}>
            <Toolbar disableGutters>
                <BasicPopover />
                <Button
                    sx={{ color: 'white' }}
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
        </AppBar>
    );
}
export default Header;
