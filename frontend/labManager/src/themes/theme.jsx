import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//Color desing

export const tokens = (mode) => ({
    ...(mode === "dark"
    ? {
        grey: {
            100: "#e5e8e8",
            200: "#cbd1d1",
            300: "#b2babb",
            400: "#98a3a4",
            500: "#7e8c8d",
            600: "#657071",
            700: "#4c5455",
            800: "#323838",
            900: "#191c1c"
        },
        primary: {
            100: "#d5d9dc",
            200: "#abb2b9",
            300: "#808c97",
            400: "#1f2a40",
            500: "#2c3f51",
            600: "#233241",
            700: "#1a2631",
            800: "#121920",
            900: "#090d10"
        },
        greenAccent: {
            100: "#dbf5ee",
            200: "#b7ebde",
            300: "#94e2cd",
            400: "#70d8bd",
            500: "#4cceac",
            600: "#3da58a",
            700: "#2e7c67",
            800: "#1e5245",
            900: "#0f2922"
        },
        redAccent: {
            100: "#fadbd8",
            200: "#f5b8b1",
            300: "#f1948b",
            400: "#ec7164",
            500: "#e74d3d",
            600: "#b93e31",
            700: "#8b2e25",
            800: "#5c1f18",
            900: "#2e0f0c"
        },
        blueAccent: {
            100: "#d4e6f1",
            200: "#a9cce3",
            300: "#7fb3d4",
            400: "#5499c6",
            500: "#2980b8",
            600: "#216693",
            700: "#194d6e",
            800: "#10334a",
            900: "#081a25"
        },
    } 
    : { 
        grey: {
            100: "#191c1c",
            200: "#323838",
            300: "#4c5455",
            400: "#657071",
            500: "#7e8c8d",
            600: "#98a3a4",
            700: "#b2babb",
            800: "#cbd1d1",
            900: "#e5e8e8",
        },
        primary: {
            100: "#090d10",
            200: "#121920",
            300: "#1a2631",
            400: "#E0EBF3",
            500: "#2c3f51",
            600: "#F0F7FC",
            700: "#808c97",
            800: "#abb2b9",
            900: "#d5d9dc",
        },
        greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        redAccent: {
            100: "#2e0f0c",
            200: "#5c1f18",
            300: "#8b2e25",
            400: "#b93e31",
            500: "#e74d3d",
            600: "#ec7164",
            700: "#f1948b",
            800: "#f5b8b1",
            900: "#fadbd8",
        },
        blueAccent: {
            100: "#081a25",
            200: "#10334a",
            300: "#194d6e",
            400: "#216693",
            500: "#2980b8",
            600: "#5499c6",
            700: "#7fb3d4",
            800: "#a9cce3",
            900: "#d4e6f1",
        },
     })
    
});

//mui theme settings

export const themeSettings = (mode) => {
    const colors = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
            ? {
                primary: {
                    main: colors.primary[500],
                },
                secondary: {
                    main: colors.greenAccent[400],
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: colors.primary[500]
                }
            } : {
                primary: {
                    main: colors.primary[100],
                },
                secondary: {
                    main: colors.greenAccent[500],
                },
                neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100]
                },
                background: {
                    default: "#fcfcfc",
                },
            }),
        },
        typography: {
            fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans 3", "Sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};


// Context for color mode

export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        [setMode]
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

    return [ theme, colorMode ]
}
