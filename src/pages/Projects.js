import * as React from 'react';
import * as mui from '@mui/material';
import Wordle from './wordle/Wordle';

const Projects = React.forwardRef((_, ref) => {
    return (
        <mui.Grid item xs={12} ref={ref}>
            <mui.Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: {
                        //For mobile, appbar height is 56px
                        //appbar height in desktop is 64px
                        xs: `calc(100vh - 56px)`,
                        sm: window.innerHeight - 64,
                    },
                    bgcolor: 'background.default',
                }}
            >
                <Wordle />
            </mui.Box>
        </mui.Grid>
    );
});

export default Projects;
