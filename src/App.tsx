import Header from "./components/Header.tsx";
import Container from "@mui/material/Container";
import { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./theme/Base.tsx";
import CssBaseline from "@mui/material/CssBaseline";

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer.tsx";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from './constants/firebase/Calls.tsx';

export default function App() {
    const [themeMode, swapTheme] = useState<boolean>(true);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            console.log('**********', uid)
            // ...
        } else {
            // User is signed out
            // ...
        }
    });

    return (
        <ThemeProvider theme={themeMode ? lightTheme : darkTheme}>
            <CssBaseline />
            <Header />
            <Container sx={{ display: 'flex', justifyContent: 'space-around', paddingTop: 2, paddingBottom: 5 }} maxWidth={'xl'}>
                <Outlet />
            </Container>
            <Footer themeMode={themeMode} swapTheme={swapTheme} />
        </ThemeProvider>
    )
}
