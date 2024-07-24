import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, List, ListItem, Popover, Stack } from '@mui/material';
import { header } from '../theme/Base';
import OrderTablePopover from './OrderTablePopover';
import { getPages } from '../router/Router';
import { useState, useEffect, Fragment } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginContainer from '../pages/LoginContainer';

function Header() {
    const pages = getPages();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [loginDrawer, setLogginDrawer] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };


    const [anchorEl, setAnchorEl] = useState<any>(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClose = () => (setAnchorEl(null));
    const openDrawer = (e: React.MouseEvent) => {
        setAnchorEl(e.target);
    };

    return (
        <AppBar position="sticky" sx={{ height: header }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <OrderTablePopover />
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
                                display: { xs: 'flex', md: 'flex' },
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
                                display: { xs: 'flex', md: 'flex' },
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
                {windowWidth > 600 ?
                    <Fragment>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                            {pages.map((page: { path: string }, sakuin: number) => {
                                return <Button
                                    key={sakuin}
                                    onClick={() => navigate(`${page.path.replace(' ', '')}`)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page.path.replace('/', '')}
                                </Button>
                            })}

                        </Box>
                        <Box>
                            <IconButton onClick={openDrawer}>
                                <AccountCircleIcon />
                            </IconButton>
                            <Popover
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}>
                                <LoginContainer />
                            </Popover>
                        </Box>
                    </Fragment>
                    :
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>}
            </Toolbar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <List>
                    {pages.map((page: { path: string }, sakuin: number) => (
                        <ListItem key={sakuin} onClick={() => {
                            navigate(`${page.path.replace(' ', '')}`);
                            toggleDrawer(false)();
                        }}>
                            <Typography variant="body1">
                                {page.path.replace('/', '')}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </AppBar >
    );
}

export default Header;
