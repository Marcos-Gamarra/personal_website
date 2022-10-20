import * as React from 'react';
import * as mui from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import PhoneIcon from '@mui/icons-material/Phone';

const Contact = React.forwardRef((_, ref) => {
    const typographyProps = {
        variant: 'body3',
        component: 'div',
        gutterBottom: true,
        color: 'white',
        fontWeight: 'bold',
    };

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
                    bgcolor: 'background.paper'
                }}
            >
                <mui.List>

                    <mui.ListItem>
                        <mui.ListItemIcon sx={{ color: 'white' }}>
                            <PhoneIcon />
                        </mui.ListItemIcon>
                        <mui.ListItemText
                            primary="(+595) 984 360 701"
                            primaryTypographyProps={typographyProps}
                        />
                    </mui.ListItem>

                    <mui.ListItemButton
                        onClick={() => {
                            window.open("https://github.com/Marcos-Gamarra");
                        }}
                    >
                        <mui.ListItemIcon sx={{ color: 'white' }}>
                            <GitHubIcon />
                        </mui.ListItemIcon>
                        <mui.ListItemText
                            primary="github.com/Marcos-Gamarra"
                            primaryTypographyProps={typographyProps}
                        />
                    </mui.ListItemButton>

                    <mui.ListItem>
                        <mui.ListItemIcon sx={{ color: 'white' }}>
                            <EmailIcon />
                        </mui.ListItemIcon>
                        <mui.ListItemText
                            primary="marcos.gamarra12345@gmail.com"
                            primaryTypographyProps={typographyProps}
                        />
                    </mui.ListItem>

                </mui.List>
            </mui.Box>
        </mui.Grid >
    );
})

export default Contact;
