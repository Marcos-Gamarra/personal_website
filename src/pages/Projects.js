import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const SnakeCard = () => {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate('/projects/snake');
    }, [navigate]);
    return (
        <Card
            sx={{
                maxWidth: {
                    xs: 300,
                    sm: 500,
                }
            }}
        >
            <CardActionArea
                onClick={onClick}
            >
                <CardHeader
                    title="Snake"
                    subheader="A simple snake game"
                    sx={{
                        textAlign: 'center',
                        borderBottom: '1px solid #000000',
                        
                    }}
                />
                <CardMedia
                    component="img"
                    image="./assets/snakeScreenshot.png"
                    alt="snake"
                />

            </CardActionArea>
        </Card >
    );
}

const WordleCard = () => {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate('/projects/wordle');
    }, [navigate]);
    return (
        <Card sx={{
            maxWidth: {
                xs: 300,
                sm: 500,
            }
        }}>
            <CardActionArea
                onClick={onClick}
            >
                <CardHeader
                    title="Wordle"
                    subheader="A simple clone of wordle"
                    style={{
                        textAlign: 'center',
                        borderBottom: '1px solid #000000',
                    }}
                />
                <CardMedia
                    component="img"
                    image="./assets/wordleScreenshot.png"
                    alt="wordle"

                />
            </CardActionArea>
        </Card>
    );

}


const Projects = React.forwardRef((_, ref) => {
    return (
        <Box
            ref={ref}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-evenly',
                alignItems: 'center',
                gridGap: { xs: '50px', sm: '0px' },
                padding: { xs: '50px', sm: '0px' },
                height: {
                    xs: 'auto',
                    md: `calc(100vh - 64px)`,
                },
                backgroundColor: 'background.default',
            }}
        >
            <WordleCard />
            <SnakeCard />
        </Box>
    );
});

export default Projects;
