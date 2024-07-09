import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Home, LightMode, NightlightRound } from "@mui/icons-material";
import Contact from "../pages/Contact";


export default function Footer({ swapTheme, themeMode }: any) {

    const navigate = useNavigate();

    return (

        <Box sx={(theme) => (
            {
                bottom: '0',
                width: '100%',
                display: 'flex',
                position: 'fixed',
                boxShadow: `0px 0px 5px .1px black`,
                background: themeMode ? theme.palette.primary.main : theme.palette.primary.light,
                justifyContent: 'space-between',
            }
        )}>
            <IconButton onClick={() => navigate("/")}  >
                {<Home />}
            </IconButton>
            <Contact />
            <IconButton onClick={() => swapTheme(!themeMode)} >
                {themeMode ? <LightMode /> : <NightlightRound />}
            </IconButton>
        </Box>
    )
}