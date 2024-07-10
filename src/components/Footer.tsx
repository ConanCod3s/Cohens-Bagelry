import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { BottomNavigation, Tooltip } from "@mui/material";
import { Home, LightMode, NightlightRound, Email } from "@mui/icons-material";


export default function Footer({ swapTheme, themeMode }: any) {

    const navigate = useNavigate();

    return (
        <BottomNavigation
            sx={{
                height: 40,
                bottom: '0',
                width: '100%',
                position: 'fixed',
                justifyContent: 'space-between',
            }}>
            <Tooltip title='Home'>
                <IconButton onClick={() => navigate("/")}  >
                    {<Home />}
                </IconButton>
            </Tooltip>

            <Tooltip title={'Contact@cohensbagelry.com'}>
                <IconButton onClick={() => {
                    window.open("mailto:Contact@cohensbagelry.com?subject=Place Order", '');
                }} >
                    {<Email />}
                </IconButton>
            </Tooltip>

            <Tooltip title={themeMode ? "Dark Mode" : "Light Mode"}>
                <IconButton onClick={() => swapTheme(!themeMode)} >
                    {themeMode ? <NightlightRound /> : <LightMode />}
                </IconButton>
            </Tooltip>
        </BottomNavigation >

        // <Box sx={(theme) => (
        //     {
        //         bottom: '0',
        //         width: '100%',
        //         display: 'flex',
        //         position: 'fixed',
        //         boxShadow: `0px 0px 5px .1px black`,
        //         background: themeMode ? theme.palette.primary.main : theme.palette.primary.light,
        //         justifyContent: 'space-between',
        //     }
        // )}>
        //     <IconButton onClick={() => navigate("/")}  >
        //         {<Home />}
        //     </IconButton>
        //     <Contact />
        //     <IconButton onClick={() => swapTheme(!themeMode)} >
        //         {themeMode ? <LightMode /> : <NightlightRound />}
        //     </IconButton>
        // </Box>
    )
}
