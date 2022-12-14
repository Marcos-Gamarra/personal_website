import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Controls from './Controls'
import Theme from 'Theme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { useMediaQuery } from '@mui/material'

const theme = Theme

const gridSize = 20
const snakeColor = '#C3B090'

const initialBodyCoords = [
    [6, 10],
    [5, 10],
    [4, 10],
    [3, 10],
    [2, 10]
]

const generateFoodCoord = () => {
    const foodCoord = [
        Math.floor(Math.random() * gridSize),
        Math.floor(Math.random() * gridSize),
    ]

    return foodCoord
}


const PlayAgainBackdrop = ({
    open,
    score,
    playGame,
}) => {
    return (
        <Backdrop
            sx={{
                color: '#fff',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
            open={open}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                }}
            >
                <Typography variant="h3" gutterBottom component="div">
                    Game Over
                </Typography>
                <Typography variant="h3" gutterBottom component="div">
                    Your score: {score}
                </Typography>
                <Button
                    variant="contained"
                    onClick={playGame}
                    sx={{
                        backgroundColor: snakeColor,
                        marginTop: '1rem',
                        '&:hover': {
                            backgroundColor: snakeColor,
                            opacity: 0.7,
                        },
                    }}
                >
                    Play Again
                </Button>
            </Box>
        </Backdrop>
    )
}


const Scoreboard = ({ score, playGame, cellSize }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const onClick = () => {
        setIsButtonDisabled(true)
        playGame()
    }
    return (
        <Box
            sx={{
                display: 'flex',
                displayDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                height: cellSize * 3,
                width: cellSize * gridSize,
                fontSize: '1.5rem',
                fontWeight: 'bold',
                bgcolor: '#C3B090',
                border: '1px solid #000',
                borderRadius: `${cellSize}px ${cellSize}px 0 0`,
            }}
        >
            <div>Score: {score}</div>
            <Button
                variant="contained"
                onClick={onClick}
                sx={{
                    height: cellSize * 2,
                    backgroundColor: '#704F70',
                    '&:hover': {
                        backgroundColor: '#704F70',
                        opacity: 0.9,
                    },
                    opacity: isButtonDisabled ? 0 : 1,
                }}
                disabled={isButtonDisabled}

            >
                Play Game
            </Button>
        </Box>
    )
}

const RowOfGrid = ({ rowNumber, cellSize }) => {
    let color1 = '#704F70'
    let color2 = '#929580'

    if (rowNumber % 2 === 0) {
        const temp = color1
        color1 = color2
        color2 = temp
    }
    return (
        <Box
            sx={{
                width: cellSize * gridSize,
                height: cellSize,
                opacity: 0.5,
                background: `repeating-linear-gradient(
                    to right,
                    ${color1},
                    ${color1} ${cellSize}px,
                    ${color2} ${cellSize + 1}px,
                    ${color2} ${cellSize * 2}px
                )`,
            }}
        />
    )
}

const SnakeGrid = ({cellSize}) => {
    return [...Array(gridSize)].map((_, i) => {
        return <RowOfGrid key={i} rowNumber={i} cellSize={cellSize}/>
    })
}



const Food = ({ coord, cellSize }) => {
    return (
        <Box
            component="img"
            src="../assets/apple.png"
            height={cellSize}
            width={cellSize}
            position='absolute'
            left={coord[0] * cellSize}
            top={coord[1] * cellSize}
        />
    )
}

const BodyPart = ({ bgcolor, coord, cellSize }) => {
    return (
        <Box
            sx={{
                width: cellSize,
                height: cellSize,
                bgcolor: bgcolor,
                position: 'absolute',
                left: coord[0] * cellSize,
                top: coord[1] * cellSize,
            }}
        />
    )
}

const Snake = () => {
    const [direction, setDirection] = useState('right')
    const [foodCoords, setFoodCoords] = useState(generateFoodCoord())
    const [headRotation, setHeadRotation] = useState(270)
    const [score, setScore] = useState(0)
    const [bodyCoords, setBodyCoords] = useState(initialBodyCoords)
    const [backdropOpen, setBackdropOpen] = useState(false)
    const [isGameRunning, setIsGameRunning] = useState(false)

    const isMobile = useMediaQuery('(max-width: 600px)')
    const cellSize = isMobile ? 15 : 30

    const playGame = () => {
        setScore(0)
        setBodyCoords(initialBodyCoords)
        setFoodCoords(generateFoodCoord())
        setDirection('right')
        setHeadRotation(270)
        setBackdropOpen(false)
        setIsGameRunning(true)
    }


    const checkCollisionWithBody = () => {
        const head = bodyCoords[0]
        const body = bodyCoords.slice(1)
        return body.find(
            (coord) => coord[0] === head[0] && coord[1] === head[1]
        )
    }

    const checkCollisionWithWall = () => {
        const head = bodyCoords[0]
        return (
            head[0] < 0 || head[0] >= gridSize || head[1] < 0 || head[1] >= gridSize
        )
    }

    const foodEaten = () => {
        if (bodyCoords[0][0] === foodCoords[0] && bodyCoords[0][1] === foodCoords[1]) {
            return true
        }
        return false
    }

    const fillCoords = (head, direction) => {
        let newCoords = [...bodyCoords]
        switch (direction) {
            case 'right':
                newCoords[0] = [head[0] + 1, head[1]]
                break
            case 'left':
                newCoords[0] = [head[0] - 1, head[1]]
                break
            case 'up':
                newCoords[0] = [head[0], head[1] - 1]
                break
            case 'down':
                newCoords[0] = [head[0], head[1] + 1]
                break
            default:
                break
        }

        for (let i = 1; i < newCoords.length; i++) {
            newCoords[i] = bodyCoords[i - 1]
        }

        return newCoords
    }

    useEffect(() => {
        if (isGameRunning) {
            const keydownHandler = (e) => {
                switch (e.key) {
                    case 'ArrowUp':
                        window.removeEventListener('keydown', keydownHandler)
                        if (direction === 'down') break
                        setDirection('up')
                        setHeadRotation(180)
                        break
                    case 'ArrowDown':
                        window.removeEventListener('keydown', keydownHandler)
                        if (direction === 'up') break
                        setDirection('down')
                        setHeadRotation(0)
                        break
                    case 'ArrowLeft':
                        window.removeEventListener('keydown', keydownHandler)
                        if (direction === 'right') break
                        setDirection('left')
                        setHeadRotation(90)
                        break
                    case 'ArrowRight':
                        window.removeEventListener('keydown', keydownHandler)
                        if (direction === 'left') break
                        setDirection('right')
                        setHeadRotation(270)
                        break
                    case ' ':
                        clearInterval(interval)
                        window.removeEventListener('keydown', keydownHandler)
                        break
                    default:
                        break
                }
            }

            window.addEventListener('keydown', keydownHandler)

            const interval = setInterval(() => {
                if (checkCollisionWithBody() || checkCollisionWithWall()) {
                    clearInterval(interval)
                    window.removeEventListener('keydown', keydownHandler)
                    setBackdropOpen(true)
                    return
                }

                if (foodEaten()) {
                    const tail = bodyCoords[bodyCoords.length - 1]
                    const newCoords = fillCoords(bodyCoords[0], direction)
                    setScore(score + 1)
                    setFoodCoords(generateFoodCoord())
                    setBodyCoords([...newCoords, tail])
                } else {
                    setBodyCoords(fillCoords(bodyCoords[0], direction))
                }
            }, 80)

            return () => {
                clearInterval(interval)
                window.removeEventListener('keydown', keydownHandler)
            }
        }
    })


    const head =
        <Box
            key={0}
            component="img"
            src="../assets/snake.png"
            height={cellSize}
            width={cellSize}
            position='absolute'
            left={bodyCoords[0][0] * cellSize}
            top={bodyCoords[0][1] * cellSize}
            style={{ transform: `rotate(${headRotation}deg)` }}
        />

    const snake = [head]
    bodyCoords.slice(1).forEach((coord, i) => {
        snake.push(<BodyPart key={i + 1} bgcolor={snakeColor} coord={coord} cellSize={cellSize}/>)
    })

    return (
        <ThemeProvider theme={theme}>
            <PlayAgainBackdrop
                open={backdropOpen}
                score={score}
                playGame={playGame}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    height: '100vh',
                    width: '100vw',
                    backgroundColor: 'background.paper'
                }}
            >

                <Box>
                    <Scoreboard score={score} playGame={playGame} cellSize={cellSize} />
                    <Box
                        sx={{
                            width: cellSize * gridSize,
                            height: cellSize * gridSize,
                            bgcolor: 'grey',
                            position: 'relative',
                            borderLeft: '1px solid #000',
                            borderRight: '1px solid #000',
                            borderBottom: '1px solid #000',
                            borderRadius: `0 0 ${cellSize}px ${cellSize}px`,
                            overflow: 'hidden'
                        }}
                    >
                        <SnakeGrid cellSize={cellSize}/>
                        {snake}
                        <Food coord={foodCoords} cellSize={cellSize} />
                    </Box>
                </Box>
                <Controls />
            </Box>
        </ThemeProvider >
    )
}

export default Snake

