import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Home, LightMode, NightlightRound } from "@mui/icons-material";
import Contact from "../pages/Contact";


export default function Footer({ swapTheme, theme }: any) {

    const navigate = useNavigate();

    return (

        <Box sx={{
            bottom: '0',
            width: '100%',
            display: 'flex',
            position: 'fixed',
            justifyContent: 'space-between',
        }}>
            <IconButton onClick={() => navigate("/")}  >
                {<Home />}
            </IconButton>
            <Contact />
            <IconButton onClick={() => swapTheme(!theme)} >
                {theme ? <LightMode /> : <NightlightRound />}
            </IconButton>
        </Box>
    )
}