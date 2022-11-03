import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
    palette: {
        type: 'light',
        background: {
            paper: '#B9B7BD',
            default: '#868B8E',
        },
        primary: {
            main: '#E7D2CC',
        },
        secondary: {
            main: '#EEEDE7',
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#000000',
        },
    },
});

export default Theme;
