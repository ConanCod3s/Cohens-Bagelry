import { createTheme } from "@mui/material";

// Buffers for static components, all in vh
export const header:number = 8;
export const footer: number = 4;
export const workingWindow: number = 100 - (header + footer);

const componentOverrides = {
    MuiTypography: {
        styleOverrides: {
            root: {
                fontWeight: 900,
            },
        },
    },
};

// Updated BaseTheme to include rustic theme typography settings
const BaseTheme = {
    typography: {
        fontSize: 16,
        fontWeight: 400, // Adjusted to be less bold than the original 900 to fit rustic styles better
        fontFamily: ['Garamond', 'Merriweather', 'serif'].join(","),
    },
};

const lightTheme = createTheme({
    ...BaseTheme,
    palette: {
        mode: "light",
        primary: {
            light: '#a98274',  // Lighter brown for a more subtle approach in light theme
            main: '#8b6f47',  // Medium brown to maintain rustic feel
            dark: '#5d4037',  // Dark brown as in dark theme
        },
        secondary: {
            light: '#ffb04c',  // Light burnt orange for light theme
            main: '#d84315',  // Burnt orange for rustic secondary color
            dark: '#bf360c',  // Darker shade of burnt orange
        },
    },
    components: {
        ...componentOverrides,
    },
});

const darkTheme = createTheme({
    ...BaseTheme,
    palette: {
        mode: "dark",
        primary: {
            light: '#5D4037',   // Lighter shade of dark brown
            main: '#3E2723',  // Dark walnut brown as primary dark color
            dark: '#321911',   // Even darker brown, almost black
        },
        secondary: {
            light: '#FF8A65',  // Lighter shade of burnt orange
            main: '#D84315',  // Burnt orange for rustic feel
            dark: '#BF360C',  // Darker shade of burnt orange
        },
        background: {
            default: '#3E2723', // Dark brown background
            paper: '#4E342E', // Slightly lighter brown for paper elements
        },
        text: {
            primary: '#FFFFFF', // White text for contrast
            secondary: '#F5F5F5', // Slightly off-white for secondary text
        },
    },
    components: {
        ...componentOverrides,
    },
});

export { lightTheme, darkTheme };
