import * as React from 'react';
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import BackspaceIcon from '@mui/icons-material/Backspace';
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

const Key = ({ letter, handleClick, isBackspace = false, visible }) => {
    //create event that returns the letter of the key
    const bgColor = visible ? "secondary.main" : "background.default";
    const letterColor = visible ? "primary.main" : "background.default";

    const onClick = () => {
        if (visible) {
            handleClick(letter);
        } else {
            return;
        }
    }

    const Letter = () => {

        if (isBackspace) {
            return (
                <BackspaceIcon sx={{ color: letterColor, bgcolor: bgColor }} />
            );
        }

        return (
            <Typography
                variant='body'
                sx={{
                    bgcolor: bgColor,
                    color: letterColor,
                    fontWeight: 'bold',
                    fontSize: '20px'
                }}
            >
                {letter.toUpperCase()}
            </Typography>
        );
    }

    return (
        <ButtonBase
            variant="text"
            onClick={() => onClick()}
            sx={{
                variant: 'contained',
                bgcolor: bgColor,
                minWidth: 0,
                minHeight: 0,
                width: isBackspace ? '50px' : '35px',
                height: 50,
                margin: '2px',
                borderRadius: '5px',
            }}
        >
            <Letter />
        </ButtonBase>
    );
}

//Keyboard component represents the whole keyboard with only letters
const VirtualKeyboard = ({ handleClick, visible }) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
        >
            <Box display='flex' flexDirection='row'>
                <Key letter="q" visible={visible} handleClick={handleClick} />
                <Key letter="w" visible={visible} handleClick={handleClick} />
                <Key letter="e" visible={visible} handleClick={handleClick} />
                <Key letter="r" visible={visible} handleClick={handleClick} />
                <Key letter="t" visible={visible} handleClick={handleClick} />
                <Key letter="y" visible={visible} handleClick={handleClick} />
                <Key letter="u" visible={visible} handleClick={handleClick} />
                <Key letter="i" visible={visible} handleClick={handleClick} />
                <Key letter="o" visible={visible} handleClick={handleClick} />
                <Key letter="p" visible={visible} handleClick={handleClick} />
            </Box>
            <Box display='flex' flexDirection='row'>
                <Key letter="a" visible={visible} handleClick={handleClick} />
                <Key letter="s" visible={visible} handleClick={handleClick} />
                <Key letter="d" visible={visible} handleClick={handleClick} />
                <Key letter="f" visible={visible} handleClick={handleClick} />
                <Key letter="g" visible={visible} handleClick={handleClick} />
                <Key letter="h" visible={visible} handleClick={handleClick} />
                <Key letter="j" visible={visible} handleClick={handleClick} />
                <Key letter="k" visible={visible} handleClick={handleClick} />
                <Key letter="l" visible={visible} handleClick={handleClick} />
            </Box>
            <Box display='flex' flexDirection='row'>
                <Key letter="z" visible={visible} handleClick={handleClick} />
                <Key letter="x" visible={visible} handleClick={handleClick} />
                <Key letter="c" visible={visible} handleClick={handleClick} />
                <Key letter="v" visible={visible} handleClick={handleClick} />
                <Key letter="b" visible={visible} handleClick={handleClick} />
                <Key letter="n" visible={visible} handleClick={handleClick} />
                <Key letter="m" visible={visible} handleClick={handleClick} />
                <Key letter="backspace"
                    visible={visible}
                    handleClick={handleClick}
                    isBackspace={true}
                />
            </Box>
        </Stack>
    );
}

export default VirtualKeyboard;
