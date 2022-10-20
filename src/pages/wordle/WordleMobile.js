import * as React from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import VirtualKeyboard from './VirtualKeyboard';

const Square = (letter, color, key) => {
    return (
        <Box
            sx={{
                display: "flex",
                bgcolor: color,
                margin: '5px',
                borderRadius: '10%',
                height: { xs: '50px', sm: '100px' },
                width: { xs: '50px', sm: '100px' },
                justifyContent: 'center',
                alignItems: 'center',
            }}
            key={key}
        >
            <Typography variant="boxLetter" >
                {letter}
            </Typography>
        </Box>
    );
};

const WordleMobile = () => {
    const [currentRowIndex, setCurrentRowIndex] = React.useState(0);
    const [target, setTarget] = React.useState("");
    const [buttonLabel, setButtonLabel] = React.useState("Play Game");
    const [word, setWord] = React.useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = React.useState(false);

    const [squares, setSquares] = React.useState(
        [1, 2, 3, 4, 5].map((row) =>
            [1, 2, 3, 4, 5].map((column) =>
                Square(' ', 'primary.main', `${row}${column}`)
            )
        )
    );

    const handleClick = (key) => {
        let newWord = word;
        if (key === "backspace") {
            newWord = newWord.slice(0, -1);
        } else {
            newWord = newWord + key;
        }
        //newWord is the value of the word with the new letter
        if (newWord.length > 5) {
            return;
        }

        const word_as_array = ["", "", "", "", ""];
        newWord.split('').forEach((letter, index) => {
            word_as_array[index] = letter;
        });

        let updatedRow = word_as_array.map((letter, index) => {
            const key = currentRowIndex.toString() + index.toString();
            return Square(letter.toUpperCase(), 'primary.main', key);
        });

        const updatedSquares = squares.map(row => row);
        updatedSquares[currentRowIndex] = updatedRow;
        setSquares(updatedSquares);
        setWord(newWord);
    }

    const handleSubmit = async () => {
        if (currentRowIndex === 5) {
            resetSquares();
            setWord('');
            setCurrentRowIndex(0);
        }

        if (target === "") {
            getWord();
            setButtonLabel("Check Word");
            setIsKeyboardVisible(true);
            return;
        }

        if (word.length !== 5) {
            return;
        }

        const isValidWord = await checkWord(word);

        if (isValidWord === false) {
            alert("Not a valid word");
            return;
        }

        setCurrentRowIndex(currentRowIndex + 1);

        if (word === target.toString()) {
            alert("Correct!");
            setCurrentRowIndex(5);
            setTarget('');
            setButtonLabel("Play Again");
            setIsKeyboardVisible(false);

        } else if (currentRowIndex === 4) {
            alert("Game Over.\nThe word was: " + target);
            setButtonLabel("Play Again");
            setIsKeyboardVisible(false);
            setTarget('');
            return;
        }

        const paintedSquares = paintSquares(target.toString().toUpperCase().split(""));
        const updatedSquares = squares.map(row => row);
        updatedSquares[currentRowIndex] = paintedSquares;
        setSquares(updatedSquares);
        setWord('');

    }

    const paintSquares = (target) => {
        let paintedSquares = [];
        let word_as_array = ["", "", "", "", ""];
        word.toUpperCase().split('').forEach((letter, index) => {
            word_as_array[index] = letter;
        });

        word_as_array.forEach((letter, index) => {
            const key = currentRowIndex.toString() + index.toString();
            if (target.includes(letter)) {
                if (target[index] === letter) {
                    paintedSquares.push(Square(letter, 'green', key));
                } else {
                    paintedSquares.push(Square(letter, 'orange', key));
                }
            } else {
                paintedSquares.push(Square(letter, 'primary.main', key));
            }
        });

        return paintedSquares;
    }

    const resetSquares = () => {
        setSquares(
            [1, 2, 3, 4, 5].map((row) =>
                [1, 2, 3, 4, 5].map((column) =>
                    Square(' ', 'primary.main', `${row}${column}`)
                )
            ));
    }

    async function getWord() {
        try {
            const response = await fetch('https://marcosrene.ga/wordle/get_word');
            const data = await response.text();
            setTarget(data);
        } catch (error) {
            console.log(error);
        }

    }

    async function checkWord(word) {
        word = word.toLowerCase();
        let res = await fetch(`https://marcosrene.ga/check_word/${word}`);
        let data = await res.text();
        if (data === 'true') {
            return true;
        }
        return false;
    }

    return (
        <Stack
            alignItems="center"
            spacing={4}
        >
            <Typography variant="h3" component="div" color="white">
                Wordle
            </Typography>
            <Box>
                <Box display="flex">{squares[0]}</Box>
                <Box display="flex">{squares[1]}</Box>
                <Box display="flex">{squares[2]}</Box>
                <Box display="flex">{squares[3]}</Box>
                <Box display="flex">{squares[4]}</Box>
            </Box>

            <Button variant="contained">
                <Typography
                    variant="body1"
                    sx={{
                        fontsize: "40px",
                        color: "#eeeeee",
                    }}
                    onClick={() => {
                        handleSubmit();
                    }}
                >
                    {buttonLabel}
                </Typography>
            </Button>

            <VirtualKeyboard handleClick={handleClick} visible={isKeyboardVisible} />

        </Stack>

    );
}

export default WordleMobile;
