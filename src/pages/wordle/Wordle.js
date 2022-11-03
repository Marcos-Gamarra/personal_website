import * as React from 'react';
import WordleDesktop from './WordleDesktop';
import WordleMobile from './WordleMobile';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import Theme from 'Theme';

const theme = Theme;

const Wordle = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    width: '100vw',
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'background.default',
                }}
            >
                {isMobile ? <WordleMobile /> : <WordleDesktop />}
            </Box>
        </ThemeProvider>
    )
};

export default Wordle;

