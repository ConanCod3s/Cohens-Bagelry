import Header from "./components/Header.tsx";
import Container from "@mui/material/Container";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/Base.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";

export default function App() {
    const [theme, swapTheme] = useState<boolean>(true);

    return (
        <ThemeProvider theme={theme ? lightTheme : darkTheme}>
            <CssBaseline />
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'space-around' }} maxWidth={'xl'}>
                <Outlet />
            </Container>
            <Footer theme={theme} swapTheme={swapTheme} />
        </ThemeProvider>
    )
}
