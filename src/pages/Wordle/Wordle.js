import * as React from 'react';
import WordleDesktop from './WordleDesktop';
import WordleMobile from './WordleMobile';
import useMediaQuery from '@mui/material/useMediaQuery';

const Wordle = () => {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return isMobile ? <WordleMobile /> : <WordleDesktop />;
};

export default Wordle;

