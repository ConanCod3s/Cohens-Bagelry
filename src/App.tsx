import Header from "./components/Header.tsx";
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
            <Outlet />
            <Footer themeMode={themeMode} swapTheme={swapTheme} />
        </ThemeProvider>
    )
}
