import Header from "./Components/Header.tsx";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography"
import {useState} from "react";
import {ThemeProvider} from "@mui/material/styles";
import {lightTheme, darkTheme} from "./Theme/Base";
import CssBaseline from "@mui/material/CssBaseline";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import IconButton from "@mui/material/IconButton";

export default function App() {
    const [theme, swapTheme] = useState<boolean>(true);

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Box sx={{height: '100vh'}}>
                <Header/>
                <Container maxWidth={'xl'} sx={{display: 'flex', justifyContent: 'space-around', height: '100%'}}>
                    <Typography variant={'h6'}>Cohen's Bagelry</Typography>
                </Container>
                <Box sx={{
                    position: 'sticky',
                    bottom: '0',
                }}  >
                    <IconButton onClick={() => swapTheme(!theme)}>
                        {theme ? <LightModeIcon/> : <NightlightRoundIcon/>}
                    </IconButton>
                </Box>
            </Box>
        </ThemeProvider>
    )
}
