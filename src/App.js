import React from "react";
import { Route, Routes } from "react-router";
import Root from "./pages/Root";
import Wordle from "./pages/wordle/Wordle";
import Snake from "./pages/snake/Snake";
import Theme from "./Theme";
import { ThemeProvider } from "@mui/material/styles";

const theme = Theme;

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

