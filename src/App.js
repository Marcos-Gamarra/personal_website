import React from "react";
import { Route, Routes } from "react-router";
import Root from "./pages/Root";
import Wordle from "./pages/wordle/Wordle";
import Snake from "./pages/snake/Snake";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        type: 'light',
        background: {
            default: '#B9B7BD',
            paper: '#868B8E',
        },
        primary: {
            main: '#E7D2CC',
        },
        secondary: {
            main: '#EEEDE7',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#000000',
        },
    },
});

export default function App() {
    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/projects/wordle" element={<Wordle />} />
                    <Route path="/projects/snake" element={<Snake />} />
                </Routes>
            </ThemeProvider>
        </>
    )
}

