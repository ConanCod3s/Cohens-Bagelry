import Header from "./components/Header.tsx";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme, workingWindow } from "./theme/Base.tsx";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";

import { useUser } from './services/providers/User.tsx';
import LoginContainer from "./pages/LoginContainer.tsx";
import { Box, Container } from "@mui/material";

export default function App() {
    const { loggedIn } = useUser();
    const [themeMode, swapTheme] = useState<boolean>(true);

    return (
        <ThemeProvider theme={themeMode ? lightTheme : darkTheme}>
            <CssBaseline />
            <Header />
            <Box sx={{ height: workingWindow, overflow: 'auto', padding: 1 }}>
                {loggedIn ?
                    <Outlet /> : <LoginContainer />}
            </Box>
            <Footer themeMode={themeMode} swapTheme={swapTheme} />
        </ThemeProvider>
    )
}