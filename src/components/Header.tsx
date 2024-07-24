import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    Popover,
    Stack,
    Grid
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { header } from '../theme/Base';
import OrderTablePopover from './OrderTablePopover';
import { getPages } from '../router/Router';
import LoginContainer from '../pages/LoginContainer';

const Header = () => {
    const pages = getPages();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDrawerToggle = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        navigate(path.replace(' ', ''));
        if (drawerOpen) {
            setDrawerOpen(false);
        }
    };

    return (
        <AppBar position="sticky" sx={{ height: header }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <OrderTablePopover />
                <Button sx={{ color: 'white' }} onClick={() => navigate('/')}>
                    <Stack>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            Cohen's Bagelry
                        </Typography>
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'monospace',
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            "That Bagel Place"
                        </Typography>
                    </Stack>
                </Button>
                {windowWidth > 600 ? (
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            {pages.map((page, sakuin) => (
                                <Button
                                    key={page.path + '' + sakuin}
                                    onClick={() => handleNavigation(page.path)}
                                    sx={{ my: 2, color: 'white' }}
                                >
                                    {page.path.replace('/', '')}
                                </Button>
                            ))}
                        </Box>
                        <Box>
                            <IconButton onClick={handlePopoverOpen}>
                                <AccountCircleIcon />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handlePopoverClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <LoginContainer />
                            </Popover>
                        </Box>
                    </>
                ) : (
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={handleDrawerToggle(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
            </Toolbar>
            <Drawer
                sx={{ '&. MuiDrawer': { justifyContent: 'space-between' } }}
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle(false)}
            >
                <Grid container direction='column' justifyContent={'space-between'} height={'100%'}>
                    <Grid item>
                        <List>
                            {pages.map((page, sakuin) => (
                                <ListItem
                                    key={page.path + 'List' + sakuin}
                                    onClick={() => handleNavigation(page.path)}
                                >
                                    <Typography variant="body1">
                                        {page.path.replace('/', '')}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Grid>
                    <Grid item>
                        <LoginContainer />
                    </Grid>
                </Grid>

            </Drawer>
        </AppBar>
    );
};

export default Header;