import Header from "./components/Header.tsx";
import Container from "@mui/material/Container";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/Base.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";

export default function App() {
    const [themeMode, swapTheme] = useState<boolean>(true);

    return (
        <ThemeProvider theme={themeMode ? lightTheme : darkTheme}>
            <CssBaseline />
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }} maxWidth={'xl'}>
                <Outlet />
            </Container>
            <Footer themeMode={themeMode} swapTheme={swapTheme} />
        </ThemeProvider>
    )
}
