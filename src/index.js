import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wordle from './pages/wordle/Wordle';
import Snake from './pages/snake/Snake';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<App />} />
                <Route path="/projects/wordle" element={<Wordle />} />
                <Route path="/projects/snake" element={<Snake />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

