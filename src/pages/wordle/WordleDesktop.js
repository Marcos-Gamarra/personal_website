import * as React from 'react';
import * as mui from '@mui/material';

const Square = (letter, color, key) => {
    return (
        <mui.Box
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
            <mui.Typography variant="boxLetter" >
                {letter}
            </mui.Typography>
        </mui.Box>
    );
};



//represent a single row, composed of 5 squares
const WordleDesktop = () => {
    const [squares, setSquares] = React.useState(
        [1, 2, 3, 4, 5].map((row) =>
            [1, 2, 3, 4, 5].map((column) =>
                Square(' ', 'primary.main', `${row}${column}`)
            )
        )
    );

    const [currentRowIndex, setCurrentRowIndex] = React.useState(0);
    const [target, setTarget] = React.useState("");
    const [buttonLabel, setButtonLabel] = React.useState("Play Game");

    const inputRef = React.useRef();

    const handleChange = (value, currentRow) => {
        if (value.length > 5) {
            value = value.substring(0, 5);
            return;
        }

        const word_as_array = ["", "", "", "", ""];
        value.split('').forEach((letter, index) => {
            word_as_array[index] = letter;
        });

        let updatedRow = word_as_array.map((letter, index) => {
            const key = currentRow.toString() + index.toString();
            return Square(letter.toUpperCase(), 'primary.main', key);
        });
        const updatedSquares = squares.map(row => row);
        updatedSquares[currentRow] = updatedRow;
        setSquares(updatedSquares);
    }

    const handleSubmit = async () => {
        if (currentRowIndex === 5) {
            resetSquares();
            inputRef.current.value = '';
            setCurrentRowIndex(0);
        }

        if (target === "") {
            getWord();
            setButtonLabel("Check Word");
            inputRef.current.disabled = false;
            inputRef.current.focus();
            return;
        }

        if (inputRef.current.value.length !== 5) {
            return;
        }

        const isValidWord = await checkWord(inputRef.current?.value);

        if (isValidWord === false) {
            alert("Not a valid word");
            return;
        }


        setCurrentRowIndex(currentRowIndex + 1);

        if (inputRef.current.value === target.toString()) {
            alert("Correct!");
            inputRef.current.disabled = true;
            setButtonLabel("Play Again");
            setTarget('');
            setCurrentRowIndex(5);
        } else if (currentRowIndex === 4) {
            inputRef.current.disabled = true;
            inputRef.current.value = "";
            alert("Game Over.\nThe word was: " + target);
            setButtonLabel("Play Again");
            setTarget('');
            return;
        }

        const paintedSquares = paintSquares(target.toString().toUpperCase().split(""));
        const updatedSquares = squares.map(row => row);
        updatedSquares[currentRowIndex] = paintedSquares;
        setSquares(updatedSquares);
        inputRef.current.value = '';
    }

    const paintSquares = (target) => {
        let paintedSquares = [];
        let word = ["", "", "", "", ""];
        inputRef.current.value.toUpperCase().split('').forEach((letter, index) => {
            word[index] = letter;
        });

        word.forEach((letter, index) => {
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
            const response = await fetch('http://localhost:8080/wordle/get_word');
            const data = await response.text();
            setTarget(data);
        } catch (error) {
            console.log(error);
        }

    }

    async function checkWord(word) {
        word = word.toLowerCase();
        let res = await fetch(`http://localhost:8080/wordle/check_word/${word}`);
        let data = await res.text();
        if (data === 'true') {
            return true;
        }
        return false;
    }

    return (
        <mui.Stack
            alignItems="center"
            justifyContent="center"
        >
            <mui.Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <mui.Box display="flex">{squares[0]}</mui.Box>
                <mui.Box display="flex">{squares[1]}</mui.Box>
                <mui.Box display="flex">{squares[2]}</mui.Box>
                <mui.Box display="flex">{squares[3]}</mui.Box>
                <mui.Box display="flex">{squares[4]}</mui.Box>
            </mui.Container>
            <div
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        handleSubmit();
                    } else if (event.key === " ") {
                        event.preventDefault();
                    }

                }}
            >
                <mui.TextField
                    disabled={target === "" ? true : false}
                    inputRef={inputRef}
                    inputProps={{
                        maxLength: 5,
                        style: {
                            textAlign: 'center',
                            textTransform: "uppercase"
                        },
                    }}
                    sx={{ margin: '20px' }}
                    onChange={(event) => handleChange(event.target.value, currentRowIndex)}
                />
            </div>
            <mui.Button
                variant="contained"
            >
                <mui.Typography
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
                </mui.Typography>
            </mui.Button>

        </mui.Stack>

    );
}

export default WordleDesktop;
