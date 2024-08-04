import Header from "./components/Header";
import { Fragment } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, workingWindow } from "./theme/Base";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
// import Footer from "./components/Footer";
import { useUser } from './services/providers/User';
import LoginContainer from "./pages/LoginContainer";
import { Box } from "@mui/material";
import Pictures from "./pages/Pictures";

export default function App() {
    const { loggedIn } = useUser();
    // const [themeMode, swapThemeMode] = useState<boolean>(true);

    return (
        <ThemeProvider theme={lightTheme}>
            {/* <ThemeProvider theme={themeMode ? lightTheme : darkTheme}> */}
            <CssBaseline />
            <Header />
            <Box sx={{ height: workingWindow, overflow: 'auto', padding: 1 }}>
                {loggedIn ? (
                    <Outlet />
                ) : (
                    <Fragment>
                        <LoginContainer />
                        <Pictures />
                    </Fragment>
                )}
            </Box>
            {/* <Footer themeMode={themeMode} swapThemeMode={swapThemeMode} /> */}
        </ThemeProvider>
    );
}