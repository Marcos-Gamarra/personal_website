import * as React from 'react';
import * as mui from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardHeader from '@mui/material/CardHeader';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

const SnakeCard = () => {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate('/projects/snake');
    }, [navigate]);
    return (
        <Card
            sx={{ maxWidth: 500 }}
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
                    height="500"
                    image="./assets/snakeScreenshot.png"
                    alt="snake"
                />

            </CardActionArea>
        </Card>
    );
}

const WordleCard = () => {
    const navigate = useNavigate();
    const onClick = useCallback(() => {
        navigate('/projects/wordle');
    }, [navigate]);
    return (
        <Card sx={{ maxWidth: 500 }}>
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
                    height="500"
                    image="./assets/wordleScreenshot.png"
                    alt="wordle"
                />
            </CardActionArea>
        </Card>
    );

}


const Projects = React.forwardRef((_, ref) => {
    return (
        <mui.Box ref={ref}
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
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
            <WordleCard />
            <SnakeCard />
        </mui.Box>
    );
});

export default Projects;
