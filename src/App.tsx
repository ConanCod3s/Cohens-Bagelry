import Header from "./Components/Header.tsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography"
import {useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme, darkTheme} from "./Theme/Base";
import CssBaseline from "@mui/material/CssBaseline";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export default function App() {
    const [theme, swapTheme] = useState<boolean>(true);

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Header/>
            <Container sx={{display: 'flex', justifyContent: 'space-around'}} maxWidth={'xl'}>
                <Box sx={{backgroundColor: 'blue'}}>
                    <Typography variant={'h6'}></Typography>

                </Box>
                <IconButton onClick={() => swapTheme(!theme)} sx={{position: 'fixed', bottom: '0'}}>
                    {theme ? <LightModeIcon/> : <NightlightRoundIcon/>}
                </IconButton>
            </Container>

        </ThemeProvider>
    )
}
