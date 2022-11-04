import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Controls = () => {
    const simulateKeyPress = (key) => {
        const event = new KeyboardEvent('keydown', { 'key': `${key}` });
        window.dispatchEvent(event);
    };

    if (window.innerWidth < 600) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '3rem',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'background.default',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 5px',
                    height: '80px',

                }}
            >
                <IconButton
                    onClick={() => simulateKeyPress('ArrowLeft')}
                >
                    <ArrowLeftIcon
                        sx={{
                            fontSize: '4rem'
                        }}
                    />
                </IconButton>
                <IconButton
                    onClick={() => simulateKeyPress('ArrowRight')}
                >
                    <ArrowRightIcon
                        sx={{
                            fontSize: '4rem'
                        }}
                    />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'background.default',
                    borderRadius: '10px',
                    boxShadow: '5px 5px 5px'
                }}
            >

                <IconButton
                    onClick={() => simulateKeyPress('ArrowUp')}
                >
                    <ArrowDropUpIcon
                        sx={{
                            fontSize: '4rem'
                        }}
                    />
                </IconButton>
                <IconButton
                    onClick={() => simulateKeyPress('ArrowDown')}
                >
                    <ArrowDropDownIcon
                        sx={{
                            fontSize: '4rem'
                        }}
                    />
                </IconButton>
            </Box>
        </Box >
    )}
    return (
        <>
        </>
    )
}

export default Controls;
